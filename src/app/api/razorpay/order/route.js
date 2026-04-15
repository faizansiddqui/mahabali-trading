import { NextResponse } from "next/server";
import crypto from "crypto";
import { validateForm } from "../../../lib/validate";

const COURSE_AMOUNT_INR = process.env.COURSE_AMOUNT_INR || 999;
const COURSE_AMOUNT_PAISE = COURSE_AMOUNT_INR * 100;

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
                amount: COURSE_AMOUNT_PAISE,
                currency: "INR",
                receipt,
                payment_capture: 1,
                notes: {
                    name: lead.name,
                    email: lead.email,
                    phone: lead.phone,
                    course: "Price Behaviour Mastery",
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
            amount: COURSE_AMOUNT_PAISE,
            currency: "INR",
            courseName: "Price Behaviour Mastery",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error?.message || "Unable to create order." },
            { status: 400 }
        );
    }
}