import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ticket, MapPin, Calendar, Clock, Users, CreditCard, Check } from "lucide-react";
import { useState } from "react";

const matches = [
  {
    id: 1,
    team1: "Brazil",
    team2: "Germany",
    flag1: "🇧🇷",
    flag2: "🇩🇪",
    date: "Dec 22, 2026",
    time: "8:00 PM",
    stadium: "MetLife Stadium",
    city: "New York",
    available: 2450,
    price: { standard: 350, premium: 850, vip: 2500 },
  },
  {
    id: 2,
    team1: "France",
    team2: "Argentina",
    flag1: "🇫🇷",
    flag2: "🇦🇷",
    date: "Dec 23, 2026",
    time: "4:00 PM",
    stadium: "Rose Bowl",
    city: "Los Angeles",
    available: 1890,
    price: { standard: 400, premium: 950, vip: 3000 },
  },
  {
    id: 3,
    team1: "England",
    team2: "Spain",
    flag1: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    flag2: "🇪🇸",
    date: "Dec 24, 2026",
    time: "6:00 PM",
    stadium: "AT&T Stadium",
    city: "Dallas",
    available: 3200,
    price: { standard: 300, premium: 750, vip: 2200 },
  },
];

const seatMap = [
  { section: "VIP Box", rows: 3, price: 2500, color: "wc-gold" },
  { section: "Premium", rows: 8, price: 850, color: "wc-purple" },
  { section: "Standard", rows: 15, price: 350, color: "wc-cyan" },
];

const Ticketing = () => {
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Ticket className="w-8 h-8 text-wc-gold" />
              <WCBadge variant="gold">Ticketing & VIP</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Ticket Reservation Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Secure your seats for the world's greatest football event.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Match Selection */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <GlassCard glowColor="gold">
                <h2 className="font-display font-bold text-xl text-foreground mb-6">
                  Select Match
                </h2>

                <StaggerContainer className="space-y-4">
                  {matches.map((match) => (
                    <StaggerItem key={match.id}>
                      <motion.div
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedMatch.id === match.id
                            ? "border-wc-gold bg-wc-gold/10"
                            : "border-white/10 bg-background/30 hover:border-white/20"
                        }`}
                        onClick={() => setSelectedMatch(match)}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl">{match.flag1}</span>
                              <span className="font-display font-bold text-foreground">{match.team1}</span>
                            </div>
                            <span className="text-muted-foreground font-display">VS</span>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-foreground">{match.team2}</span>
                              <span className="text-3xl">{match.flag2}</span>
                            </div>
                          </div>

                          {selectedMatch.id === match.id && (
                            <div className="w-6 h-6 rounded-full bg-wc-gold flex items-center justify-center">
                              <Check className="w-4 h-4 text-wc-navy" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {match.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {match.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {match.stadium}, {match.city}
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </GlassCard>
            </FadeIn>

            {/* Stadium Seat Map */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h2 className="font-display font-bold text-xl text-foreground mb-6">
                  Stadium Seat Map
                </h2>

                {/* Visual Seat Map */}
                <div className="relative mb-6">
                  {/* Pitch */}
                  <div className="w-full aspect-[2/1] bg-wc-emerald/20 rounded-xl border border-wc-emerald/30 mb-6 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-2 border-wc-emerald/40 rounded-lg relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-wc-emerald/40 rounded-full" />
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-12 h-24 border-2 border-wc-emerald/40 border-l-0" />
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-12 h-24 border-2 border-wc-emerald/40 border-r-0" />
                    </div>
                    <span className="absolute text-xs text-wc-emerald/60 font-display">PITCH</span>
                  </div>

                  {/* Seat Sections */}
                  <div className="space-y-2">
                    {seatMap.map((section) => (
                      <div
                        key={section.section}
                        className={`p-4 rounded-lg border border-${section.color}/30 bg-${section.color}/10 flex items-center justify-between hover:bg-${section.color}/20 transition-all cursor-pointer`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-8 rounded-full bg-${section.color}`} />
                          <div>
                            <div className="font-display font-bold text-foreground">{section.section}</div>
                            <div className="text-sm text-muted-foreground">{section.rows} rows available</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-bold text-foreground">${section.price}</div>
                          <div className="text-xs text-muted-foreground">per seat</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Ticket Summary */}
          <div className="space-y-6">
            <FadeIn delay={0.15}>
              <GlassCard glowColor="gold">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Your Selection
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Match</span>
                    <span className="font-medium text-foreground">
                      {selectedMatch.team1} vs {selectedMatch.team2}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{selectedMatch.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Venue</span>
                    <span className="font-medium text-foreground">{selectedMatch.stadium}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available Seats</span>
                    <span className="font-medium text-wc-emerald">{selectedMatch.available.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-display font-bold text-foreground">$850</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium text-foreground">$85</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-display font-bold text-foreground">Total</span>
                    <span className="font-display font-bold text-2xl text-wc-gold">$935</span>
                  </div>
                </div>

                <Button variant="gold" size="lg" className="w-full">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </Button>
              </GlassCard>
            </FadeIn>

            {/* Ticket Info */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-wc-cyan" />
                  Ticket Information
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Digital tickets delivered to your email</p>
                  <p>• Valid ID required for entry</p>
                  <p>• Tickets are non-transferable</p>
                  <p>• Gates open 2 hours before kickoff</p>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Ticketing;
