import { Montserrat, Inter } from "next/font/google";
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
  title: "Float.us — Coming Soon",
  description:
    "We move. We tow. You enjoy. Float.us is preparing an experience that moves you — residential moving, commercial moving, marine towing, fishing charters, and hauling services.",
};

export const viewport = {
  themeColor: "#030e21",
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
