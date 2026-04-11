// src/app/api/cron/route.js
import { NextResponse } from "next/server";
import { readAllLeads, markCell } from "../../lib/googleSheet";

// 0-based indexes for A:M
const COL_NAME = 1;         // B
const COL_EMAIL = 2;        // C
const COL_PHONE = 3;        // D
const COL_WEBINAR_DAY = 5;  // F
const COL_WEBINAR_DATE = 6; // G
const COL_WEBINAR_TIME = 7; // H
const COL_WEBINAR_ISO = 8;  // I

const COL_SENT_CONFIRM = 9; // J
const LETTER_SENT_CONFIRM = "J";

function isAuthorized(req) {
  // for GitHub Actions: /api/cron?secret=XXXX
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  return secret && secret === process.env.CRON_SECRET;
}

export async function GET(req) {
  try {
    if (process.env.CRON_SECRET && !isAuthorized(req)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const leads = await readAllLeads();
    const now = new Date();

    let sentCount = { confirm: 0, skipped: 0 };
    console.log("CRON START", {
      now: now.toISOString(),
      totalLeads: leads.length,
    });

    for (let i = 0; i < leads.length; i++) {
      const row = leads[i];
      const sheetRowNumber = i + 2; // because data starts at row 2

      const phone10 = row[COL_PHONE] || "";
      const webinarISO = row[COL_WEBINAR_ISO] || "";

      const sentConfirm = String(row[COL_SENT_CONFIRM] || "no").toLowerCase();

      // basic validations
      if (!phone10 || phone10.length !== 10) {
        console.log("SKIP invalid phone", { sheetRowNumber, phone10 });
        sentCount.skipped++;
        continue;
      }
      if (!webinarISO) {
        console.log("SKIP missing webinarISO", { sheetRowNumber });
        sentCount.skipped++;
        continue;
      }

      // If confirmation already sent via API, but sheet still says "no"
      if (sentConfirm !== "yes") {
        await markCell(sheetRowNumber, LETTER_SENT_CONFIRM, "yes");
        sentCount.confirm++;
      }

      console.log("SKIP cron reminders", { sheetRowNumber, webinarISO });
    }

    return NextResponse.json({ ok: true, sentCount, totalLeads: leads.length });
  } catch (error) {
    console.error("CRON Error:", error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
