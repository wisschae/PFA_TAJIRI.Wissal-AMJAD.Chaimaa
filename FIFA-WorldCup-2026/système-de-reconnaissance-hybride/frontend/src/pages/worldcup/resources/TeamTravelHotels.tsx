import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plane, Hotel, MapPin, Clock, Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";

const flights = [
  {
    id: 1,
    team: "Brazil",
    flag: "🇧🇷",
    from: "São Paulo (GRU)",
    to: "New York (JFK)",
    departure: "Dec 20, 2026 • 10:00 PM",
    arrival: "Dec 21, 2026 • 6:00 AM",
    status: "Confirmed",
    aircraft: "Boeing 787",
    passengers: 45,
  },
  {
    id: 2,
    team: "Germany",
    flag: "🇩🇪",
    from: "Frankfurt (FRA)",
    to: "Los Angeles (LAX)",
    departure: "Dec 19, 2026 • 2:00 PM",
    arrival: "Dec 19, 2026 • 5:00 PM",
    status: "In Transit",
    aircraft: "Airbus A380",
    passengers: 52,
  },
  {
    id: 3,
    team: "France",
    flag: "🇫🇷",
    from: "Paris (CDG)",
    to: "Miami (MIA)",
    departure: "Dec 21, 2026 • 8:00 AM",
    arrival: "Dec 21, 2026 • 12:00 PM",
    status: "Scheduled",
    aircraft: "Boeing 777",
    passengers: 48,
  },
];

const hotels = [
  {
    id: 1,
    name: "The Ritz-Carlton New York",
    team: "Brazil",
    flag: "🇧🇷",
    location: "Central Park, NYC",
    checkIn: "Dec 21, 2026",
    checkOut: "Dec 28, 2026",
    rooms: 25,
    status: "Confirmed",
    rating: 5,
  },
  {
    id: 2,
    name: "Four Seasons Los Angeles",
    team: "Germany",
    flag: "🇩🇪",
    location: "Beverly Hills, LA",
    checkIn: "Dec 19, 2026",
    checkOut: "Dec 26, 2026",
    rooms: 30,
    status: "Confirmed",
    rating: 5,
  },
  {
    id: 3,
    name: "Mandarin Oriental Miami",
    team: "France",
    flag: "🇫🇷",
    location: "Brickell, Miami",
    checkIn: "Dec 21, 2026",
    checkOut: "Dec 27, 2026",
    rooms: 28,
    status: "Pending",
    rating: 5,
  },
];

const TeamTravel = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-8 h-8 text-wc-cyan" />
              <WCBadge variant="cyan">Operations</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Team Travel & Hotels
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive logistics management for all participating teams.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Teams", value: "48" },
              { label: "Flights", value: "156" },
              { label: "Hotel Rooms", value: "2,400" },
              { label: "Staff Members", value: "1,850" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="text-center py-4">
                <div className="font-display font-bold text-3xl text-wc-cyan">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Flights */}
          <FadeIn delay={0.15}>
            <GlassCard glowColor="cyan">
              <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Plane className="w-5 h-5 text-wc-cyan" />
                Flight Schedule
              </h2>

              <StaggerContainer className="space-y-4">
                {flights.map((flight) => (
                  <StaggerItem key={flight.id}>
                    <motion.div
                      className="bg-background/30 rounded-xl p-4 border border-white/5 hover:border-wc-cyan/30 transition-all"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{flight.flag}</span>
                          <span className="font-display font-bold text-foreground">{flight.team}</span>
                        </div>
                        <WCBadge
                          variant={
                            flight.status === "Confirmed"
                              ? "emerald"
                              : flight.status === "In Transit"
                              ? "cyan"
                              : "outline"
                          }
                        >
                          {flight.status === "In Transit" && <Plane className="w-3 h-3 mr-1 animate-pulse" />}
                          {flight.status}
                        </WCBadge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-foreground">{flight.from.split("(")[0]}</div>
                          <div className="text-xs text-muted-foreground">{flight.from.match(/\(([^)]+)\)/)?.[1]}</div>
                        </div>
                        <div className="flex-grow mx-4 flex items-center">
                          <div className="h-px flex-grow bg-gradient-to-r from-wc-cyan to-transparent" />
                          <Plane className="w-4 h-4 text-wc-cyan mx-2" />
                          <div className="h-px flex-grow bg-gradient-to-l from-wc-cyan to-transparent" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold text-foreground">{flight.to.split("(")[0]}</div>
                          <div className="text-xs text-muted-foreground">{flight.to.match(/\(([^)]+)\)/)?.[1]}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{flight.aircraft}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {flight.passengers} passengers
                        </span>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <Button variant="outline" className="w-full mt-4">
                View All Flights
              </Button>
            </GlassCard>
          </FadeIn>

          {/* Hotels */}
          <FadeIn delay={0.2}>
            <GlassCard glowColor="cyan">
              <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-wc-cyan" />
                Hotel Accommodations
              </h2>

              <StaggerContainer className="space-y-4">
                {hotels.map((hotel) => (
                  <StaggerItem key={hotel.id}>
                    <motion.div
                      className="bg-background/30 rounded-xl p-4 border border-white/5 hover:border-wc-cyan/30 transition-all"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{hotel.flag}</span>
                          <div>
                            <div className="font-display font-bold text-foreground">{hotel.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {hotel.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {hotel.checkIn} - {hotel.checkOut}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{hotel.rooms} rooms</span>
                          <span className="flex items-center gap-1">
                            {"⭐".repeat(hotel.rating)}
                          </span>
                        </div>
                        <WCBadge variant={hotel.status === "Confirmed" ? "emerald" : "gold"}>
                          {hotel.status === "Confirmed" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {hotel.status}
                        </WCBadge>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <Button variant="outline" className="w-full mt-4">
                View All Hotels
              </Button>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </PageLayout>
  );
};

export default TeamTravel;
