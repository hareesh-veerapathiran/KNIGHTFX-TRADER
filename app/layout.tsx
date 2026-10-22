import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/data/site';
import { Navbar } from '@/components/Navbar';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/ui/CustomCursor';
const pageTitle = `${site.name} — Discipline • Strategy • Growth`;
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: pageTitle,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: pageTitle,
    description: site.description,
    siteName: site.name,
    type: 'website',
    images: [{ url: site.logo, width: 1024, height: 1024, alt: 'KNIGHTFX Trading Labs official silver logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: site.description,
    images: [site.logo],
  },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};
export const viewport: Viewport = { themeColor: '#080908', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Preloader/><Navbar/><CustomCursor/>{children}</body></html>; }
