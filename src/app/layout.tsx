import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GTZEN — Substrato",
  description: "Sistemas que constroem sistemas. A infraestrutura invisível por trás de marcas, produtos e decisões que escalam.",
  openGraph: {
    title: "GTZEN — Substrato",
    description: "Sistemas que constroem sistemas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain-overlay scanline`}
      >
        {children}
      </body>
    </html>
  );
}
