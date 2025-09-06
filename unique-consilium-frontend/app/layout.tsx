import '@carbon/styles/css/styles.css';
import './globals.scss';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import Providers from '@/store/provider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CookieBar from '@/components/CookieBar';

export const metadata: Metadata = {
  title: 'Unique Consilium | Global Trade Consultancy',
  description: 'Premium, modern, reliable corporate trade consultancy.',
  manifest: '/manifest.json',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Unique Consilium | Global Trade Consultancy',
    description: 'Premium, modern, reliable corporate trade consultancy.',
    url: 'https://unique-consilium.com',
    siteName: 'Unique Consilium',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unique Consilium | Global Trade Consultancy',
    description: 'Premium, modern, reliable corporate trade consultancy.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f62fe',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="cds--skip-to-content">Skip to content</a>
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
          <CookieBar />
        </Providers>
  <div id="megamenu-root" />
      </body>
    </html>
  );
}
