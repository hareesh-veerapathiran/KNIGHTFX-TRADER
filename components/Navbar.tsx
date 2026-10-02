'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navigation } from '@/data/navigation';
import { site } from '@/data/site';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false); const [active, setActive] = useState('#home');
  useEffect(() => { const update = () => { setScrolled(window.scrollY > 24); let current = '#home'; for (const item of navigation) { const section = document.querySelector(item.href); if (section && section.getBoundingClientRect().top <= 150) current = item.href; } setActive(current); }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => { const keydown = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', keydown); return () => window.removeEventListener('keydown', keydown); }, []);
  return <><header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}><Link className="nav-logo" href="#home" aria-label="KNIGHTFX Traders home"><Image src={site.logo} alt="KNIGHTFX Traders emblem" width={52} height={52} priority /><span>KNIGHTFX<small>TRADERS</small></span></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} className={active === item.href ? 'nav-active' : ''} aria-current={active === item.href ? 'location' : undefined} href={item.href}>{item.label}</Link>)}</nav><Link className="nav-cta" href="#community">Join KNIGHTFX <ArrowUpRight size={14}/></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><span>{open ? 'CLOSE' : 'MENU'}</span>{open ? <X size={20}/> : <Menu size={20}/>}</button></header>
  <AnimatePresence>{open && <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><nav aria-label="Mobile navigation">{navigation.map((item, i) => <motion.div key={item.href} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .055 }}><Link href={item.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={18}/></Link></motion.div>)}<Link className="button button-lime mobile-join" href="#community" onClick={() => setOpen(false)}>Join KNIGHTFX <ArrowUpRight size={16}/></Link></nav><p className="mobile-tagline">DISCIPLINE • STRATEGY • GROWTH</p></motion.div>}</AnimatePresence></>;
}
