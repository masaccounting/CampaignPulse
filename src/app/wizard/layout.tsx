import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Campaign Wizard",
  description: "Answer a few questions about your business to generate a tailored marketing calendar.",
};

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

