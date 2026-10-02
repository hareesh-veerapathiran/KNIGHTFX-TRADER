import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/data/site';
import { Navbar } from '@/components/Navbar';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/ui/CustomCursor';
export const metadata: Metadata = { title: 'KNIGHTFX TRADERS — Discipline • Strategy • Growth', description: site.description, ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: '/' }, openGraph: { title: 'KNIGHTFX TRADERS — Discipline • Strategy • Growth', description: site.description, siteName: site.name, type: 'website', images: [{ url: site.logo, width: 1280, height: 1280, alt: 'KNIGHTFX Traders emblem' }] }, twitter: { card: 'summary_large_image', title: 'KNIGHTFX TRADERS — Discipline • Strategy • Growth', description: site.description, images: [site.logo] } } : { openGraph: { title: 'KNIGHTFX TRADERS — Discipline • Strategy • Growth', description: site.description, siteName: site.name, type: 'website' }, twitter: { card: 'summary', title: 'KNIGHTFX TRADERS — Discipline • Strategy • Growth', description: site.description } }), icons: { icon: site.logo } };
export const viewport: Viewport = { themeColor: '#050505', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Preloader/><Navbar/><CustomCursor/>{children}</body></html>; }
