'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { workshop } from '@/data/workshop';

export function WorkshopEnrollment() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="workshop-card"
      initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.24 } }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="workshop-card-top">
        <span>01 / WORKSHOP</span>
      </div>

      <div className="workshop-card-layout">
        <div className="workshop-card-left">
          <div className="workshop-card-title-row">
            <h3>{workshop.name}</h3>
            <div className="workshop-market-tags" aria-label="One workshop covering CFD and Futures">
              <span>CFD</span><b>+</b><span>FUTURES</span>
            </div>
          </div>
          <p className="workshop-description">{workshop.description}</p>
          <span className="workshop-detail-label">WORKSHOP MODULES</span>
          <motion.ol
            className="workshop-modules"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.08 } } }}
          >
            {workshop.modules.map((module, index) => (
              <motion.li
                key={module}
                variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 10 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: reduceMotion ? 0.01 : 0.38 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{module}
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="workshop-price-panel">
          <span className="workshop-detail-label">WORKSHOP INVESTMENT</span>
          <div className="workshop-price-line">
            <del>${workshop.referencePrice}</del>
            <span className="workshop-current-price">${workshop.price}</span>
          </div>
          <span className="workshop-capacity workshop-capacity-price"><i aria-hidden="true"/>LIMITED TO {workshop.capacity} MEMBERS</span>

          <a className="button button-lime workshop-reserve" href={workshop.telegramUrl} target="_blank" rel="noopener noreferrer">
            {workshop.cta.toUpperCase()} <ArrowUpRight size={17}/>
          </a>

          <div className="workshop-telegram">
            <div>
              <span>QUESTIONS OR INTERESTED?</span>
              <strong><Send size={13}/>{workshop.telegramUsername}</strong>
            </div>
            <a href={workshop.telegramUrl} target="_blank" rel="noopener noreferrer">MESSAGE ON TELEGRAM <ArrowUpRight size={14}/></a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
