// src/app/api/qstash/route.js
import { NextResponse } from "next/server";
import { verifyQstashRequest } from "../../lib/qstash";
import { findRowByLeadId, markCell } from "../../lib/googleSheet";
import { send2DayReminder, sendMorningReminder, send10MinReminder, sendLiveNow } from "../../lib/mart2meta";

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("upstash-signature") || "";

    const isValid = await verifyQstashRequest({ body, signature, reqUrl: req.url });
    if (!isValid) {
      return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body || "{}");
    const {
      type,
      rowNumber,
      leadId,
      name,
      phone10,
      webinarDate,
      webinarDay,
      webinarTime,
      reminderMediaUrl,
      reminderMediaType,
    } = data;

    if (!type) {
      return NextResponse.json({ ok: false, message: "Missing payload fields" }, { status: 400 });
    }

    let targetRow = null;
    if (leadId) {
      targetRow = await findRowByLeadId(leadId);
    }
    if (!targetRow && rowNumber) {
      targetRow = rowNumber;
    }
    if (!targetRow) {
      return NextResponse.json({ ok: false, message: "Row not found" }, { status: 404 });
    }

    console.log("QSTASH RECEIVED", { type, rowNumber: targetRow, leadId, phone10, webinarDate, webinarDay, webinarTime });

    if (type === "2day") {
      await send2DayReminder({
        name,
        phone10,
        mediaUrl: reminderMediaUrl,
        templateMediaType: reminderMediaType || undefined,
      });
      await markCell(targetRow, "K", "yes");
      console.log("QSTASH SENT 2DAY", { rowNumber: targetRow });
    } else if (type === "morning") {
      await sendMorningReminder({
        name,
        phone10,
        webinarDate,
        webinarDay,
        webinarTime,
        mediaUrl: reminderMediaUrl,
        templateMediaType: reminderMediaType || undefined,
      });
      await markCell(targetRow, "O", "yes");
      console.log("QSTASH SENT MORNING", { rowNumber: targetRow });
    } else if (type === "10min") {
      await send10MinReminder({
        name,
        phone10,
        webinarTime,
        mediaUrl: reminderMediaUrl,
        templateMediaType: reminderMediaType || undefined,
      });
      await markCell(targetRow, "L", "yes");
      console.log("QSTASH SENT 10MIN", { rowNumber: targetRow });
    } else if (type === "live") {
      await sendLiveNow({
        name,
        phone10,
        webinarDate,
        webinarDay,
        webinarTime,
        mediaUrl: reminderMediaUrl,
        templateMediaType: reminderMediaType || undefined,
      });
      await markCell(targetRow, "M", "yes");
      console.log("QSTASH SENT LIVE", { rowNumber: targetRow });
    } else {
      return NextResponse.json({ ok: false, message: "Unknown job type" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("QStash Error:", error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
