import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumina SaaS - Premium Platform",
  description: "Enterprise grade SaaS platform for premium users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
