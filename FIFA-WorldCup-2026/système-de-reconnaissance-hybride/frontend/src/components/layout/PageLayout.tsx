import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { StadiumBackground } from "@/components/ui/stadium-background";

interface PageLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  backgroundVariant?: "default" | "hero" | "subtle";
}

export const PageLayout = ({
  children,
  showNavbar = true,
  backgroundVariant = "default",
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      <StadiumBackground variant={backgroundVariant} />
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-16" : ""}>{children}</main>
    </div>
  );
};
