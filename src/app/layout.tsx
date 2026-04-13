import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { StrictMode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: 'naj-dev | Christian Coulibaly',
    template: '%s | naj-dev',
  },
  description:
    'Christian Coulibaly — Software Engineering student at Ohio State University. Full-stack developer passionate about accessible design, modern web apps, and creative tech solutions.',
  openGraph: {
    title: 'Christian Coulibaly | naj-dev',
    description:
      'Software Engineering student at OSU. Full-stack developer with experience at JP Morgan Chase, building modern web apps with React, Next.js, and TypeScript.',
    url: 'https://naj.dev',
    siteName: 'naj-dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Coulibaly | naj-dev',
    description:
      'Software Engineering student at OSU. Full-stack developer with experience at JP Morgan Chase.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </StrictMode>
  );
}
