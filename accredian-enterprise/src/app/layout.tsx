import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Accredian Enterprise | Next-Gen Upskilling for Enterprise Teams",
  description:
    "Transform your organization with customized learning programs in Product Management, Generative AI, Data Science, and Leadership led by top 1% industry experts.",
  keywords: [
    "Enterprise Upskilling",
    "Accredian Enterprise",
    "Generative AI Training",
    "Product Management Corporate Training",
    "Leadership Upskilling",
  ],
  authors: [{ name: "Accredian Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-700">
        {children}
      </body>
    </html>
  );
}
