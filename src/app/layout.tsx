import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { StrictMode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/Footer';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'naj-dev',
  description: 'Portfolio and website for developer Christian Coulibaly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang='en' suppressHydrationWarning>
        <body className='flex min-h-screen flex-col'>
      <SpeedInsights/>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className='flex-grow'>
              {children}
              <Analytics />
              </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </StrictMode>
  );
}
