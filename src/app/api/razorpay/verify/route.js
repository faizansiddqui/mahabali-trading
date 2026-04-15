import { NextResponse } from "next/server";
import crypto from "crypto";
import { cleanPhone10 } from "../../../lib/phone";
import { sendCoursePurchaseWhatsApp } from "../../../lib/mart2meta";
import { sendCourseAccessEmail } from "../../../lib/brevo";
import { saveCoursePurchaseToSheet2 } from "../../../lib/googleSheet";
import { buildCourseInvoicePdf } from "../../../lib/invoicePdf";

function isValidSignature(orderId, paymentId, signature) {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error("RAZORPAY_KEY_SECRET is required");
    const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
    return expected === signature;
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, phone } = body;
        const courseName = "Price Behaviour Mastery";
        const sanitizedName = String(name || "").trim();
        const sanitizedEmail = String(email || "").trim().toLowerCase();
        const courseAccessLink = process.env.COURSE_ACCESS_LINK || "";
        const whatsappCommunityUrl =
            process.env.COURSE_WHATSAPP_COMMUNITY_URL ||
            process.env.WHATSAPP_COMMUNITY_URL ||
            "https://chat.whatsapp.com/HjW5OInq33h3cOzDZv7Dln";

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ success: false, message: "Missing payment details." }, { status: 400 });
        }

        if (!isValidSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
            return NextResponse.json({ success: false, message: "Invalid payment signature." }, { status: 400 });
        }

        const phone10 = cleanPhone10(phone);
        const invoiceAttachment = await buildCourseInvoicePdf({
            name: sanitizedName,
            email: sanitizedEmail,
            phone: phone10,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            amount: "₹999",
            courseName,
        });

        await saveCoursePurchaseToSheet2({
            name: sanitizedName,
            email: sanitizedEmail,
            phone: phone10,
            courseName: "Price Behaviour Mastery",
            price: "999",
            paymentStatus: "Done",
        });

        const notifications = await Promise.allSettled([
            sendCoursePurchaseWhatsApp({
                name: sanitizedName,
                email: sanitizedEmail,
                phone10,
                courseName,
                whatsappCommunityUrl,
            }),
            sendCourseAccessEmail({
                toEmail: sanitizedEmail,
                toName: sanitizedName,
                params: {
                    name: sanitizedName,
                    email: sanitizedEmail,
                    phone: phone10,
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                    amount: "₹999",
                    course_name: courseName,
                    course_access_link: courseAccessLink,
                    course_community_url: whatsappCommunityUrl,
                },
                invoiceAttachment,
            }),
        ]);

        const whatsappStatus = notifications[0]?.status === "fulfilled" ? "sent" : "failed";
        const emailStatus = notifications[1]?.status === "fulfilled" ? "sent" : "failed";
        const whatsappError = notifications[0]?.status === "rejected" ? notifications[0].reason?.message : null;
        const emailError = notifications[1]?.status === "rejected" ? notifications[1].reason?.message : null;

        if (whatsappError) {
            console.error("Course purchase WhatsApp send failed:", whatsappError);
        }
        if (emailError) {
            console.error("Course purchase email send failed:", emailError);
        }
        if (!whatsappError && !emailError) {
            console.log("Course purchase notifications sent", {
                whatsappStatus,
                emailStatus,
                toEmail: sanitizedEmail,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Payment verified successfully.",
            notifications: {
                whatsapp: whatsappStatus,
                email: emailStatus,
            },
            whatsappError,
            emailError,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error?.message || "Payment verification failed." },
            { status: 400 }
        );
    }
}