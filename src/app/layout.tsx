import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { StrictMode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://naj-dev.com'),
  title: {
    default: 'naj-dev | Christian Coulibaly',
    template: '%s | naj-dev',
  },
  description:
    'Christian Coulibaly — Mobile Software Engineer at JPMorgan Chase.',
  openGraph: {
    title: 'Christian Coulibaly | naj-dev',
    description:
      'Mobile Software Engineer at JPMorgan Chase.',
    url: 'https://naj-dev.com',
    siteName: 'naj-dev',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'Portrait of Christian Coulibaly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Coulibaly | naj-dev',
    description:
      'Mobile Software Engineer at JPMorgan Chase.',
    images: ['/images/og-image.jpg'],
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
