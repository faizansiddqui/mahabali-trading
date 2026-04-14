// src/app/lib/qstash.js
import { Receiver } from "@upstash/qstash";

const QSTASH_BASE = process.env.QSTASH_BASE_URL || "https://qstash-us-east-1.upstash.io";

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}

export function getQstashTargetUrl(reqUrl, headers) {
  if (process.env.QSTASH_TARGET_URL) return normalizeBaseUrl(process.env.QSTASH_TARGET_URL);
  if (process.env.NEXT_PUBLIC_SITE_URL) return normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const host = headers?.get?.("x-forwarded-host") || headers?.get?.("host");
  const proto = headers?.get?.("x-forwarded-proto");
  if (host) return `${proto || "https"}://${host}`;
  if (reqUrl) return new URL(reqUrl).origin;
  return "http://localhost:3000";
}

function normalizeBaseUrl(raw) {
  if (!raw) return raw;
  let value = String(raw).trim();
  // strip wrapping quotes if user saved value like "https://example.com"
  value = value.replace(/^['"]|['"]$/g, "");
  // If someone accidentally pasted multiple URLs (space/newline separated),
  // keep the first token.
  value = value.split(/\s+/).filter(Boolean)[0] || "";
  if (!/^https?:\/\//i.test(value)) {
    const isLocal = value.startsWith("localhost") || value.startsWith("127.0.0.1");
    value = `${isLocal ? "http" : "https"}://${value}`;
  }
  value = value.replace(/\/$/, "");
  // Ensure we keep only the origin (no path/query) so callers can append "/api/qstash" safely.
  try {
    return new URL(value).origin;
  } catch {
    return value;
  }
}

export async function publishScheduled({ url, body, notBeforeEpochSeconds }) {
  requireEnv("QSTASH_TOKEN");

  // QStash expects the destination URL to be URL-encoded in the path segment.
  const publishUrl = `${QSTASH_BASE}/v2/publish/${encodeURIComponent(url)}`;

  const res = await fetch(publishUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      "Content-Type": "application/json",
      "Upstash-Not-Before": String(notBeforeEpochSeconds),
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`QStash publish failed (${res.status}): ${text}`);
  }

  return text;
}

export async function verifyQstashRequest({ body, signature, reqUrl }) {
  requireEnv("QSTASH_CURRENT_SIGNING_KEY");
  requireEnv("QSTASH_NEXT_SIGNING_KEY");

  const receiver = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
  });

  const url = `${getQstashTargetUrl(reqUrl)}/api/qstash`;
  return receiver.verify({ body, signature, url });
}

export function toEpochSeconds(isoString) {
  return Math.floor(new Date(isoString).getTime() / 1000);
}
