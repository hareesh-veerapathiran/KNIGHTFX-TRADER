'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }} whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function RevealListItem({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.li initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.li>;
}

export function RevealDetails({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.details className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.details>;
}
