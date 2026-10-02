import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function ArrowLink({ href, children, variant = 'lime', disabled = false, external = false }: { href: string; children: React.ReactNode; variant?: 'lime' | 'outline'; disabled?: boolean; external?: boolean }) {
  if (disabled) return <span className={`button button-${variant} button-disabled`} aria-disabled="true">{children}<ArrowUpRight size={16} /></span>;
  if (external) return <a className={`button button-${variant}`} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} /></a>;
  return <Link className={`button button-${variant}`} href={href}>{children}<ArrowUpRight size={16} /></Link>;
}
