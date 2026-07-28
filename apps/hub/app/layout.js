import { Montserrat, Inter } from "next/font/google";
import "@float/ui/tokens/tokens.css";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "Float.us — Moving, Towing, Fishing & Detailing",
  description:
    "We move. We tow. We clean. We fish. You enjoy. Float.us is the hub for Float Moving, Float Towing, Float Fishing, and Float Detailing — book any Float service and earn entries to win an offshore fishing trip.",
};

export const viewport = {
  themeColor: "#030a17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
