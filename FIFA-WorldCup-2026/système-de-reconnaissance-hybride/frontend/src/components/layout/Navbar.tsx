import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Ticket,
  Crown,
  Plane,
  Building2,
  Eye,
  Vault,
  Trophy,
  Menu,
  X,
  User,
  LogOut,
  Search,
  Bell,
  Target,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Fan Zone", href: "/wc2026/fanzone/live", icon: Users },
  { label: "Predictions", href: "/wc2026/predictions", icon: Target },
  { label: "Tickets", href: "/wc2026/tickets/reservations", icon: Ticket },
  { label: "VIP Lounge", href: "/wc2026/vip/hospitality", icon: Crown },
  { label: "Team Travel", href: "/wc2026/ops/team-travel", icon: Plane },
  { label: "Stadium Ops", href: "/wc2026/ops/stadium", icon: Building2 },
  { label: "Control Room", href: "/wc2026/security/control-room", icon: Eye },
  { label: "Digital Vault", href: "/wc2026/security/crypto-vault", icon: Vault },
];

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-wc-cyan to-wc-emerald flex items-center justify-center">
                <Trophy className="w-5 h-5 text-wc-navy" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  WC 2026
                </span>
                <span className="font-display text-xs text-muted-foreground block -mt-1">
                  UNITY HUB
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center">
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search modules..."
                      className="pl-9 h-9 bg-background/50 border-white/20 w-[200px]"
                      onBlur={() => setSearchOpen(false)}
                      autoFocus
                    />
                  </motion.div>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                    <Search className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-wc-red rounded-full" />
              </Button>

              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden glass-card border-b border-white/10 backdrop-blur-xl max-h-[80vh] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search modules..."
                className="pl-9 bg-background/50 border-white/20"
              />
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex gap-2">
              <Link to="/profile" className="flex-1">
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link to="/login" className="flex-1">
                <Button variant="ghost" className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
