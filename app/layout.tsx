import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Mohammed Kromah - Frontend Developer | West Africa | Remote Work",
  description:
    "Experienced frontend & fullstack developer from Liberia, West Africa. Specializing in Next.js, React, TypeScript, and modern web technologies. Available for remote opportunities worldwide. 18+ years in Ghana.",
  keywords: [
    "frontend developer west africa",
    "web developer liberia",
    "remote developer africa",
    "next.js developer africa",
    "react developer ghana",
    "fullstack developer liberia",
    "mohammed kromah",
    "african software engineer",
    "hire african developer",
    "web developer ghana",
    "typescript developer africa",
  ],
  authors: [{ name: "Mohammed Kromah", url: "https://mohkromah.tech" }],
  creator: "Mohammed Kromah",
  publisher: "Mohammed Kromah",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohkromah.tech",
    siteName: "Mohammed Kromah Portfolio",
    title: "Mohammed Kromah - Frontend Developer | West Africa",
    description:
      "Experienced frontend & fullstack developer from West Africa. Specializing in Next.js, React, TypeScript. Available for remote opportunities worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Kromah - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Kromah - Frontend Developer | West Africa",
    description:
      "Experienced frontend & fullstack developer from West Africa. Specializing in Next.js, React, TypeScript. Available for remote opportunities.",
    images: ["/og-image.png"],
    creator: "@mohkromah",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://mohkromah.tech"),
  alternates: {
    canonical: "https://mohkromah.tech",
  },
  verification: {
    google: "_vBPjfJgLMiYWHF2Tgk0Oue9W-zlJE4lQsGEr3RWyM4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
            <CustomCursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
