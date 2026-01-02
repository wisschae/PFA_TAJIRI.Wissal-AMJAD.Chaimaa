import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "emerald" | "gold" | "purple" | "red";
  hover?: boolean;
}

const glowColors = {
  cyan: "hover:shadow-[0_0_30px_hsl(var(--wc-cyan)/0.3)]",
  emerald: "hover:shadow-[0_0_30px_hsl(var(--wc-emerald)/0.3)]",
  gold: "hover:shadow-[0_0_30px_hsl(var(--wc-gold)/0.3)]",
  purple: "hover:shadow-[0_0_30px_hsl(var(--wc-purple)/0.3)]",
  red: "hover:shadow-[0_0_30px_hsl(var(--wc-red)/0.3)]",
};

export const GlassCard = ({
  children,
  className,
  glowColor = "cyan",
  hover = true,
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && "hover:scale-[1.02] hover:border-white/20",
        hover && glowColors[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
};
