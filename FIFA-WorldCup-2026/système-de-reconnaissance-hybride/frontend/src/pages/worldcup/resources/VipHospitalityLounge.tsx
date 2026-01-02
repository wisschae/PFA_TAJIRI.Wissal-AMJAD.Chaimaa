import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Crown, Sparkles, Wine, Utensils, Star, Gift, Check } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Premium Suite",
    price: 5000,
    image: "🏟️",
    features: [
      "Private suite with stadium view",
      "Gourmet catering included",
      "Premium bar service",
      "Exclusive parking",
      "Meet & greet opportunity",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Executive Platinum",
    price: 12000,
    image: "⭐",
    features: [
      "All Premium Suite benefits",
      "Pitch-side access pre-match",
      "Personal concierge service",
      "Luxury gift package",
      "Player meet & greet guaranteed",
      "VIP after-party access",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Ultimate Legend",
    price: 25000,
    image: "🏆",
    features: [
      "All Executive Platinum benefits",
      "Private helicopter transfer",
      "Trophy photo opportunity",
      "Exclusive locker room tour",
      "Signed memorabilia",
      "Lifetime VIP membership",
    ],
    popular: false,
  },
];

const amenities = [
  { icon: Wine, label: "Premium Bar", description: "World-class wines & spirits" },
  { icon: Utensils, label: "Fine Dining", description: "5-star cuisine by top chefs" },
  { icon: Star, label: "VIP Service", description: "Dedicated concierge team" },
  { icon: Gift, label: "Exclusive Gifts", description: "Commemorative packages" },
];

const VIPLounge = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-wc-gold" />
              <WCBadge variant="gold">Ticketing & VIP</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              VIP Hospitality Lounge
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Experience the World Cup in unparalleled luxury and style.
            </p>
          </div>
        </FadeIn>

        {/* VIP Packages */}
        <FadeIn delay={0.1}>
          <div className="mb-12">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-wc-gold" />
              Hospitality Packages
            </h2>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <StaggerItem key={pkg.id}>
                  <motion.div
                    className="relative"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <WCBadge variant="gold">Most Popular</WCBadge>
                      </div>
                    )}
                    <GlassCard
                      glowColor="gold"
                      className={`h-full ${pkg.popular ? "border-wc-gold/50 ring-1 ring-wc-gold/30" : ""}`}
                    >
                      <div className="text-center mb-6">
                        <span className="text-5xl mb-4 block">{pkg.image}</span>
                        <h3 className="font-display font-bold text-xl text-foreground mb-2">
                          {pkg.name}
                        </h3>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="font-display font-black text-4xl text-wc-gold">
                            ${pkg.price.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">/person</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-wc-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-wc-gold" />
                            </div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant={pkg.popular ? "gold" : "outline"}
                        className="w-full"
                      >
                        Reserve Package
                      </Button>
                    </GlassCard>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Amenities */}
        <FadeIn delay={0.2}>
          <div className="mb-12">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              World-Class Amenities
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {amenities.map((amenity) => (
                <GlassCard key={amenity.label} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-wc-gold/20 flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-7 h-7 text-wc-gold" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">{amenity.label}</h3>
                  <p className="text-sm text-muted-foreground">{amenity.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Lounge Preview */}
        <FadeIn delay={0.3}>
          <GlassCard glowColor="gold">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  The Ultimate Experience
                </h2>
                <p className="text-muted-foreground mb-6">
                  Step into a world of unparalleled luxury. Our VIP lounges offer the perfect blend of
                  comfort, entertainment, and exclusive access that transforms every match into an
                  unforgettable experience.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/30 rounded-lg text-center">
                    <div className="font-display font-bold text-3xl text-wc-gold">16</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Premium Lounges</div>
                  </div>
                  <div className="p-4 bg-background/30 rounded-lg text-center">
                    <div className="font-display font-bold text-3xl text-wc-gold">500+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">VIP Seats</div>
                  </div>
                  <div className="p-4 bg-background/30 rounded-lg text-center">
                    <div className="font-display font-bold text-3xl text-wc-gold">24/7</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Concierge</div>
                  </div>
                  <div className="p-4 bg-background/30 rounded-lg text-center">
                    <div className="font-display font-bold text-3xl text-wc-gold">5⭐</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Service Rating</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-wc-gold/20 via-wc-navy-light to-wc-purple/20 rounded-xl flex items-center justify-center border border-wc-gold/20">
                  <div className="text-center">
                    <Crown className="w-16 h-16 text-wc-gold mx-auto mb-4 animate-float" />
                    <span className="font-display font-bold text-xl text-foreground">VIP Lounge Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </PageLayout>
  );
};

export default VIPLounge;
