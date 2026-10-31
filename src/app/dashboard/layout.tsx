import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your small-business marketing campaigns and calendars.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

