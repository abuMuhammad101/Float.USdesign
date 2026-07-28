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
  title: "Float Moving — Book Residential & Commercial Movers",
  description:
    "Book a moving crew in minutes. See real crew packages, an upfront price range, and confirm your move date — residential, commercial, and hauling.",
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
