import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your CampaignPulse account to manage your marketing campaigns and calendars.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

