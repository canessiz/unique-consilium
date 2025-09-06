"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ActionableNotification } from '@carbon/react';

const CONSENT_KEY = 'uc-cookie-consent';
const CONSENT_VERSION = '2025-08'; // Terms last updated version
const CONSENT_TTL_DAYS = 180;
type ConsentState = { status: 'accepted'; ver: string; ts: number };

export default function CookieBar(): JSX.Element | null {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(CONSENT_KEY) : null;
      if (raw) {
        let parsed: unknown = null;
        try {
          parsed = JSON.parse(raw);
        } catch {
          // ignore JSON parse errors (legacy values)
        }
        const cs = parsed as Partial<ConsentState> | null;
        const isValid =
          !!cs &&
          cs.status === 'accepted' &&
          cs.ver === CONSENT_VERSION &&
          typeof cs.ts === 'number' &&
          Date.now() - cs.ts < CONSENT_TTL_DAYS * 864e5;
        if (isValid) {
          setAccepted(true);
        }
      }
    } catch {
      // ignore storage errors
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) return null;
  if (accepted) return null;

  return (
    <div className="uc-cookiebar" role="region" aria-label="Cookie consent" aria-live="polite" data-testid="cookiebar">
      <ActionableNotification
        kind="info"
        lowContrast
        inline={false}
        hideCloseButton
        actionButtonLabel="Accept"
        onActionButtonClick={() => {
          try {
            localStorage.setItem(
              CONSENT_KEY,
              JSON.stringify({ status: 'accepted', ver: CONSENT_VERSION, ts: Date.now() } satisfies ConsentState)
            );
          } catch {
            // ignore
          }
          setAccepted(true);
        }}
        subtitle="We use cookies for essential site functionality and to improve your experience."
        title="Cookies on Unique Consilium"
      >
        <Link href="/terms" className="cds--link">Learn more</Link>
      </ActionableNotification>
    </div>
  );
}
