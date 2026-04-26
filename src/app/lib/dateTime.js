export const INDIA_TIME_ZONE = "Asia/Kolkata";

/**
 * Format date/time in Indian time (IST) for server-generated timestamps.
 */
export function formatISTDateTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: INDIA_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}
