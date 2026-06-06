import type { Metadata } from "next";
import { Poppins, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script id="gtm-head" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M6SSBQSW');`}</Script>
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6SSBQSW" height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
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
          <div className="home-section-bleed" style={{ position: "relative", zIndex: 10 }}>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
