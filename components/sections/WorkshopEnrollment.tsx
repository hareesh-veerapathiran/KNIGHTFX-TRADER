'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { validateWorkshopCoupon, workshop } from '@/data/workshop';

type CouponStatus = 'idle' | ReturnType<typeof validateWorkshopCoupon>;

export function WorkshopEnrollment() {
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<CouponStatus>('idle');
  const reduceMotion = useReducedMotion();
  const isCouponApplied = couponStatus === 'applied';
  const finalPrice = isCouponApplied
    ? workshop.currentPrice - workshop.coupon.discount
    : workshop.currentPrice;

  function applyCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCouponStatus(validateWorkshopCoupon(couponInput));
  }

  return (
    <motion.article
      className="workshop-card"
      initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="workshop-card-top">
        <span>01 / WORKSHOP</span>
        <span className="workshop-capacity"><i aria-hidden="true"/>LIMITED TO {workshop.capacity} MEMBERS</span>
      </div>

      <div className="workshop-card-intro">
        <div>
          <h3>{workshop.name}</h3>
          <p>{workshop.description}</p>
        </div>
        <div className="workshop-market-tags" aria-label="Workshop covers CFD and Futures">
          <span>CFD</span><b>+</b><span>FUTURES</span>
        </div>
      </div>

      <div className="workshop-card-details">
        <div className="workshop-modules-wrap">
          <span className="workshop-detail-label">WORKSHOP MODULES</span>
          <ol className="workshop-modules">
            {workshop.modules.map((module, index) => (
              <li key={module}><span>{String(index + 1).padStart(2, '0')}</span>{module}</li>
            ))}
          </ol>
        </div>

        <div className="workshop-price-panel">
          <span className="workshop-detail-label">WORKSHOP INVESTMENT</span>
          <div className="workshop-price-line">
            <del>${workshop.originalPrice}</del>
            <span className="workshop-current-price">${workshop.currentPrice}</span>
          </div>

          <div className={`workshop-coupon ${isCouponApplied ? 'coupon-applied' : ''}`}>
            <h4>HAVE A COUPON?</h4>
            <form className="workshop-coupon-form" onSubmit={applyCoupon} noValidate>
              <label className="sr-only" htmlFor="workshop-coupon">Enter coupon code</label>
              <input
                id="workshop-coupon"
                name="coupon"
                type="text"
                autoComplete="off"
                placeholder="ENTER COUPON CODE"
                value={couponInput}
                aria-describedby="workshop-coupon-feedback"
                aria-invalid={couponStatus === 'invalid' || couponStatus === 'empty'}
                onChange={(event) => {
                  setCouponInput(event.target.value);
                  setCouponStatus('idle');
                }}
              />
              <button className="button button-outline" type="submit">APPLY</button>
            </form>
            <p
              id="workshop-coupon-feedback"
              className={`workshop-coupon-feedback coupon-${couponStatus}`}
              role={couponStatus === 'invalid' || couponStatus === 'empty' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {couponStatus === 'invalid' && 'INVALID COUPON CODE'}
              {couponStatus === 'empty' && 'ENTER A COUPON CODE'}
              {isCouponApplied && '✓ KNIGHTFX COUPON APPLIED'}
            </p>
          </div>

          {isCouponApplied && (
            <div className="workshop-discount-row" aria-live="polite">
              <span>KNIGHTFX DISCOUNT</span>
              <strong>-${workshop.coupon.discount}</strong>
            </div>
          )}

          {isCouponApplied && <span className="workshop-final-label">FINAL PRICE</span>}
          {isCouponApplied && <div className="workshop-final-price-wrap" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong
                key={finalPrice}
                className="workshop-final-price"
                initial={reduceMotion ? false : { opacity: 0, y: 5, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                ${finalPrice}
              </motion.strong>
            </AnimatePresence>
          </div>}
        </div>
      </div>

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
    </motion.article>
  );
}
