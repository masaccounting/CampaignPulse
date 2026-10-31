import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set a new, secure password for your CampaignPulse account.",
};

export default function UpdatePasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

