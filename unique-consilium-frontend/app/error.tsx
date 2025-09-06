"use client";
import Link from 'next/link';
import { InlineNotification, Button } from '@carbon/react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log to console (or external service) for debugging
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="cds--grid uc-page">
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <h1 className="cds--expressive-heading-05">Something went wrong</h1>
          <div className="uc-stack-06">
            <InlineNotification
              kind="error"
              title="Unexpected error"
              subtitle={error?.message || 'An unexpected error occurred.'}
              role="alert"
              aria-live="assertive"
            />
            <p className="cds--body-long-01">
              You can try the action again or return to the homepage.
            </p>
            <Button kind="primary" onClick={() => reset()}>Try again</Button>
            <p className="cds--body-long-01">
              <Link className="cds--link" href="/">Back to home</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
