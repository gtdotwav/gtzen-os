import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "GTZEN — Substrato | Sistemas que constroem sistemas",
  description: "Geander, 22 anos. CEO da PAI (Partners in A.I). Sócio de fundos com 10+ empresas em portfólio. Construo a infraestrutura invisível por trás de marcas, produtos e decisões que escalam.",
  keywords: ["IA aplicada", "infraestrutura digital", "sistemas", "branding estratégico", "automação", "investimento", "Partners in AI", "PAI", "Geander", "GTZEN", "Substrato"],
  authors: [{ name: "Geander", url: "https://gtzen-os.vercel.app" }],
  creator: "Geander — GTZEN",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/substrato-favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/substrato-icon-512.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "GTZEN — Substrato",
    description: "22 anos. Poliglota. CEO da PAI. Sócio de fundos. Construo sistemas que pensam, marcas que escalam, e infraestrutura que dura.",
    type: "website",
    url: "https://gtzen-os.vercel.app",
    siteName: "Substrato",
    locale: "pt_BR",
    images: [
      {
        url: "/brand/substrato-icon-512.png",
        width: 512,
        height: 512,
        alt: "Substrato — Sistemas que constroem sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTZEN — Substrato",
    description: "Sistemas que constroem sistemas. A infraestrutura invisível por trás de marcas, produtos e decisões que escalam.",
    images: ["/brand/substrato-icon-512.png"],
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
