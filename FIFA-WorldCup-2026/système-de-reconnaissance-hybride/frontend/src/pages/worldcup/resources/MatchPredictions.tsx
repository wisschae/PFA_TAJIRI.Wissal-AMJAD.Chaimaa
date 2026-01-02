import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trophy, BarChart3, TrendingUp, Brain, Sparkles } from "lucide-react";

const upcomingMatches = [
  {
    team1: { name: "Brazil", code: "BRA", flag: "🇧🇷", odds: 45 },
    team2: { name: "Germany", code: "GER", flag: "🇩🇪", odds: 30 },
    draw: 25,
    date: "Dec 22, 2026",
    time: "4:00 PM",
    aiPrediction: "Brazil",
    confidence: 78,
  },
  {
    team1: { name: "France", code: "FRA", flag: "🇫🇷", odds: 40 },
    team2: { name: "Argentina", code: "ARG", flag: "🇦🇷", odds: 38 },
    draw: 22,
    date: "Dec 22, 2026",
    time: "8:00 PM",
    aiPrediction: "Draw",
    confidence: 52,
  },
  {
    team1: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", odds: 50 },
    team2: { name: "USA", code: "USA", flag: "🇺🇸", odds: 28 },
    draw: 22,
    date: "Dec 23, 2026",
    time: "3:00 PM",
    aiPrediction: "England",
    confidence: 85,
  },
];

const teamStats = [
  { name: "Brazil", flag: "🇧🇷", played: 5, won: 4, goals: 14, points: 13 },
  { name: "France", flag: "🇫🇷", played: 5, won: 4, goals: 11, points: 12 },
  { name: "Argentina", flag: "🇦🇷", played: 5, won: 3, goals: 10, points: 11 },
  { name: "Germany", flag: "🇩🇪", played: 5, won: 3, goals: 9, points: 10 },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", played: 5, won: 3, goals: 8, points: 9 },
];

const Predictions = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-wc-emerald" />
              <WCBadge variant="emerald">Fan Experience</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Match Predictions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              AI-powered predictions and comprehensive team analytics for every match.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Match Predictions */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                    <Brain className="w-5 h-5 text-wc-purple" />
                    AI Match Predictions
                  </h2>
                  <WCBadge variant="purple">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </WCBadge>
                </div>

                <StaggerContainer className="space-y-4">
                  {upcomingMatches.map((match, index) => (
                    <StaggerItem key={index}>
                      <motion.div
                        className="bg-background/30 rounded-xl p-5 border border-white/5 hover:border-wc-purple/30 transition-all"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-muted-foreground">{match.date} • {match.time}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">AI Confidence:</span>
                            <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-wc-cyan to-wc-emerald"
                                initial={{ width: 0 }}
                                animate={{ width: `${match.confidence}%` }}
                                transition={{ delay: 0.5, duration: 1 }}
                              />
                            </div>
                            <span className="text-xs font-bold text-wc-emerald">{match.confidence}%</span>
                          </div>
                        </div>

                        {/* Teams */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">{match.team1.flag}</span>
                            <div>
                              <div className="font-display font-bold text-lg text-foreground">{match.team1.name}</div>
                              <div className="text-sm text-muted-foreground">Win: {match.team1.odds}%</div>
                            </div>
                          </div>

                          <div className="text-center px-6">
                            <div className="font-display font-bold text-muted-foreground text-sm mb-1">VS</div>
                            <div className="text-xs text-muted-foreground">Draw: {match.draw}%</div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-display font-bold text-lg text-foreground">{match.team2.name}</div>
                              <div className="text-sm text-muted-foreground">Win: {match.team2.odds}%</div>
                            </div>
                            <span className="text-4xl">{match.team2.flag}</span>
                          </div>
                        </div>

                        {/* Probability Bar */}
                        <div className="h-3 rounded-full overflow-hidden flex bg-background/30">
                          <motion.div
                            className="bg-wc-cyan"
                            initial={{ width: 0 }}
                            animate={{ width: `${match.team1.odds}%` }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                          />
                          <motion.div
                            className="bg-muted"
                            initial={{ width: 0 }}
                            animate={{ width: `${match.draw}%` }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                          />
                          <motion.div
                            className="bg-wc-emerald"
                            initial={{ width: 0 }}
                            animate={{ width: `${match.team2.odds}%` }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                          />
                        </div>

                        {/* AI Prediction */}
                        <div className="mt-4 p-3 bg-wc-purple/10 rounded-lg border border-wc-purple/20">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-wc-purple" />
                            <span className="text-sm text-wc-purple font-semibold">AI Predicts: {match.aiPrediction}</span>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Team Rankings */}
            <FadeIn delay={0.15}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-wc-gold" />
                  Group Stage Leaders
                </h3>
                <div className="space-y-3">
                  {teamStats.map((team, index) => (
                    <div
                      key={team.name}
                      className="flex items-center justify-between p-3 bg-background/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-muted-foreground w-6">{index + 1}</span>
                        <span className="text-xl">{team.flag}</span>
                        <span className="font-medium text-foreground">{team.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-wc-gold">{team.points} pts</div>
                        <div className="text-xs text-muted-foreground">{team.goals} goals</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Top Scorers */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wc-emerald" />
                  Top Scorers
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "K. Mbappé", team: "🇫🇷", goals: 6 },
                    { name: "V. Junior", team: "🇧🇷", goals: 5 },
                    { name: "L. Messi", team: "🇦🇷", goals: 5 },
                    { name: "H. Kane", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", goals: 4 },
                    { name: "E. Haaland", team: "🇳🇴", goals: 4 },
                  ].map((player, index) => (
                    <div
                      key={player.name}
                      className="flex items-center justify-between p-3 bg-background/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-muted-foreground w-6">{index + 1}</span>
                        <span className="text-xl">{player.team}</span>
                        <span className="font-medium text-foreground">{player.name}</span>
                      </div>
                      <div className="font-display font-bold text-wc-emerald">{player.goals}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Predictions;
