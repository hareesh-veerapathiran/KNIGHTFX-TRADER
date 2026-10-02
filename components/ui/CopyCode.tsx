'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

export function CopyCode({ code, label = 'COPY CODE' }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return <motion.button
    className={`copy-code${copied ? ' copy-code-copied' : ''}`}
    type="button"
    onClick={copyCode}
    aria-live="polite"
    whileTap={reduce ? undefined : { scale: .97 }}
    transition={{ duration: .18 }}
  >{copied ? '✓ COPIED' : label}</motion.button>;
}
