import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Play,
  Flag,
  Clock,
  Zap,
  TrendingUp,
} from "lucide-react";

const liveMatches = [
  {
    team1: { name: "Brazil", code: "BRA", flag: "🇧🇷", score: 2 },
    team2: { name: "Germany", code: "GER", flag: "🇩🇪", score: 1 },
    time: "67'",
    stadium: "MetLife Stadium",
    viewers: "1.2M",
  },
  {
    team1: { name: "France", code: "FRA", flag: "🇫🇷", score: 0 },
    team2: { name: "Argentina", code: "ARG", flag: "🇦🇷", score: 0 },
    time: "23'",
    stadium: "Rose Bowl",
    viewers: "980K",
  },
];

const fanActivity = [
  { user: "Carlos M.", action: "Just checked in at MetLife Stadium! 🏟️", time: "2m ago", likes: 234 },
  { user: "Emma S.", action: "GOOOAL! Brazil takes the lead! ⚽🇧🇷", time: "5m ago", likes: 1892 },
  { user: "Yuki T.", action: "The atmosphere here is INCREDIBLE!", time: "8m ago", likes: 567 },
  { user: "Ahmed K.", action: "First World Cup match ever! Dreams come true ✨", time: "12m ago", likes: 890 },
];

const countryFlags = ["🇧🇷", "🇩🇪", "🇫🇷", "🇦🇷", "🇪🇸", "🇬🇧", "🇮🇹", "🇵🇹", "🇳🇱", "🇯🇵", "🇰🇷", "🇲🇽", "🇺🇸", "🇨🇦"];

const FanZone = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-wc-emerald" />
              <WCBadge variant="emerald" pulse>Fan Experience</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Fan Zone Live Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Connect with millions of fans worldwide. Experience the World Cup together.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Matches */}
            <FadeIn delay={0.1}>
              <GlassCard glowColor="emerald">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                    <Play className="w-5 h-5 text-wc-emerald" />
                    Live Matches
                  </h2>
                  <WCBadge variant="emerald" pulse>
                    <Zap className="w-3 h-3 mr-1" />
                    LIVE
                  </WCBadge>
                </div>

                <div className="space-y-4">
                  {liveMatches.map((match, index) => (
                    <motion.div
                      key={index}
                      className="bg-background/30 rounded-xl p-4 border border-white/5 hover:border-wc-emerald/30 transition-all duration-300"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground">{match.stadium}</span>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{match.viewers}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Team 1 */}
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{match.team1.flag}</span>
                          <div>
                            <div className="font-display font-bold text-foreground">{match.team1.name}</div>
                            <div className="text-xs text-muted-foreground">{match.team1.code}</div>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="flex items-center gap-4">
                          <span className="font-display font-black text-3xl text-foreground">{match.team1.score}</span>
                          <div className="text-center">
                            <div className="font-display font-bold text-wc-emerald text-lg">{match.time}</div>
                            <div className="w-2 h-2 rounded-full bg-wc-emerald mx-auto animate-pulse-glow" />
                          </div>
                          <span className="font-display font-black text-3xl text-foreground">{match.team2.score}</span>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-display font-bold text-foreground">{match.team2.name}</div>
                            <div className="text-xs text-muted-foreground">{match.team2.code}</div>
                          </div>
                          <span className="text-3xl">{match.team2.flag}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Matches
                </Button>
              </GlassCard>
            </FadeIn>

            {/* Fan Activity Feed */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2 mb-6">
                  <MessageCircle className="w-5 h-5 text-wc-cyan" />
                  Fan Activity
                </h2>

                <StaggerContainer className="space-y-4">
                  {fanActivity.map((activity, index) => (
                    <StaggerItem key={index}>
                      <div className="flex gap-4 p-4 bg-background/20 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wc-cyan to-wc-emerald flex items-center justify-center text-wc-navy font-bold">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                          <p className="text-muted-foreground">{activity.action}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-wc-red transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{activity.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nations Connected */}
            <FadeIn delay={0.15}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Flag className="w-5 h-5 text-wc-gold" />
                  Nations Connected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {countryFlags.map((flag, index) => (
                    <motion.span
                      key={index}
                      className="text-2xl cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ delay: index * 0.1, duration: 2, repeat: Infinity }}
                    >
                      {flag}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="font-display font-bold text-3xl text-wc-gold">48</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Nations Competing</div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>

            {/* Trending */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wc-cyan" />
                  Trending Now
                </h3>
                <div className="space-y-3">
                  {["#WorldCup2026", "#BrazilVsGermany", "#GoalOfTheDay", "#FanZone"].map((tag, index) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between p-3 bg-background/20 rounded-lg hover:bg-background/30 transition-all cursor-pointer"
                    >
                      <span className="text-primary font-medium">{tag}</span>
                      <span className="text-xs text-muted-foreground">{(1000 - index * 200)}K posts</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Upcoming */}
            <FadeIn delay={0.25}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-wc-purple" />
                  Coming Up
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-background/20 rounded-lg">
                    <div className="text-sm text-foreground mb-1">🇪🇸 Spain vs 🇳🇱 Netherlands</div>
                    <div className="text-xs text-muted-foreground">Today, 8:00 PM • SoFi Stadium</div>
                  </div>
                  <div className="p-3 bg-background/20 rounded-lg">
                    <div className="text-sm text-foreground mb-1">🇬🇧 England vs 🇮🇹 Italy</div>
                    <div className="text-xs text-muted-foreground">Tomorrow, 3:00 PM • AT&T Stadium</div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FanZone;
