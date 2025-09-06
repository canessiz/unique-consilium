"use client";
import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@carbon/icons-react';

export interface CapabilityItem {
  title: string;
  href: string;
}

export interface CapabilitySectionProps {
  id?: string;
  heading?: string;
  intro?: string;
  items?: CapabilityItem[];
  className?: string;
}

const DEFAULT_ITEMS: CapabilityItem[] = [
  { title: 'AI agents', href: '/capabilities/ai-agents' },
  { title: 'Data for AI', href: '/capabilities/data-for-ai' },
  { title: 'Automation', href: '/capabilities/automation' },
  { title: 'Hybrid cloud', href: '/capabilities/hybrid-cloud' },
  { title: 'AI models', href: '/capabilities/ai-models' },
  { title: 'Analytics', href: '/capabilities/analytics' },
  { title: 'Security and identity', href: '/capabilities/security-identity' },
  { title: 'Consulting', href: '/capabilities/consulting' },
];

export default function CapabilitySection({
  id,
  heading = 'Lead in the AI era with Unique Consilium',
  intro = 'Placeholder paragraph: from next‑generation AI to modern platform services, we help you reinvent how your business works in the era of intelligent automation.',
  items = DEFAULT_ITEMS,
  className,
}: CapabilitySectionProps) {
  const headingId = id || React.useId();
  if (!items.length) return null;
  return (
    <section aria-labelledby={headingId} className={["uc-capabilities-block", className].filter(Boolean).join(' ')}>
      <div className="cds--row uc-capabilities-block__lead">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-7 cds--col-xlg-7">
          <h2 id={headingId} className="cds--type-expressive-heading-05 uc-capabilities-block__heading">{heading}</h2>
        </div>
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-9 cds--col-xlg-9">
          <p className="cds--type-body-long-02 uc-capabilities-block__intro">{intro}</p>
        </div>
      </div>
      <div className="uc-cap-grid" role="list" aria-label="Capability categories">
        {items.slice(0, 8).map((item, i) => (
          <Link
            key={item.href + i}
            href={item.href}
            role="listitem"
            className="uc-cap-card"
            aria-label={item.title}
          >
            <span className="uc-cap-card__title cds--label-02">{item.title}</span>
            <div className="uc-cap-card__spacer" aria-hidden="true" />
            <div className="uc-cap-card__icons" aria-hidden="true">
              <div className="uc-cap-card__icon" />
              <ArrowRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
