import type { Metadata } from "next";
import { Poppins, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import IntroOverlay from "@/components/IntroOverlay";
import BackgroundReveal from "@/components/BackgroundReveal";
import ScrollToTop from "@/components/ScrollToTop";
import LenisScroll from "@/components/LenisScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  variable: "--font-poppins",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style:  ["italic"],
  variable: "--font-baskerville",
});

export const metadata: Metadata = {
  title: "Tiffany Zhang — Brand & Digital Design",
  description:
    "Designer translating brand and digital systems through research-led thinking, with a focus on clarity, intent, and cross-platform consistency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${libreBaskerville.variable}`}>
      <body>
        <LenisScroll />
        <ScrollToTop />
        <BackgroundReveal />
        <IntroOverlay />
        <CustomCursor />
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 20 }}>
            <Nav />
          </div>
          {children}
          <div style={{ position: "relative", zIndex: 10 }}>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
