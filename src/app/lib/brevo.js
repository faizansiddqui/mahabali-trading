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

export async function sendBrevoTemplateEmail({ toEmail, toName, templateId, params, attachments = [] }) {
    const resolvedTemplateId = Number(templateId || process.env.BREVO_TEMPLATE_ID_COURSE_PURCHASE);
    if (!Number.isFinite(resolvedTemplateId) || resolvedTemplateId <= 0) {
        throw new Error("BREVO_TEMPLATE_ID_COURSE_PURCHASE is missing or invalid");
    }

    const payload = {
        to: [{ email: toEmail, name: toName }],
        templateId: resolvedTemplateId,
        params,
        sender: getSender(),
    };

    if (Array.isArray(attachments) && attachments.length > 0) {
        payload.attachment = attachments;
    }

    return sendBrevoEmail(payload);
}

export async function sendCourseAccessEmail({ toEmail, toName, params, invoiceAttachment }) {
    const attachment = invoiceAttachment
        ? [{
            name: invoiceAttachment.fileName || "invoice.pdf",
            content: invoiceAttachment.contentBase64,
        }]
        : [];

    try {
        return await sendBrevoTemplateEmail({ toEmail, toName, params, attachments: attachment });
    } catch {
        const courseName = params?.course_name || "Price Behaviour Mastery";
        const communityUrl = params?.course_community_url || "https://chat.whatsapp.com/BqGroJM47xW8a9kOL3GuUT";

        return sendBrevoEmail({
            to: [{ email: toEmail, name: toName }],
            sender: getSender(),
            subject: "🎉 Your Course Access + Invoice Details",
            htmlContent: `
            <div style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
              <div style="max-width:650px;margin:0 auto;padding:20px;">
                <div style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
                  <div style="background:linear-gradient(90deg,#22c55e,#16a34a);padding:20px;text-align:left;">
                    <h2 style="margin:0;color:#ffffff;font-size:20px;">Payment Successful 🎉</h2>
                    <p style="margin:6px 0 0;color:#dcfce7;font-size:13px;">
                      Welcome to your learning journey 🚀
                    </p>
                  </div>

                  <div style="padding:22px;color:#0f172a;">
                    <p style="font-size:15px;line-height:1.6;margin:0 0 15px;">
                      Hi <b>${toName || "Student"}</b>,
                    </p>

                    <p style="font-size:15px;line-height:1.6;margin:0 0 15px;">
                      Your payment for <b>${courseName}</b> has been successfully completed.
                    </p>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:15px;margin:18px 0;">
                      <table style="width:100%;font-size:14px;color:#334155;">
                        <tr>
                          <td style="padding:6px 0;"><b>Transaction ID:</b></td>
                          <td style="padding:6px 0;text-align:right;">${params?.payment_id || "-"}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;"><b>Order ID:</b></td>
                          <td style="padding:6px 0;text-align:right;">${params?.order_id || "-"}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;"><b>Amount Paid:</b></td>
                          <td style="padding:6px 0;text-align:right;"><b>${params?.amount || "-"}</b></td>
                        </tr>
                      </table>
                    </div>

                    ${communityUrl ? `
                    <div style="margin:20px 0;text-align:center;">
                      <a href="${communityUrl}" 
                         style="background:#25D366;color:#ffffff;text-decoration:none;
                         padding:12px 20px;border-radius:10px;font-size:14px;font-weight:bold;display:inline-block;">
                         Join WhatsApp Community
                      </a>
                    </div>
                    ` : ""}

                    <div style="margin:20px 0;text-align:center;">
                      <div style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:bold;">
                        Invoice PDF Attached
                      </div>
                      <p style="font-size:12px;color:#64748b;margin-top:8px;">
                        Please download the invoice from this email attachment.
                      </p>
                    </div>

                    <div style="margin-top:25px;padding-top:15px;border-top:1px solid #e2e8f0;text-align:center;">
                      <p style="margin:0;font-size:13px;color:#64748b;">
                        Need help? Just reply to this email.
                      </p>
                      <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">
                        Team Mahabali Education
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `,
            textContent: `
Hi ${toName || "Student"},

Your payment for ${courseName} is successful.

Transaction ID: ${params?.payment_id || "-"}
Order ID: ${params?.order_id || "-"}
Amount: ${params?.amount || "-"}

${communityUrl ? `Join Community: ${communityUrl}` : ""}
Invoice: Please download the attached PDF invoice from this email.

Team Mahabali Education
            `,
            attachment: attachment,
        });
    }
}