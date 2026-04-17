#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Load .env into process.env (simple parser, handles quoted values)
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)?\s*$/);
    if (!m) return;
    const key = m[1];
    let val = m[2] || "";
    val = val.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  });
}

console.log("Loaded .env (keys):", Object.keys(process.env).filter(k => k.startsWith('MART2META') || k.startsWith('NEXT_PUBLIC') || k === 'WEBINAR_LINK').join(', '));

const { buildTemplatePayload } = await import('../src/app/lib/mart2meta.js');

function tryBuild(desc, args) {
  try {
    const payload = buildTemplatePayload(args);
    console.log(`\nOK: ${desc}`);
    console.log(JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error(`\nERROR: ${desc} -> ${err.message}`);
  }
}

const testPhone = process.env.TEST_PHONE10 || '9999999999';

tryBuild('confirmation', {
  templateName: process.env.MART2META_TEMPLATE_CONFIRM || '',
  phone10: testPhone,
  parameters: [
    'Test User',
    '2026-04-18',
    'Saturday',
    '5:00 PM',
    process.env.MART2META_TEMPLATE_CONFIRM_COMMUNITY_URL || process.env.WHATSAPP_COMMUNITY_URL || '',
  ],
  templateMediaType: process.env.MART2META_TEMPLATE_CONFIRM_MEDIA_TYPE || 'simple',
  mediaUrl: process.env.MART2META_TEMPLATE_CONFIRM_MEDIA_URL || ''
});

tryBuild('2day', {
  templateName: process.env.MART2META_TEMPLATE_2DAY || '',
  phone10: testPhone,
  parameters: [
    'Test User',
    process.env.MART2META_TEMPLATE_2DAY_INSTAGRAM_URL || '',
    process.env.MART2META_TEMPLATE_2DAY_YOUTUBE_URL || '',
  ],
  templateMediaType: process.env.MART2META_TEMPLATE_2DAY_MEDIA_TYPE || 'video',
  mediaUrl: process.env.MART2META_TEMPLATE_2DAY_MEDIA_URL || ''
});

tryBuild('morning', {
  templateName: process.env.MART2META_TEMPLATE_MORNING || '',
  phone10: testPhone,
  parameters: [
    'Test User',
    '2026-04-18',
    'Saturday',
    '5:00 PM'
  ],
  templateMediaType: process.env.MART2META_TEMPLATE_MORNING_MEDIA_TYPE || 'simple',
  mediaUrl: process.env.MART2META_TEMPLATE_MORNING_MEDIA_URL || ''
});

tryBuild('10min', {
  templateName: process.env.MART2META_TEMPLATE_10MIN || '',
  phone10: testPhone,
  parameters: [
    'Test User',
    '5:00 PM',
    process.env.WEBINAR_LINK || ''
  ],
  templateMediaType: process.env.MART2META_TEMPLATE_10MIN_MEDIA_TYPE || 'video',
  mediaUrl: process.env.MART2META_TEMPLATE_10MIN_MEDIA_URL || ''
});

tryBuild('live', {
  templateName: process.env.MART2META_TEMPLATE_LIVE || '',
  phone10: testPhone,
  parameters: [
    'Test User',
    '2026-04-18',
    'Saturday',
    '5:00 PM',
    process.env.WEBINAR_LINK || ''
  ],
  templateMediaType: process.env.MART2META_TEMPLATE_LIVE_MEDIA_TYPE || 'video',
  mediaUrl: process.env.MART2META_TEMPLATE_LIVE_MEDIA_URL || ''
});

tryBuild('course-purchase', {
  templateName: process.env.MART2META_TEMPLATE_COURSE_PURCHASE || '',
  phone10: testPhone,
  parameters: [
    'Test User',
    process.env.WHATSAPP_COMMUNITY_URL || ''
  ],
  templateMediaType: process.env.MART2META_TEMPLATE_COURSE_PURCHASE_MEDIA_TYPE || 'simple',
  mediaUrl: process.env.MART2META_TEMPLATE_COURSE_PURCHASE_MEDIA_URL || ''
});

console.log('\nTests complete');
