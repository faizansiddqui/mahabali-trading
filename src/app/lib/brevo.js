const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

function requireEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`${name} is required`);
    return value;
}

function getSender() {
    return {
        name: process.env.BREVO_SENDER_NAME || "Mahabali Education",
        email: requireEnv("BREVO_SENDER_EMAIL"),
    };
}

async function sendBrevoEmail(payload) {
    const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": requireEnv("BREVO_API_KEY"),
        },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error(`Brevo failed (${response.status}): ${text}`);
    }

    return text;
}

export async function sendBrevoTemplateEmail({ toEmail, toName, templateId, params }) {
    const resolvedTemplateId = Number(templateId || process.env.BREVO_TEMPLATE_ID_COURSE_PURCHASE);
    if (!Number.isFinite(resolvedTemplateId) || resolvedTemplateId <= 0) {
        throw new Error("BREVO_TEMPLATE_ID_COURSE_PURCHASE is missing or invalid");
    }

    return sendBrevoEmail({
        to: [{ email: toEmail, name: toName }],
        templateId: resolvedTemplateId,
        params,
        sender: getSender(),
    });
}

export async function sendCourseAccessEmail({ toEmail, toName, params }) {
    try {
        return await sendBrevoTemplateEmail({ toEmail, toName, params });
    } catch {
        const courseName = params?.course_name || "Learn Trading in 999";
        const accessLink = params?.course_access_link || "";
        const communityUrl = params?.course_community_url || "";

        return sendBrevoEmail({
            to: [{ email: toEmail, name: toName }],
            sender: getSender(),
            subject: "Your Course Access + Community Link",
            htmlContent: `
                <div style="margin:0;padding:0;background:#0b1220;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
                  <div style="max-width:640px;margin:0 auto;padding:24px">
                    <div style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.25)">
                      <div style="padding:22px 22px 18px;background:linear-gradient(90deg,#75c13f,#5da432);color:#0b1220">
                        <div style="font-size:14px;letter-spacing:0.14em;text-transform:uppercase;font-weight:800;opacity:0.95">
                          Mahabali Education
                        </div>
                        <div style="margin-top:8px;font-size:22px;font-weight:900">
                          Payment Successful — Welcome onboard
                        </div>
                      </div>
                      <div style="padding:22px">
                        <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#111827">
                          Hi <b>${toName || "Student"}</b>, your payment is successful for <b>${courseName}</b>.
                        </p>
                        <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px 16px;margin:14px 0">
                          <div style="display:flex;gap:12px;flex-wrap:nowrap;font-size:13px;color:#334155">
                            <div><b>Payment ID:</b> ${params?.payment_id || "-"}</div>
                            <div><b>Order ID:</b> ${params?.order_id || "-"}</div>
                            <div><b>Amount:</b> ${params?.amount || "-"}</div>
                          </div>
                        </div>

                        ${accessLink ? `
                          <div style="margin:18px 0">
                            <div style="font-weight:800;color:#0f172a;margin-bottom:8px">Course Access</div>
                            <a href="${accessLink}" style="display:inline-block;background:#0b1220;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:12px;font-weight:800">
                              Open Course Access
                            </a>
                            <div style="margin-top:10px;font-size:12px;color:#64748b;word-break:break-all">
                              If the button doesn't work, use this link: <a href="${accessLink}">${accessLink}</a>
                            </div>
                          </div>
                        ` : ""}

                        ${communityUrl ? `
                          <div style="margin:18px 0">
                            <div style="font-weight:800;color:#0f172a;margin-bottom:8px">Join Course Community</div>
                            <a href="${communityUrl}" style="display:inline-block;background:#75c13f;color:#0b1220;text-decoration:none;padding:12px 16px;border-radius:12px;font-weight:900">
                              Join WhatsApp Community
                            </a>
                            <div style="margin-top:10px;font-size:12px;color:#64748b;word-break:break-all">
                              Community link: <a href="${communityUrl}">${communityUrl}</a>
                            </div>
                          </div>
                        ` : ""}

                        <div style="margin-top:18px;padding-top:16px;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px">
                          Team Mahabali Education
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            `,
            textContent: `Hi ${toName || "Student"}, your payment is successful for ${courseName}. Payment ID: ${params?.payment_id || "-"}. Order ID: ${params?.order_id || "-"}. Amount: ${params?.amount || "-"}. ${accessLink ? `Course Access Link: ${accessLink}.` : ""} ${communityUrl ? `WhatsApp Community: ${communityUrl}.` : ""} Team Mahabali Education`,
        });
    }
}