'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { certificates } from '@/data/certificates';

function CertificateItems({ duplicate = false }: { duplicate?: boolean }) {
  return certificates.map((certificate) => (
    <figure
      className="certificate-card"
      key={`${certificate.id}${duplicate ? '-loop' : ''}`}
      tabIndex={duplicate ? -1 : 0}
    >
      <Image
        src={certificate.src}
        alt={certificate.alt}
        width={certificate.width}
        height={certificate.height}
        sizes="(max-width: 600px) 82vw, (max-width: 1000px) 44vw, 32vw"
        draggable={false}
      />
    </figure>
  ));
}

export function Certificates() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section className="certificates section-pad" aria-labelledby="certificates-title">
      <div className="certificates-heading-row">
        <SectionHeading label="PROOF OF DISCIPLINE">
          <span id="certificates-title">CHALLENGES CLEARED.</span>
        </SectionHeading>
        {!reduceMotion && certificates.length > 0 && (
          <button
            className="certificate-motion-toggle"
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? 'RESUME MOTION' : 'PAUSE MOTION'}
          </button>
        )}
      </div>

      <p className="certificates-supporting">
        Every milestone represents discipline, consistency, and commitment to the process.
      </p>

      {certificates.length > 0 ? (
        <div
          className={`certificate-viewport${paused ? ' is-paused' : ''}`}
          role="region"
          aria-label="Prop firm challenge-cleared certificates"
          tabIndex={0}
        >
          <div className="certificate-track">
            <div className="certificate-sequence">
              <CertificateItems />
            </div>
            <div className="certificate-sequence" aria-hidden="true">
              <CertificateItems duplicate />
            </div>
          </div>
        </div>
      ) : (
        <div className="certificate-empty">
          Certificate images will appear here when they are added.
        </div>
      )}
    </section>
  );
}
