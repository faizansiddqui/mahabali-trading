"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const normalizedPath = pathname?.replace(/\/$/, "") || "";

  // Don't show footer on thank-you/form/course pages
  if (normalizedPath === "/thank-you") {
    return null;
  } else if (normalizedPath === "/form") {
    return null;
  } else if (normalizedPath === "/courses") {
    return null;
  } else if (normalizedPath === "/courses/thank-you") {
    return null;
  }else if (normalizedPath === "/courses/form") {
    return null;
  }

  return <Footer />;
}
