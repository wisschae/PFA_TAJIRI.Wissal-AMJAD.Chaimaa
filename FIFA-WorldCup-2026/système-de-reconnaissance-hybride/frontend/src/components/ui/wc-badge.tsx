import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-display uppercase tracking-wider transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary/20 text-primary border border-primary/30",
        cyan: "bg-wc-cyan/20 text-wc-cyan border border-wc-cyan/30",
        emerald: "bg-wc-emerald/20 text-wc-emerald border border-wc-emerald/30",
        gold: "bg-wc-gold/20 text-wc-gold border border-wc-gold/30",
        purple: "bg-wc-purple/20 text-wc-purple border border-wc-purple/30",
        red: "bg-wc-red/20 text-wc-red border border-wc-red/30",
        outline: "bg-transparent border border-white/30 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface WCBadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export const WCBadge = ({
  children,
  className,
  variant,
  pulse = false,
}: WCBadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), pulse && "animate-pulse-glow", className)}>
      {children}
    </span>
  );
};
