import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Free Account",
  description: "Create your free CampaignPulse account and generate your custom marketing campaign calendar in minutes.",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

