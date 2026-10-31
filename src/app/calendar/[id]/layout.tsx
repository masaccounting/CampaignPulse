import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Calendar",
  description: "View, edit, and export your dated marketing calendar, ad scripts, and social copy.",
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

