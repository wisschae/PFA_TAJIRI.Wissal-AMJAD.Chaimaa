import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: string;
  categoryColor: "cyan" | "emerald" | "gold" | "purple" | "red";
}

export const ResourceCard = ({
  title,
  description,
  icon: Icon,
  href,
  category,
  categoryColor,
}: ResourceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={href}>
        <GlassCard glowColor={categoryColor} className="h-full group cursor-pointer">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  categoryColor === "cyan"
                    ? "bg-wc-cyan/20 text-wc-cyan"
                    : categoryColor === "emerald"
                    ? "bg-wc-emerald/20 text-wc-emerald"
                    : categoryColor === "gold"
                    ? "bg-wc-gold/20 text-wc-gold"
                    : categoryColor === "purple"
                    ? "bg-wc-purple/20 text-wc-purple"
                    : "bg-wc-red/20 text-wc-red"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <WCBadge variant={categoryColor}>{category}</WCBadge>
            </div>

            {/* Content */}
            <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm flex-grow mb-4">
              {description}
            </p>

            {/* CTA */}
            <Button
              variant="ghost"
              className="w-full justify-between group-hover:bg-white/5"
            >
              <span>Open Resource</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
};
