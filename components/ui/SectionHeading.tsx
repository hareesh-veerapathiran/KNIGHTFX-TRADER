import type { ReactNode } from 'react';
export function SectionHeading({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) { return <div className={`section-heading ${className}`}><span className="eyebrow"><i />{label}</span><h2>{children}</h2></div>; }
