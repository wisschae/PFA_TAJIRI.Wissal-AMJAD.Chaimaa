import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/components/layout/PageLayout";
import { FadeIn } from "@/components/ui/animated-section";
import { Smartphone, CheckCircle2, XCircle, Shield } from "lucide-react";
import authApi from "../../api/authApi";

const OtpSetup = () => {
    const [step, setStep] = useState<"initial" | "scanning" | "verifying" | "success">("initial");
    const [qrUri, setQrUri] = useState("");
    const [secret, setSecret] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const navigate = useNavigate();

    // Vérifier le statut OTP au chargement (optionnel - peut échouer si pas encore full auth)
    useEffect(() => {
        checkOtpStatus();
    }, []);

    const checkOtpStatus = async () => {
        try {
            const response = await authApi.getOtpStatus();
            setIsEnabled(response.otpEnabled);
        } catch (error) {
            // Ignore silently - normal if user hasn't completed MFA yet
            console.log("OTP status check skipped (not fully authenticated)");
        }
    };

    const handleSetupOtp = async () => {
        try {
            setIsLoading(true);
            const response = await authApi.setupOtp();

            setSecret(response.secret);
            setQrUri(response.qrCodeUri);
            setStep("scanning");

            toast.success("QR Code generated! Scan with Google Authenticator");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to setup OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (otpCode.length !== 6) {
            toast.error("Please enter a 6-digit code");
            return;
        }

        try {
            setIsLoading(true);
            setStep("verifying");

            await authApi.verifyOtpSetup(secret, otpCode);

            setStep("success");
            setIsEnabled(true);
            toast.success("🎉 Google Authenticator configured successfully!");

            // Retour au dashboard après 3s
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);

        } catch (error: any) {
            setStep("scanning");
            toast.error(error.response?.data?.message || "Invalid code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisableOtp = async () => {
        if (!confirm("Are you sure you want to disable Google Authenticator?")) {
            return;
        }

        try {
            setIsLoading(true);
            await authApi.disableOtp();

            setIsEnabled(false);
            setStep("initial");
            toast.success("OTP disabled successfully");
        } catch (error: any) {
            toast.error("Failed to disable OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-wc-emerald to-wc-cyan mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="font-display font-bold text-3xl text-foreground mb-2">
                            Google Authenticator Setup
                        </h1>
                        <p className="text-muted-foreground">
                            Add an extra layer of security to your account
                        </p>
                    </div>

                    {/* État actuel */}
                    {isEnabled && step === "initial" && (
                        <GlassCard className="p-6 mb-6 border-wc-emerald/30">
                            <div className="flex items-center gap-4">
                                <CheckCircle2 className="w-8 h-8 text-wc-emerald" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">OTP Enabled</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your account is protected with Google Authenticator
                                    </p>
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={handleDisableOtp}
                                    disabled={isLoading}
                                >
                                    Disable
                                </Button>
                            </div>
                        </GlassCard>
                    )}

                    {/* Step 1: Initial / Disabled */}
                    {!isEnabled && step === "initial" && (
                        <GlassCard className="p-8 text-center">
                            <Smartphone className="w-16 h-16 mx-auto mb-4 text-wc-cyan" />
                            <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                                Protect Your Account
                            </h2>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Use Google Authenticator or any compatible TOTP app to generate verification codes
                            </p>
                            <Button
                                onClick={handleSetupOtp}
                                disabled={isLoading}
                                size="lg"
                                className="bg-gradient-to-r from-wc-emerald to-wc-cyan"
                            >
                                {isLoading ? "Generating..." : "Start Setup"}
                            </Button>
                        </GlassCard>
                    )}

                    {/* Step 2: Scanning QR Code */}
                    {step === "scanning" && (
                        <GlassCard className="p-8">
                            <div className="text-center mb-6">
                                <h2 className="font-display font-semibold text-2xl text-foreground mb-2">
                                    Scan QR Code
                                </h2>
                                <p className="text-muted-foreground">
                                    Open Google Authenticator and scan this code
                                </p>
                            </div>

                            {/* QR Code */}
                            <div className="flex justify-center mb-6">
                                <div className="p-6 bg-white rounded-xl">
                                    <QRCodeSVG value={qrUri} size={256} level="H" />
                                </div>
                            </div>

                            {/* Secret manuel */}
                            <div className="bg-background/50 rounded-lg p-4 mb-6">
                                <p className="text-xs text-muted-foreground mb-2">
                                    Can't scan? Enter this code manually:
                                </p>
                                <code className="text-sm font-mono text-foreground break-all">
                                    {secret}
                                </code>
                            </div>

                            {/* Input code */}
                            <div className="max-w-sm mx-auto">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Enter 6-digit code
                                </label>
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                                    placeholder="000000"
                                    className="text-center text-2xl font-display font-bold tracking-widest mb-4"
                                />
                                <Button
                                    onClick={handleVerifyCode}
                                    disabled={isLoading || otpCode.length !== 6}
                                    className="w-full bg-gradient-to-r from-wc-emerald to-wc-cyan"
                                    size="lg"
                                >
                                    {isLoading ? "Verifying..." : "Verify & Enable"}
                                </Button>
                            </div>
                        </GlassCard>
                    )}

                    {/* Step 3: Verifying */}
                    {step === "verifying" && (
                        <GlassCard className="p-12 text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-wc-cyan mx-auto mb-4" />
                            <p className="text-foreground font-semibold">Verifying code...</p>
                        </GlassCard>
                    )}

                    {/* Step 4: Success */}
                    {step === "success" && (
                        <GlassCard className="p-12 text-center border-wc-emerald/30">
                            <CheckCircle2 className="w-20 h-20 text-wc-emerald mx-auto mb-4" />
                            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                                Setup Complete!
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                Google Authenticator is now enabled on your account
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Redirecting to dashboard...
                            </p>
                        </GlassCard>
                    )}

                    {/* Back button */}
                    <div className="mt-6 text-center">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/dashboard")}
                        >
                            ← Back to Dashboard
                        </Button>
                    </div>
                </FadeIn>
            </div>
        </PageLayout >
    );
};

export default OtpSetup;
