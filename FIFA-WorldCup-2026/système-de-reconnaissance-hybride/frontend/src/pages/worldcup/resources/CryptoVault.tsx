import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { WCBadge } from "@/components/ui/wc-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Shield, Database, Key, ArrowUpRight, ArrowDownRight, Clock, Fingerprint } from "lucide-react";

const vaultAssets = [
  { name: "WC2026 Main Treasury", value: "$2.4B", change: "+2.3%", type: "Primary" },
  { name: "Sponsor Escrow Fund", value: "$890M", change: "+0.8%", type: "Escrow" },
  { name: "Prize Pool Reserve", value: "$450M", change: "0%", type: "Reserved" },
  { name: "Operational Float", value: "$125M", change: "-1.2%", type: "Active" },
];

const recentTransactions = [
  { id: "TX-001", type: "Inbound", amount: "$12.5M", from: "FIFA Reserve", time: "2 hours ago", status: "Confirmed" },
  { id: "TX-002", type: "Outbound", amount: "$3.2M", to: "Stadium Operations", time: "5 hours ago", status: "Confirmed" },
  { id: "TX-003", type: "Inbound", amount: "$45M", from: "Sponsor Payment", time: "1 day ago", status: "Confirmed" },
  { id: "TX-004", type: "Outbound", amount: "$8.7M", to: "Team Payments", time: "2 days ago", status: "Confirmed" },
];

const securityLayers = [
  { name: "256-bit Encryption", status: "Active", icon: Lock },
  { name: "Multi-sig Authorization", status: "Required", icon: Key },
  { name: "Biometric Verification", status: "Enabled", icon: Fingerprint },
  { name: "Cold Storage Backup", status: "Synced", icon: Database },
];

const CryptoVault = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-wc-purple" />
              <WCBadge variant="purple">Security & Data</WCBadge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-4">
              Crypto Vault
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Secure digital asset management and blockchain transaction monitoring.
            </p>
          </div>
        </FadeIn>

        {/* Total Value */}
        <FadeIn delay={0.1}>
          <GlassCard glowColor="purple" className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Total Vault Value
                </div>
                <div className="font-display font-black text-5xl md:text-6xl text-foreground">
                  $3.865<span className="text-wc-purple">B</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <WCBadge variant="emerald">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +1.8% (24h)
                  </WCBadge>
                  <span className="text-sm text-muted-foreground">All systems operational</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="neon">View Ledger</Button>
                <Button variant="outline">Export Report</Button>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Assets */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.15}>
              <GlassCard>
                <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                  <Database className="w-5 h-5 text-wc-purple" />
                  Vault Assets
                </h2>

                <StaggerContainer className="space-y-4">
                  {vaultAssets.map((asset) => (
                    <StaggerItem key={asset.name}>
                      <motion.div
                        className="bg-background/30 rounded-xl p-5 border border-white/5 hover:border-wc-purple/30 transition-all"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-display font-bold text-lg text-foreground">{asset.name}</h3>
                              <WCBadge variant="outline">{asset.type}</WCBadge>
                            </div>
                            <div className="font-display font-black text-3xl text-wc-purple">{asset.value}</div>
                          </div>
                          <div className={`flex items-center gap-1 ${asset.change.startsWith("+") ? "text-wc-emerald" : asset.change.startsWith("-") ? "text-wc-red" : "text-muted-foreground"}`}>
                            {asset.change.startsWith("+") ? (
                              <ArrowUpRight className="w-5 h-5" />
                            ) : asset.change.startsWith("-") ? (
                              <ArrowDownRight className="w-5 h-5" />
                            ) : null}
                            <span className="font-display font-bold text-lg">{asset.change}</span>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </GlassCard>
            </FadeIn>

            {/* Recent Transactions */}
            <FadeIn delay={0.2}>
              <GlassCard>
                <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-wc-cyan" />
                  Recent Transactions
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Details</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-mono text-sm text-foreground">{tx.id}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {tx.type === "Inbound" ? (
                                <ArrowDownRight className="w-4 h-4 text-wc-emerald" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4 text-wc-red" />
                              )}
                              <span className={tx.type === "Inbound" ? "text-wc-emerald" : "text-wc-red"}>
                                {tx.type}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-display font-bold text-foreground">{tx.amount}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {tx.from || tx.to}
                            <div className="text-xs">{tx.time}</div>
                          </td>
                          <td className="py-3 px-4">
                            <WCBadge variant="emerald">{tx.status}</WCBadge>
                          </td>
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
            {/* Security Layers */}
            <FadeIn delay={0.15}>
              <GlassCard glowColor="purple">
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-wc-purple" />
                  Security Layers
                </h3>
                <div className="space-y-3">
                  {securityLayers.map((layer) => (
                    <div
                      key={layer.name}
                      className="flex items-center justify-between p-3 bg-background/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <layer.icon className="w-5 h-5 text-wc-purple" />
                        <span className="text-sm font-medium text-foreground">{layer.name}</span>
                      </div>
                      <WCBadge variant="emerald">{layer.status}</WCBadge>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Vault Stats */}
            <FadeIn delay={0.25}>
              <GlassCard>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Vault Statistics
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Total Transactions", value: "12,847" },
                    { label: "Avg. Transaction", value: "$2.4M" },
                    { label: "Success Rate", value: "100%" },
                    { label: "Last Audit", value: "2 days ago" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-display font-bold text-foreground">{stat.value}</span>
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

export default CryptoVault;
