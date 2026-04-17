import { NextResponse } from "next/server";
import crypto from "crypto";
import { validateForm } from "../../../lib/validate";

const COURSE_AMOUNT_INR = Number(process.env.COURSE_AMOUNT_INR || 999);
const GST_RATE = Number(process.env.GST_RATE || 18);
const GST_AMOUNT_INR = Number((COURSE_AMOUNT_INR * GST_RATE / 100).toFixed(2));
const TOTAL_AMOUNT_INR = Number((COURSE_AMOUNT_INR + GST_AMOUNT_INR).toFixed(2));
const TOTAL_AMOUNT_PAISE = Math.round(TOTAL_AMOUNT_INR * 100);

export async function POST(req) {
    try {
        const body = await req.json();
        const lead = validateForm(body);

        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            return NextResponse.json({ success: false, message: "Razorpay keys are missing." }, { status: 500 });
        }

        const receipt = `course_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
        const response = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: TOTAL_AMOUNT_PAISE,
                currency: "INR",
                receipt,
                payment_capture: 1,
                notes: {
                    name: lead.name,
                    email: lead.email,
                    phone: lead.phone,
                    course: "Price Behaviour Mastery",
                    base_price: String(COURSE_AMOUNT_INR),
                    gst_rate: String(GST_RATE),
                    gst_amount: String(GST_AMOUNT_INR),
                    total_amount: String(TOTAL_AMOUNT_INR),
                    gst_number: process.env.GST_NUMBER || "",
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.error?.description || "Unable to create Razorpay order.");
        }

        return NextResponse.json({
            success: true,
            keyId,
            order: data,
            amount: TOTAL_AMOUNT_PAISE,
            currency: "INR",
            courseName: "Price Behaviour Mastery",
            basePrice: COURSE_AMOUNT_INR,
            gstRate: GST_RATE,
            gstAmount: GST_AMOUNT_INR,
            totalAmount: TOTAL_AMOUNT_INR,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error?.message || "Unable to create order." },
            { status: 400 }
        );
    }
}