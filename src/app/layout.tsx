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
    'Christian Coulibaly — Mobile Software Engineer Intern at JPMorgan Chase. Two-time JPMC hackathon winner. Builds for Android, the web, and beyond.',
  openGraph: {
    title: 'Christian Coulibaly | naj-dev',
    description:
      'Mobile Software Engineer Intern at JPMorgan Chase. Two-time JPMC hackathon winner. Builds for Android, the web, and beyond.',
    url: 'https://naj.dev',
    siteName: 'naj-dev',
    locale: 'en_US',
    type: 'website',
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
