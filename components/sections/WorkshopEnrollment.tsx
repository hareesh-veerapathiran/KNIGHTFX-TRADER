'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Send, X } from 'lucide-react';
import { validateWorkshopCoupon, workshop } from '@/data/workshop';
import { site } from '@/data/site';

type CouponStatus = 'idle' | 'empty' | 'invalid' | 'verified';
type LeadField = 'fullName' | 'email' | 'mobileNumber' | 'telegramUsernameOrId' | 'consent';
type LeadErrors = Partial<Record<LeadField, string>>;

const emptyLead = {
  fullName: '',
  email: '',
  mobileNumber: '',
  telegramUsernameOrId: '',
  consent: false,
};

function validateLead(lead: typeof emptyLead): LeadErrors {
  const errors: LeadErrors = {};
  const name = lead.fullName.trim();
  const email = lead.email.trim();
  const digits = lead.mobileNumber.replace(/\D/g, '');
  const telegram = lead.telegramUsernameOrId.trim();

  if (name.length < 2) errors.fullName = 'Enter your full name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!/^\+?[\d\s().-]{7,22}$/.test(lead.mobileNumber.trim()) || digits.length < 7 || digits.length > 15) {
    errors.mobileNumber = 'Enter a valid international mobile number.';
  }
  if (!(/^@[A-Za-z][A-Za-z0-9_]{4,31}$/.test(telegram) || /^\d{5,20}$/.test(telegram))) {
    errors.telegramUsernameOrId = 'Enter a Telegram username such as @Knightfx16 or a numeric Telegram ID.';
  }
  if (!lead.consent) errors.consent = 'Consent is required to continue.';
  return errors;
}

export function WorkshopEnrollment() {
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<CouponStatus>('idle');
  const [offerUnlocked, setOfferUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lead, setLead] = useState(emptyLead);
  const [leadErrors, setLeadErrors] = useState<LeadErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const finalPrice = workshop.currentPrice - workshop.coupon.discount;

  useEffect(() => {
    if (!modalOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.querySelector<HTMLElement>('[name="fullName"]')?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setModalOpen(false);
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [modalOpen]);

  function applyCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateWorkshopCoupon(couponInput);
    setCouponStatus(result);
    if (result === 'verified') {
      setSubmitError('');
      setLeadErrors({});
      setModalOpen(true);
    }
  }

  function updateLead(field: keyof typeof emptyLead, value: string | boolean) {
    setLead((current) => ({ ...current, [field]: value }));
    setLeadErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError('');
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateLead(lead);
    setLeadErrors(errors);
    setSubmitError('');
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/workshop-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin',
        body: JSON.stringify({
          ...lead,
          fullName: lead.fullName.trim(),
          email: lead.email.trim(),
          mobileNumber: lead.mobileNumber.trim(),
          telegramUsernameOrId: lead.telegramUsernameOrId.trim(),
          couponCode: couponInput.trim(),
        }),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;

      if (!response.ok || !result?.ok) {
        setSubmitError(result?.error || 'We could not submit your details. Please try again.');
        return;
      }

      setOfferUnlocked(true);
      setModalOpen(false);
    } catch {
      setSubmitError('We could not connect securely. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
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
            <span className="workshop-detail-label">WORKSHOP MODULES</span>
            <motion.ol
              className="workshop-modules"
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.08 } } }}
            >
              {workshop.modules.map((module, index) => (
                <motion.li key={module} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: reduceMotion ? 0.01 : 0.38 }}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{module}
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div className="workshop-price-panel">
            <span className="workshop-detail-label">WORKSHOP INVESTMENT</span>
            <div className="workshop-price-line">
              <del>${workshop.originalPrice}</del>
              <span className="workshop-current-price">${workshop.currentPrice}</span>
            </div>
            <span className="workshop-capacity workshop-capacity-price"><i aria-hidden="true"/>LIMITED TO {workshop.capacity} MEMBERS</span>

            {!offerUnlocked ? (
              <div className="workshop-coupon">
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
                  {couponStatus === 'verified' && 'COUPON VERIFIED — COMPLETE YOUR DETAILS'}
                </p>
              </div>
            ) : (
              <motion.div
                className="workshop-offer-unlocked"
                initial={reduceMotion ? false : { opacity: 0, height: 0, y: 8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <strong className="workshop-unlocked-status">✓ KNIGHTFX OFFER UNLOCKED</strong>
                <div className="workshop-unlocked-original"><del>${workshop.originalPrice}</del><span>${workshop.currentPrice}</span></div>
                <div className="workshop-discount-row">
                  <span>KNIGHTFX DISCOUNT</span>
                  <strong>-${workshop.coupon.discount}</strong>
                </div>
                <span className="workshop-final-label">FINAL PRICE</span>
                <div className="workshop-final-price-wrap">
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
                </div>
              </motion.div>
            )}

            {offerUnlocked && (
              <a className="button button-lime workshop-reserve" href={workshop.telegramUrl} target="_blank" rel="noopener noreferrer">
                {workshop.cta.toUpperCase()} <ArrowUpRight size={17}/>
              </a>
            )}

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

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="workshop-modal-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isSubmitting) setModalOpen(false);
            }}
          >
            <motion.div
              ref={modalRef}
              className="workshop-lead-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="workshop-modal-title"
              aria-describedby="workshop-modal-description"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="workshop-modal-top">
                <span className="eyebrow"><i/>KNIGHTFX WORKSHOP OFFER</span>
                <button className="workshop-modal-close" type="button" aria-label="Close offer form" onClick={() => !isSubmitting && setModalOpen(false)} disabled={isSubmitting}><X size={18}/></button>
              </div>
              <h3 id="workshop-modal-title">UNLOCK YOUR<br/><em>KNIGHTFX OFFER</em></h3>
              <p id="workshop-modal-description">Enter your details to access the exclusive KNIGHTFX workshop offer.</p>

              <form className="workshop-lead-form" onSubmit={submitLead} noValidate>
                <div className="workshop-field">
                  <label htmlFor="lead-full-name">FULL NAME</label>
                  <input id="lead-full-name" name="fullName" autoComplete="name" placeholder="Enter your full name" value={lead.fullName} onChange={(event) => updateLead('fullName', event.target.value)} aria-invalid={Boolean(leadErrors.fullName)} aria-describedby={leadErrors.fullName ? 'lead-name-error' : undefined}/>
                  {leadErrors.fullName && <span id="lead-name-error" className="workshop-field-error">{leadErrors.fullName}</span>}
                </div>
                <div className="workshop-field">
                  <label htmlFor="lead-email">EMAIL ADDRESS</label>
                  <input id="lead-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" value={lead.email} onChange={(event) => updateLead('email', event.target.value)} aria-invalid={Boolean(leadErrors.email)} aria-describedby={leadErrors.email ? 'lead-email-error' : undefined}/>
                  {leadErrors.email && <span id="lead-email-error" className="workshop-field-error">{leadErrors.email}</span>}
                </div>
                <div className="workshop-field">
                  <label htmlFor="lead-mobile">MOBILE NUMBER</label>
                  <input id="lead-mobile" name="mobileNumber" type="tel" autoComplete="tel" placeholder="Enter your mobile number" value={lead.mobileNumber} onChange={(event) => updateLead('mobileNumber', event.target.value)} aria-invalid={Boolean(leadErrors.mobileNumber)} aria-describedby={leadErrors.mobileNumber ? 'lead-mobile-error' : undefined}/>
                  {leadErrors.mobileNumber && <span id="lead-mobile-error" className="workshop-field-error">{leadErrors.mobileNumber}</span>}
                </div>
                <div className="workshop-field">
                  <label htmlFor="lead-telegram">TELEGRAM USERNAME / ID</label>
                  <input id="lead-telegram" name="telegramUsernameOrId" autoComplete="off" placeholder="@username or Telegram ID" value={lead.telegramUsernameOrId} onChange={(event) => updateLead('telegramUsernameOrId', event.target.value)} aria-invalid={Boolean(leadErrors.telegramUsernameOrId)} aria-describedby={leadErrors.telegramUsernameOrId ? 'lead-telegram-error telegram-help' : 'telegram-help'}/>
                  <span id="telegram-help" className="workshop-field-help">Please provide your Telegram username (for example, @Knightfx16) or your Telegram ID so we can contact you regarding the workshop.</span>
                  {leadErrors.telegramUsernameOrId && <span id="lead-telegram-error" className="workshop-field-error">{leadErrors.telegramUsernameOrId}</span>}
                </div>

                <div className="workshop-consent-field">
                  <label>
                    <input type="checkbox" name="consent" checked={lead.consent} onChange={(event) => updateLead('consent', event.target.checked)} aria-invalid={Boolean(leadErrors.consent)} aria-describedby={leadErrors.consent ? 'lead-consent-error privacy-note' : 'privacy-note'}/>
                    <span>I agree to be contacted by KNIGHTFX regarding the Futures + CFD Workshop and related registration information.</span>
                  </label>
                  {leadErrors.consent && <span id="lead-consent-error" className="workshop-field-error">{leadErrors.consent}</span>}
                  <p id="privacy-note">Your information will be used only for workshop communication and registration-related purposes. {site.legal.privacyUrl ? <a href={site.legal.privacyUrl} target="_blank" rel="noopener noreferrer">Please review the Privacy Policy</a> : 'Please review the Privacy Policy for more information.'}</p>
                </div>

                {submitError && <p className="workshop-submit-error" role="alert" aria-live="polite">{submitError}</p>}
                <button className="button button-lime workshop-lead-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'SUBMITTING…' : 'UNLOCK MY $100 OFFER'} <ArrowUpRight size={16}/>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
