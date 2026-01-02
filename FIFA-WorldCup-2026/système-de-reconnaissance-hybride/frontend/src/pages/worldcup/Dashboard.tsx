import { PageLayout } from "@/components/layout/PageLayout";
import { ResourceCard } from "@/components/dashboard/ResourceCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { WCBadge } from "@/components/ui/wc-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import {
  Users,
  Trophy,
  Ticket,
  Crown,
  Plane,
  Building2,
  Eye,
  Vault,
  Globe,
  Zap,
  Search,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const resources = [
  {
    title: "Fan Zone Live Hub",
    description: "Experience live match updates, fan activities, and global celebrations in real-time.",
    icon: Users,
    href: "/wc2026/fanzone/live",
    category: "Fan Experience",
    categoryColor: "emerald" as const,
  },
  {
    title: "Match Predictions Lab",
    description: "AI-powered match predictions, team statistics, and tournament analytics.",
    icon: Target,
    href: "/wc2026/predictions",
    category: "Fan Experience",
    categoryColor: "emerald" as const,
  },
  {
    title: "Ticket Reservation Center",
    description: "Browse available matches, select premium seats, and manage your tickets.",
    icon: Ticket,
    href: "/wc2026/tickets/reservations",
    category: "Ticketing & VIP",
    categoryColor: "gold" as const,
  },
  {
    title: "VIP Hospitality Lounge",
    description: "Premium hospitality packages and exclusive match-day experiences.",
    icon: Crown,
    href: "/wc2026/vip/hospitality",
    category: "Ticketing & VIP",
    categoryColor: "gold" as const,
  },
  {
    title: "Team Travel & Hotels",
    description: "Manage team logistics, flight schedules, and accommodation bookings.",
    icon: Plane,
    href: "/wc2026/ops/team-travel",
    category: "Operations",
    categoryColor: "cyan" as const,
  },
  {
    title: "Stadium Operations Console",
    description: "Real-time stadium management, crowd flow analytics, and event coordination.",
    icon: Building2,
    href: "/wc2026/ops/stadium",
    category: "Operations",
    categoryColor: "cyan" as const,
  },
  {
    title: "Control Room Overview",
    description: "Comprehensive operations monitoring and incident management center.",
    icon: Eye,
    href: "/wc2026/security/control-room",
    category: "Monitoring",
    categoryColor: "red" as const,
  },
  {
    title: "Digital Asset Vault",
    description: "Digital asset management, transactions overview, and data protection.",
    icon: Vault,
    href: "/wc2026/security/crypto-vault",
    category: "Data Management",
    categoryColor: "purple" as const,
  },
];

const highlights = [
  { title: "Brazil vs Germany", subtitle: "Quarter Finals", time: "Today, 8:00 PM", viewers: "1.2M" },
  { title: "France vs Argentina", subtitle: "Semi Finals", time: "Tomorrow, 4:00 PM", viewers: "2.1M" },
  { title: "USA vs Mexico", subtitle: "Host Match", time: "Dec 24, 6:00 PM", viewers: "890K" },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <WCBadge variant="cyan" pulse>Live</WCBadge>
              <WCBadge variant="outline">48 Teams • 104 Matches</WCBadge>
              <span className="text-2xl">🇺🇸</span>
              <span className="text-2xl">🇲🇽</span>
              <span className="text-2xl">🇨🇦</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Welcome to the Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your unified experience for World Cup 2026 — explore modules, track matches, and join the celebration.
            </p>
          </div>
        </FadeIn>

        {/* Global Search */}
        <FadeIn delay={0.05}>
          <div className="relative mb-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search modules, features, matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-background/50 border-white/20 text-lg"
            />
          </div>
        </FadeIn>

        {/* Quick Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Globe, label: "Live Viewers", value: "2.4M" },
              { icon: Users, label: "Active Fans", value: "856K" },
              { icon: Trophy, label: "Matches Today", value: "4" },
              { icon: Zap, label: "Hub Status", value: "Active" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Today's Highlights */}
        <FadeIn delay={0.15}>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-wc-gold" />
              <h2 className="font-display font-bold text-2xl text-foreground">
                Today's Highlights
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {highlights.map((match, index) => (
                <motion.div
                  key={match.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <GlassCard glowColor="gold" className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-wc-gold/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <WCBadge variant="gold" className="mb-3">{match.subtitle}</WCBadge>
                      <h3 className="font-display font-bold text-lg text-foreground mb-2">
                        {match.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{match.time}</span>
                        <span className="flex items-center gap-1 text-wc-cyan">
                          <Users className="w-4 h-4" />
                          {match.viewers}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* World Cup Modules */}
        <div className="space-y-10">
          {/* Fan Experience */}
          <section>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 rounded-full bg-wc-emerald" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Fan Experience
                </h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {filteredResources
                .filter((r) => r.categoryColor === "emerald")
                .map((resource) => (
                  <StaggerItem key={resource.title}>
                    <ResourceCard {...resource} />
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </section>

          {/* Ticketing & VIP */}
          <section>
            <FadeIn delay={0.25}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 rounded-full bg-wc-gold" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Ticketing & VIP
                </h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {filteredResources
                .filter((r) => r.categoryColor === "gold")
                .map((resource) => (
                  <StaggerItem key={resource.title}>
                    <ResourceCard {...resource} />
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </section>

          {/* Operations */}
          <section>
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 rounded-full bg-wc-cyan" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Operations
                </h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {filteredResources
                .filter((r) => r.categoryColor === "cyan")
                .map((resource) => (
                  <StaggerItem key={resource.title}>
                    <ResourceCard {...resource} />
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </section>

          {/* Monitoring & Data */}
          <section>
            <FadeIn delay={0.35}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 rounded-full bg-gradient-to-b from-wc-red to-wc-purple" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Monitoring & Data
                </h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {filteredResources
                .filter((r) => r.categoryColor === "red" || r.categoryColor === "purple")
                .map((resource) => (
                  <StaggerItem key={resource.title}>
                    <ResourceCard {...resource} />
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </section>
        </div>

        {/* Live Insights */}
        <FadeIn delay={0.4}>
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-wc-cyan" />
              <h2 className="font-display font-bold text-2xl text-foreground">
                Live Insights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Chart Placeholder 1 */}
              <GlassCard>
                <h3 className="font-display font-semibold text-foreground mb-4">Fan Engagement</h3>
                <div className="h-32 bg-gradient-to-t from-wc-cyan/20 to-transparent rounded-lg flex items-end justify-around p-4">
                  {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-6 bg-gradient-to-t from-wc-cyan to-wc-emerald rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
              </GlassCard>

              {/* Chart Placeholder 2 */}
              <GlassCard>
                <h3 className="font-display font-semibold text-foreground mb-4">Match Activity</h3>
                <div className="h-32 relative">
                  <svg className="w-full h-full">
                    <motion.path
                      d="M 0 80 Q 50 40, 100 60 T 200 50 T 300 70"
                      fill="none"
                      stroke="hsl(var(--wc-emerald))"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                </div>
              </GlassCard>

              {/* Stats Table */}
              <GlassCard>
                <h3 className="font-display font-semibold text-foreground mb-4">Top Nations</h3>
                <div className="space-y-3">
                  {[
                    { flag: "🇧🇷", name: "Brazil", fans: "245K" },
                    { flag: "🇦🇷", name: "Argentina", fans: "198K" },
                    { flag: "🇩🇪", name: "Germany", fans: "156K" },
                  ].map((nation) => (
                    <div key={nation.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{nation.flag}</span>
                        <span className="text-foreground">{nation.name}</span>
                      </div>
                      <span className="text-muted-foreground">{nation.fans}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
