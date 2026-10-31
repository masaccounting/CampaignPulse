import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-[#1F2937] hover:opacity-95 ${className}`}
      aria-label="CampaignPulse Home"
    >
      <div
        className={`${iconSizes[size]} rounded-xl bg-[#0E7C86] flex items-center justify-center text-white shadow-sm shadow-[#0E7C86]/20 flex-shrink-0`}
      >
        {/* Pulse Heartbeat / Marketing Waveform Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </div>
      <span className={`${textSizes[size]} font-extrabold text-[#1F2937] tracking-tight`}>
        Campaign<span className="text-[#0E7C86]">Pulse</span>
      </span>
    </Link>
  );
}

