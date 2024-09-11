import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Echo",
  description: "Ultimate Pair programming platform",
  keywords: "echo, pair programming, code, programming, stream, live coding",
  icons: {
    icon: "/404.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NextTopLoader showSpinner={false} />
            {children}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
