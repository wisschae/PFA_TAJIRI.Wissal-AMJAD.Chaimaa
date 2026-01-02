import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
import { Building2, Users, AlertTriangle, CheckCircle, Thermometer, Wind, Volume2, Eye } from "lucide-react";

const stadiums = [
  {
    name: "MetLife Stadium",
    city: "New York",
    capacity: 82500,
    currentOccupancy: 78200,
    status: "Operational",
    alerts: 0,
  },
  {
    name: "Rose Bowl",
    city: "Los Angeles",
    capacity: 88500,
    currentOccupancy: 45000,
    status: "Preparing",
    alerts: 1,
  },
  {
    name: "AT&T Stadium",
    city: "Dallas",
    capacity: 80000,
    currentOccupancy: 0,
    status: "Standby",
    alerts: 0,
  },
];

const crowdMetrics = [
  { zone: "North Stand", density: 92, status: "High" },
  { zone: "South Stand", density: 88, status: "High" },
  { zone: "East Wing", density: 65, status: "Normal" },
  { zone: "West Wing", density: 71, status: "Normal" },
  { zone: "VIP Section", density: 45, status: "Low" },
];

const environmentalData = [
  { icon: Thermometer, label: "Temperature", value: "72°F", status: "Optimal" },
  { icon: Wind, label: "Air Quality", value: "Good", status: "Optimal" },
  { icon: Volume2, label: "Noise Level", value: "108 dB", status: "High" },
  { icon: Eye, label: "Visibility", value: "Excellent", status: "Optimal" },
];

const StadiumOps = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-wc-cyan" />
              <WCBadge variant="cyan">Operations</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Stadium Operations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Real-time monitoring and management of all World Cup venues.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stadium List */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <GlassCard glowColor="cyan">
                <h2 className="font-display font-bold text-xl text-foreground mb-6">
                  Venue Status Overview
                </h2>

                <StaggerContainer className="space-y-4">
                  {stadiums.map((stadium) => (
                    <StaggerItem key={stadium.name}>
                      <motion.div
                        className="bg-background/30 rounded-xl p-5 border border-white/5 hover:border-wc-cyan/30 transition-all"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-display font-bold text-lg text-foreground">{stadium.name}</h3>
                            <p className="text-sm text-muted-foreground">{stadium.city}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {stadium.alerts > 0 && (
                              <WCBadge variant="red">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                {stadium.alerts} Alert
                              </WCBadge>
                            )}
                            <WCBadge
                              variant={
                                stadium.status === "Operational"
                                  ? "emerald"
                                  : stadium.status === "Preparing"
                                  ? "gold"
                                  : "outline"
                              }
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {stadium.status}
                            </WCBadge>
                          </div>
                        </div>

                        {/* Capacity Bar */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Current Occupancy</span>
                            <span className="font-semibold text-foreground">
                              {stadium.currentOccupancy.toLocaleString()} / {stadium.capacity.toLocaleString()}
                            </span>
                          </div>
                          <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                (stadium.currentOccupancy / stadium.capacity) * 100 > 90
                                  ? "bg-wc-red"
                                  : (stadium.currentOccupancy / stadium.capacity) * 100 > 70
                                  ? "bg-wc-gold"
                                  : "bg-wc-emerald"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(stadium.currentOccupancy / stadium.capacity) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </GlassCard>
            </FadeIn>

            {/* Crowd Flow */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-wc-cyan" />
                  Crowd Flow Analysis
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {crowdMetrics.map((zone) => (
                    <div
                      key={zone.zone}
                      className="p-4 bg-background/30 rounded-xl border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-foreground">{zone.zone}</span>
                        <WCBadge
                          variant={
                            zone.status === "High" ? "red" : zone.status === "Normal" ? "emerald" : "cyan"
                          }
                        >
                          {zone.status}
                        </WCBadge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-grow h-2 bg-background/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              zone.density > 85 ? "bg-wc-red" : zone.density > 60 ? "bg-wc-gold" : "bg-wc-emerald"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${zone.density}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <span className="font-display font-bold text-foreground w-12">{zone.density}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Environmental Data */}
            <FadeIn delay={0.15}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Environmental Conditions
                </h3>
                <div className="space-y-4">
                  {environmentalData.map((data) => (
                    <div
                      key={data.label}
                      className="flex items-center justify-between p-3 bg-background/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <data.icon className="w-5 h-5 text-wc-cyan" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{data.label}</div>
                          <div className="text-xs text-muted-foreground">{data.status}</div>
                        </div>
                      </div>
                      <span className="font-display font-bold text-foreground">{data.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Quick Actions */}
            <FadeIn delay={0.25}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Operations Status
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Security Teams", status: "All Active", color: "emerald" },
                    { label: "Medical Staff", status: "On Standby", color: "cyan" },
                    { label: "Catering", status: "Operational", color: "emerald" },
                    { label: "Broadcasting", status: "Live", color: "red" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 bg-background/20 rounded-lg"
                    >
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <WCBadge variant={item.color as any}>{item.status}</WCBadge>
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

export default StadiumOps;
