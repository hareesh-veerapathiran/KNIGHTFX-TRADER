'use client';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
export function Preloader() { const [show, setShow] = useState(false); const reduce = useReducedMotion(); useEffect(() => { if (sessionStorage.getItem('knightfx-loaded')) return; setShow(true); const t = setTimeout(() => { setShow(false); sessionStorage.setItem('knightfx-loaded', '1'); }, reduce ? 250 : 1050); return () => clearTimeout(t); }, [reduce]); return <AnimatePresence>{show && <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}><motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6 }}><Image src={site.logo} alt="KNIGHTFX Traders" width={164} height={164} priority /></motion.div><div className="loader-line"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .9, ease: 'easeInOut' }}/></div><span>DISCIPLINE • STRATEGY • GROWTH</span></motion.div>}</AnimatePresence>; }
