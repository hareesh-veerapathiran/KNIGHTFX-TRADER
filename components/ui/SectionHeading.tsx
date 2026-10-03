import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
export function SectionHeading({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) { return <div className={`section-heading ${className}`}><Reveal><span className="eyebrow"><i />{label}</span></Reveal><Reveal delay={0.08}><h2>{children}</h2></Reveal></div>; }
