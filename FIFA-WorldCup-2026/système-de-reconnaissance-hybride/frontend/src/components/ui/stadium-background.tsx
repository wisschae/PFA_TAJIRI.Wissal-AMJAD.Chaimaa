import { cn } from "@/lib/utils";

interface StadiumBackgroundProps {
  className?: string;
  variant?: "default" | "hero" | "subtle";
}

export const StadiumBackground = ({
  className,
  variant = "default",
}: StadiumBackgroundProps) => {
  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-wc-navy via-background to-background" />
      
      {/* Stadium light effects */}
      {variant !== "subtle" && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-wc-cyan/5 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-wc-emerald/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </>
      )}

      {/* Hero variant has more dramatic lighting */}
      {variant === "hero" && (
        <>
          <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-wc-cyan/10 via-wc-cyan/5 to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-wc-gold/5 rounded-full blur-[150px]" />
        </>
      )}

      {/* Pitch lines pattern */}
      <div className="absolute inset-0 pitch-lines opacity-30" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
    </div>
  );
};
