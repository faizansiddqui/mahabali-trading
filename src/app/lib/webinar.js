// src/app/lib/webinar.js
export function getNextWebinarDate() {
  const now = new Date();

  const SUNDAY = 0;

  const webinarHour = 20;   // 08:00 PM IST
  const webinarMinute = 0;

  function getNextDay(targetDay) {
    const result = new Date(now);
    const dayDiff = (targetDay - now.getDay() + 7) % 7;
    // agar same day hai, to next week
    result.setDate(now.getDate() + (dayDiff === 0 ? 7 : dayDiff));
    result.setHours(webinarHour, webinarMinute, 0, 0);
    return result;
  }

  return getNextDay(SUNDAY);
}

export function formatWebinarParts(webinarDT) {
  const webinarDay = webinarDT.toLocaleDateString("en-IN", { weekday: "long" });

  const webinarDate = webinarDT.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const webinarTime = webinarDT.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { webinarDay, webinarDate, webinarTime };
}
