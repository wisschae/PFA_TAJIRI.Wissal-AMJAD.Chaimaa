import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Eye, Radio, MapPin, Clock, CheckCircle, Activity } from "lucide-react";

const securityAlerts = [
  { id: 1, type: "Info", message: "Routine security sweep completed - Section A", time: "2 min ago", priority: "low" },
  { id: 2, type: "Warning", message: "High crowd density detected - North Gate", time: "5 min ago", priority: "medium" },
  { id: 3, type: "Info", message: "VIP escort en route to hospitality suite", time: "12 min ago", priority: "low" },
  { id: 4, type: "Info", message: "Perimeter check completed - All clear", time: "18 min ago", priority: "low" },
];

const monitoringZones = [
  { zone: "Main Entrance", status: "Active", cameras: 24, personnel: 18 },
  { zone: "VIP Section", status: "Active", cameras: 12, personnel: 8 },
  { zone: "Pitch Perimeter", status: "Active", cameras: 16, personnel: 12 },
  { zone: "Parking Areas", status: "Active", cameras: 32, personnel: 20 },
  { zone: "Media Center", status: "Active", cameras: 8, personnel: 6 },
];

const Security = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-wc-red" />
              <WCBadge variant="red">Security & Data</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Security Control Room
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive security monitoring and incident management center.
            </p>
          </div>
        </FadeIn>

        {/* Global Status */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Shield, label: "Security Status", value: "OPTIMAL", color: "emerald" },
              { icon: Eye, label: "Active Cameras", value: "1,248", color: "cyan" },
              { icon: Radio, label: "Personnel", value: "892", color: "gold" },
              { icon: AlertTriangle, label: "Active Alerts", value: "1", color: "red" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="text-center py-4">
                <stat.icon className={`w-6 h-6 text-wc-${stat.color} mx-auto mb-2`} />
                <div className={`font-display font-bold text-2xl text-wc-${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Monitoring */}
          <div className="lg:col-span-2 space-y-6">
            {/* Global Map */}
            <FadeIn delay={0.15}>
              <GlassCard glowColor="red">
                <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-wc-red" />
                  Global Venue Monitor
                </h2>

                <div className="relative aspect-video bg-gradient-to-br from-wc-navy-light to-background rounded-xl border border-white/10 overflow-hidden mb-6">
                  {/* Simplified world map representation */}
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      <ellipse cx="400" cy="200" rx="350" ry="150" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-wc-cyan" />
                      <ellipse cx="400" cy="200" rx="250" ry="100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-wc-cyan" />
                    </svg>
                  </div>

                  {/* Venue indicators */}
                  {[
                    { x: "20%", y: "35%", city: "New York" },
                    { x: "15%", y: "45%", city: "Dallas" },
                    { x: "12%", y: "40%", city: "Los Angeles" },
                    { x: "25%", y: "50%", city: "Miami" },
                    { x: "22%", y: "55%", city: "Mexico City" },
                    { x: "18%", y: "30%", city: "Vancouver" },
                  ].map((venue, index) => (
                    <motion.div
                      key={venue.city}
                      className="absolute"
                      style={{ left: venue.x, top: venue.y }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="w-4 h-4 rounded-full bg-wc-emerald"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />
                        <div className="absolute left-6 top-0 whitespace-nowrap">
                          <span className="text-xs text-foreground font-medium">{venue.city}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Radar sweep effect */}
                  <div className="absolute bottom-4 right-4 w-24 h-24">
                    <motion.div
                      className="absolute inset-0 border-2 border-wc-cyan/30 rounded-full"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute inset-2 border border-wc-cyan/20 rounded-full" />
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--wc-cyan) / 0.3) 30deg, transparent 60deg)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              </GlassCard>
            </FadeIn>

            {/* Monitoring Zones */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-wc-cyan" />
                  Monitoring Zones
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Zone</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cameras</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Personnel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monitoringZones.map((zone) => (
                        <tr key={zone.zone} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground">{zone.zone}</td>
                          <td className="py-3 px-4">
                            <WCBadge variant="emerald">
                              <Activity className="w-3 h-3 mr-1" />
                              {zone.status}
                            </WCBadge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{zone.cameras}</td>
                          <td className="py-3 px-4 text-muted-foreground">{zone.personnel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alert Feed */}
            <FadeIn delay={0.15}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-wc-gold" />
                  Event Timeline
                </h3>
                <StaggerContainer className="space-y-3">
                  {securityAlerts.map((alert) => (
                    <StaggerItem key={alert.id}>
                      <div
                        className={`p-3 rounded-lg border ${
                          alert.priority === "medium"
                            ? "bg-wc-gold/10 border-wc-gold/30"
                            : "bg-background/20 border-white/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {alert.priority === "medium" ? (
                            <AlertTriangle className="w-4 h-4 text-wc-gold flex-shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-wc-emerald flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-grow">
                            <p className="text-sm text-foreground">{alert.message}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </GlassCard>
            </FadeIn>

            {/* Quick Stats */}
            <FadeIn delay={0.25}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Today's Summary
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Incidents Resolved", value: "12", color: "emerald" },
                    { label: "Access Grants", value: "2,847", color: "cyan" },
                    { label: "VIP Escorts", value: "24", color: "gold" },
                    { label: "System Uptime", value: "99.9%", color: "emerald" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className={`font-display font-bold text-wc-${stat.color}`}>{stat.value}</span>
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

export default Security;
