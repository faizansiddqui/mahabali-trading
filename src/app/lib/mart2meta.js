// src/app/lib/mart2meta.js
import { cleanPhone10 } from "./phone";

const MART2META_API_BASE_URL = process.env.MART2META_API_BASE_URL || "https://login.mart2meta.com/api";
const MART2META_UID = process.env.MART2META_UID || "";
const MART2META_API_TOKEN = process.env.MART2META_API_TOKEN || "";
const MART2META_PHONE_NUMBER_ID = process.env.MART2META_PHONE_NUMBER_ID || "";
const MART2META_TEMPLATE_LANGUAGE = process.env.MART2META_TEMPLATE_LANGUAGE || "en";
const MART2META_DEBUG = process.env.MART2META_DEBUG === "true";
const WEBINAR_LINK = process.env.WEBINAR_LINK || "";

function required(name, value) {
    if (!value) {
        throw new Error(`Missing required env: ${name}`);
    }
    return value;
}

function asInternationalPhone(input) {
    const phone10 = cleanPhone10(input);
    return `91${phone10}`;
}

function endpoint(path) {
    const base = MART2META_API_BASE_URL.replace(/\/+$/, "");
    const uid = required("MART2META_UID", MART2META_UID);
    return `${base}/${uid}${path}`;
}

function toParameterString(values) {
    if (!Array.isArray(values) || values.length === 0) {
        return "";
    }

    return values
        .map((value) => {
            const clean = String(value ?? "").replace(/[{}]/g, "").trim();
            return `{${clean}}`;
        })
        .join(",");
}

function maskValue(value) {
    const str = String(value ?? "");
    if (!str) return "";
    if (/^\d{8,}$/.test(str)) return `${str.slice(0, 3)}*****${str.slice(-2)}`;
    if (str.includes("@")) {
        const [user, domain] = str.split("@");
        const left = user.length <= 2 ? `${user[0] || ""}*` : `${user[0]}***${user.slice(-1)}`;
        return `${left}@${domain}`;
    }
    return str.length > 8 ? `${str.slice(0, 4)}****${str.slice(-2)}` : `${str[0] || ""}***`;
}

async function callMart2Meta({ path, payload, label }) {
    const url = endpoint(path);
    const token = required("MART2META_API_TOKEN", MART2META_API_TOKEN);

    if (MART2META_DEBUG) {
        console.log("Mart2Meta DEBUG", {
            label,
            url,
            phone: maskValue(payload?.phone_number),
            template: payload?.template_name,
            mediaType: payload?.template_media_type,
            hasUrl: Boolean(payload?.url),
            parameters: maskValue(payload?.parameters),
        });
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const raw = await response.text();

    let data = null;
    try {
        data = JSON.parse(raw);
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(`Mart2Meta failed (${response.status}): ${raw}`);
    }

    const lowered = String(raw || "").toLowerCase();
    const explicitFailure =
        data?.status === false ||
        data?.success === false ||
        data?.ok === false ||
        lowered.includes("error") ||
        lowered.includes("failed");

    if (explicitFailure) {
        throw new Error(`Mart2Meta failed: ${raw}`);
    }

    return { status: "success", data: data ?? raw };
}

async function sendTemplate({
    templateName,
    phone10,
    parameters,
    templateMediaType = "simple",
    mediaUrl,
    path = "/contact/send-template",
    label,
}) {
    const payload = {
        from_phone_number_id: required("MART2META_PHONE_NUMBER_ID", MART2META_PHONE_NUMBER_ID),
        phone_number: asInternationalPhone(phone10),
        template_name: templateName,
        template_language: MART2META_TEMPLATE_LANGUAGE,
        template_media_type: templateMediaType,
    };

    if (typeof mediaUrl === "string" && mediaUrl.trim()) {
        payload.url = mediaUrl.trim();
    }

    if (Array.isArray(parameters)) {
        payload.parameters = toParameterString(parameters);
    }

    return callMart2Meta({ path, payload, label });
}

export async function sendConfirmation({
    name,
    email,
    phone10,
    webinarMeta,
    communityUrl = process.env.MART2META_TEMPLATE_CONFIRM_COMMUNITY_URL || process.env.WHATSAPP_COMMUNITY_URL || "",
    templateMediaType = process.env.MART2META_TEMPLATE_CONFIRM_MEDIA_TYPE || "simple",
    mediaUrl,
}) {
    return sendTemplate({
        label: "confirmation",
        templateName: required("MART2META_TEMPLATE_CONFIRM", process.env.MART2META_TEMPLATE_CONFIRM),
        phone10,
        templateMediaType,
        mediaUrl: mediaUrl || process.env.MART2META_TEMPLATE_CONFIRM_MEDIA_URL,
        parameters: [
            name,
            webinarMeta?.webinarDate,
            webinarMeta?.webinarDay,
            webinarMeta?.webinarTime,
            communityUrl,
        ],
    });
}

export async function sendCoursePurchaseWhatsApp({
    name,
    email,
    phone10,
    courseName,
    whatsappCommunityUrl,
    templateMediaType = process.env.MART2META_TEMPLATE_COURSE_PURCHASE_MEDIA_TYPE || "simple",
    mediaUrl,
}) {
    return sendTemplate({
        label: "course-purchase",
        templateName: required(
            "MART2META_TEMPLATE_COURSE_PURCHASE",
            process.env.MART2META_TEMPLATE_COURSE_PURCHASE
        ),
        phone10,
        templateMediaType,
        mediaUrl: mediaUrl || process.env.MART2META_TEMPLATE_COURSE_PURCHASE_MEDIA_URL,
        parameters: [name, email, courseName, whatsappCommunityUrl],
    });
}

export async function send2DayReminder({
    name,
    phone10,
    instagramUrl = process.env.MART2META_TEMPLATE_2DAY_INSTAGRAM_URL || "",
    youtubeUrl = process.env.MART2META_TEMPLATE_2DAY_YOUTUBE_URL || "",
    templateMediaType = process.env.MART2META_TEMPLATE_2DAY_MEDIA_TYPE || "video",
    mediaUrl,
}) {
    return sendTemplate({
        label: "2day-reminder",
        templateName: required("MART2META_TEMPLATE_2DAY", process.env.MART2META_TEMPLATE_2DAY),
        phone10,
        templateMediaType,
        mediaUrl: mediaUrl || process.env.MART2META_TEMPLATE_2DAY_MEDIA_URL,
        parameters: [name, instagramUrl, youtubeUrl],
    });
}

export async function sendMorningReminder({
    name,
    phone10,
    webinarDate,
    webinarDay,
    webinarTime,
    templateMediaType = process.env.MART2META_TEMPLATE_MORNING_MEDIA_TYPE || "simple",
    mediaUrl,
}) {
    return sendTemplate({
        label: "morning-reminder",
        templateName: required("MART2META_TEMPLATE_MORNING", process.env.MART2META_TEMPLATE_MORNING),
        phone10,
        templateMediaType,
        mediaUrl: mediaUrl || process.env.MART2META_TEMPLATE_MORNING_MEDIA_URL,
        parameters: [name, webinarDate, webinarDay, webinarTime],
    });
}

export async function send10MinReminder({
    name,
    phone10,
    webinarTime,
    webinarLink = WEBINAR_LINK,
    templateMediaType = process.env.MART2META_TEMPLATE_10MIN_MEDIA_TYPE || "video",
    mediaUrl,
}) {
    return sendTemplate({
        label: "10min-reminder",
        templateName: required("MART2META_TEMPLATE_10MIN", process.env.MART2META_TEMPLATE_10MIN),
        phone10,
        templateMediaType,
        mediaUrl: mediaUrl || process.env.MART2META_TEMPLATE_10MIN_MEDIA_URL,
        parameters: [name, webinarTime, webinarLink],
    });
}

export async function sendLiveNow({
    name,
    phone10,
    webinarDate,
    webinarDay,
    webinarTime,
    webinarLink = WEBINAR_LINK,
    templateMediaType = process.env.MART2META_TEMPLATE_LIVE_MEDIA_TYPE || "video",
    mediaUrl,
}) {
    return sendTemplate({
        label: "live-now",
        templateName: required("MART2META_TEMPLATE_LIVE", process.env.MART2META_TEMPLATE_LIVE),
        phone10,
        templateMediaType,
        mediaUrl: mediaUrl || process.env.MART2META_TEMPLATE_LIVE_MEDIA_URL,
        parameters: [name, webinarDate, webinarDay, webinarTime, webinarLink],
    });
}

export async function sendCustomTemplateMessage({
    phone10,
    templateName,
    templateLanguage = MART2META_TEMPLATE_LANGUAGE,
    templateMediaType = "simple",
    mediaUrl,
    parameters = [],
    useTemplateMessageEndpoint = false,
}) {
    const payload = {
        from_phone_number_id: required("MART2META_PHONE_NUMBER_ID", MART2META_PHONE_NUMBER_ID),
        phone_number: asInternationalPhone(phone10),
        template_name: templateName,
        template_language: templateLanguage,
        template_media_type: templateMediaType,
    };

    if (mediaUrl) payload.url = mediaUrl;
    if (Array.isArray(parameters)) payload.parameters = toParameterString(parameters);

    return callMart2Meta({
        path: useTemplateMessageEndpoint ? "/contact/send-template-message" : "/contact/send-template",
        payload,
        label: "custom-template",
    });
}