import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { StrictMode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "naj-dev",
  description: "Portfolio and website for developer Christian Coulibaly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>

        </body>
      </html>
    </StrictMode>

  );
}
