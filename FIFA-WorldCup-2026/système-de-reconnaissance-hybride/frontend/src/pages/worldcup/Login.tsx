import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Trophy, Mail, Lock, ArrowRight } from "lucide-react";
import { StadiumBackground } from "@/components/ui/stadium-background";
import { FadeIn } from "@/components/ui/animated-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("Email and password are required");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      // Call our backend via AuthContext login
      const response = await login(email, password);

      // Case A: MFA Required
      if (response.mfaRequired) {
        console.log("🔐 MFA Required - sessionId:", response.sessionId);

        // Store MFA session data
        localStorage.setItem("mfa_sessionId", response.sessionId || "");
        localStorage.setItem("mfa_requiredFactors", JSON.stringify(response.requiredFactors || []));
        localStorage.setItem("mfa_email", email);
        localStorage.setItem("mfa_from", "/dashboard");

        toast("Additional verification required", {
          icon: "⚠️",
          duration: 3000,
        });
        navigate("/mfa", { replace: true, state: { from: "/dashboard" } });
        return;
      }

      // Case B: Direct JWT (no MFA)
      if (response.token) {
        console.log("✅ Direct login success - token received");
        toast.success("Welcome back!");
        navigate("/dashboard", { replace: true });
        return;
      }

      // Unexpected response
      throw new Error("Invalid response from server");
    } catch (err: any) {
      console.error("Login error:", err);

      // Handle specific error cases
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        setError("Invalid email or password");
        toast.error("Invalid credentials");
      } else if (status >= 500) {
        setError("Server error, please try again later");
        toast.error("Server unavailable");
      } else if (err.message?.includes("Network")) {
        setError("Network error - check your connection");
        toast.error("Connection failed");
      } else {
        setError(err.message || "Login failed");
        toast.error("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <StadiumBackground variant="hero" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-wc-cyan/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-wc-emerald/10 rounded-full animate-spin-slow" style={{ animationDirection: "reverse" }} />

      <div className="relative z-10 w-full max-w-md">
        <FadeIn>
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-wc-cyan to-wc-emerald flex items-center justify-center glow-cyan">
                <Trophy className="w-7 h-7 text-wc-navy" />
              </div>
            </Link>
            <div className="mb-3">
              <span className="inline-block px-4 py-1.5 rounded-full bg-wc-emerald/10 border border-wc-emerald/20 text-wc-emerald text-xs font-semibold uppercase tracking-wider">
                🏆 World Cup 2026 — Access Hub
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Access digital services for teams, fans and operations
            </p>
          </div>

          {/* Login Form */}
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-background/50 border-white/20 focus:border-primary h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-background/50 border-white/20 focus:border-primary h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-background/50 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full bg-gradient-to-r from-wc-cyan to-wc-emerald hover:opacity-90 transition-opacity"
                disabled={isLoading}
                onClick={() => console.log("Button clicked! isLoading:", isLoading)}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-center text-muted-foreground text-sm">
                Pas encore de compte ?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Créer un compte
                </Link>
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default Login;
