import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ComingSoonProvider } from "@/components/ui/ComingSoonModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://enterprise.accredian.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0066FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Accredian Enterprise | Next-Gen Upskilling for Enterprise Teams",
    template: "%s | Accredian Enterprise",
  },
  description:
    "Transform your enterprise workforce with customized learning cohorts in Generative AI, Product Management, Data Science & Leadership led by top 1% industry experts.",
  keywords: [
    "Enterprise Upskilling",
    "Accredian Enterprise",
    "Corporate Upskilling",
    "Generative AI Training for Teams",
    "Product Management Corporate Training",
    "Leadership Upskilling Programs",
    "Enterprise AI Cohorts",
    "L&D Corporate Training India",
  ],
  authors: [{ name: "Accredian Enterprise Team", url: SITE_URL }],
  creator: "Accredian Enterprise",
  publisher: "Accredian",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Accredian Enterprise | Next-Gen Upskilling for Enterprise Teams",
    description:
      "Empower your workforce with tailored corporate learning cohorts in GenAI, Data Science, Product, and Leadership.",
    url: SITE_URL,
    siteName: "Accredian Enterprise",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero_badge_3d.png",
        width: 1200,
        height: 630,
        alt: "Accredian Enterprise Upskilling Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accredian Enterprise | Next-Gen Upskilling for Enterprise Teams",
    description:
      "Empower your workforce with tailored corporate learning cohorts in GenAI, Data Science, Product, and Leadership.",
    creator: "@accredian",
    site: "@accredian",
    images: ["/images/hero_badge_3d.png"],
  },
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
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-blue-100 selection:text-blue-700 dark:selection:bg-blue-900 dark:selection:text-blue-200">
        {/* Accessible Skip-to-Content Link for a11y & SEO */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ComingSoonProvider>{children}</ComingSoonProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
