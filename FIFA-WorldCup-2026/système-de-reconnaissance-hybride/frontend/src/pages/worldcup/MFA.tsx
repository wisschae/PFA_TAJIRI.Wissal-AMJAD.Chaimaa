import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Trophy, Scan, CheckCircle2, Smartphone, Camera } from "lucide-react";
import { StadiumBackground } from "@/components/ui/stadium-background";
import { FadeIn } from "@/components/ui/animated-section";
import { Input } from "@/components/ui/input";
import authApi from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const MFA = () => {
  const [selectedTab, setSelectedTab] = useState<"FACE" | "OTP">("FACE");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useAuth();

  // Get MFA session data from localStorage
  const sessionId = localStorage.getItem("mfa_sessionId") || "";
  const requiredFactors = JSON.parse(localStorage.getItem("mfa_requiredFactors") || "[]");
  const from = (location.state as any)?.from || "/dashboard";

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      toast.success("Photo captured!");
    }
  };

  const handleFaceVerify = async () => {
    if (!capturedImage) {
      toast.error("Please capture your face first");
      return;
    }

    try {
      setIsLoading(true);
      console.log("🔐 Verifying FACE...", { sessionId });

      const response = await authApi.verifyMfa({
        sessionId,
        factorType: "FACE",
        imageBase64: capturedImage.split(",")[1], // Remove data:image prefix
      });

      if (response.token) {
        setToken(response.token);
        toast.success("Face verified successfully!");
        localStorage.removeItem("mfa_sessionId");
        localStorage.removeItem("mfa_requiredFactors");
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error("Face verification error:", error);
      toast.error(error.response?.data?.message || "Face verification failed. Try OTP instead.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otpCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    try {
      setIsLoading(true);
      console.log("🔐 Verifying OTP...", { sessionId, otpCode });

      const response = await authApi.verifyMfa({
        sessionId,
        factorType: "OTP",
        factorValue: otpCode,
      });

      if (response.token) {
        setToken(response.token);
        toast.success("OTP verified successfully!");
        localStorage.removeItem("mfa_sessionId");
        localStorage.removeItem("mfa_requiredFactors");
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Invalid OTP code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <StadiumBackground variant="hero" />

      {/* Scan overlay effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wc-cyan to-transparent opacity-50"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <FadeIn>
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-wc-cyan to-wc-emerald flex items-center justify-center glow-cyan">
                <Trophy className="w-7 h-7 text-wc-navy" />
              </div>
            </Link>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Identity Verification
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete verification to access the World Cup Hub
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={selectedTab === "FACE" ? "default" : "outline"}
              className={`flex-1 ${selectedTab === "FACE" ? "bg-wc-cyan" : ""}`}
              onClick={() => setSelectedTab("FACE")}
            >
              <Scan className="w-4 h-4 mr-2" />
              Face ID
            </Button>
            <Button
              variant={selectedTab === "OTP" ? "default" : "outline"}
              className={`flex-1 ${selectedTab === "OTP" ? "bg-wc-emerald" : ""}`}
              onClick={() => setSelectedTab("OTP")}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              OTP Code
            </Button>
          </div>

          {/* Face ID Section */}
          {selectedTab === "FACE" && (
            <GlassCard className="p-8 mb-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-wc-cyan mb-4">
                  <Scan className="w-5 h-5" />
                  <span className="font-display font-semibold uppercase tracking-wider text-sm">
                    Face ID Scanner
                  </span>
                </div>

                {/* Webcam or Captured Image */}
                <div className="relative w-full max-w-sm mx-auto mb-6 rounded-xl overflow-hidden border-2 border-wc-cyan/30">
                  {capturedImage ? (
                    <img src={capturedImage} alt="Captured" className="w-full" />
                  ) : (
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className="w-full"
                      videoConstraints={{
                        width: 640,
                        height: 480,
                        facingMode: "user",
                      }}
                    />
                  )}

                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-wc-cyan rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-wc-cyan rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-wc-cyan rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-wc-cyan rounded-br-lg" />
                </div>

                {/* Capture/Reset Button */}
                {!capturedImage ? (
                  <Button
                    onClick={handleCapture}
                    variant="outline"
                    className="w-full mb-4 border-wc-cyan text-wc-cyan hover:bg-wc-cyan/10"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Capture Face
                  </Button>
                ) : (
                  <div className="flex gap-3 mb-4">
                    <Button
                      onClick={() => setCapturedImage(null)}
                      variant="outline"
                      className="flex-1"
                    >
                      Retake
                    </Button>
                    <Button
                      onClick={handleFaceVerify}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-wc-cyan to-wc-emerald"
                    >
                      {isLoading ? "Verifying..." : "Verify Face"}
                    </Button>
                  </div>
                )}

                <p className="text-muted-foreground text-xs">
                  Position your face in the frame and capture
                </p>
              </div>
            </GlassCard>
          )}

          {/* OTP Section */}
          {selectedTab === "OTP" && (
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-wc-emerald mb-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-display font-semibold uppercase tracking-wider text-sm">
                    Enter OTP Code
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Enter the 6-digit code sent to your device
                </p>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="text-center text-2xl font-display font-bold tracking-widest bg-background/50 border-white/20 focus:border-wc-emerald h-16"
                />
              </div>

              <Button
                onClick={handleOtpVerify}
                disabled={isLoading || otpCode.length !== 6}
                className="w-full bg-gradient-to-r from-wc-emerald to-wc-cyan"
                size="lg"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {isLoading ? "Verifying..." : "Verify & Access Hub"}
              </Button>

              <div className="mt-4 text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  Don't have Google Authenticator setup?
                </p>
                <Link
                  to="/settings/otp"
                  className="inline-block text-sm text-wc-cyan hover:text-wc-emerald transition-colors font-medium"
                >
                  → Setup Google Authenticator
                </Link>
              </div>
            </GlassCard>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Login
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default MFA;
