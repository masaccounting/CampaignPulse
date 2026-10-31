import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Profile",
  description: "Save and update your brand details for one-click marketing campaign generation.",
};

export default function BrandProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

