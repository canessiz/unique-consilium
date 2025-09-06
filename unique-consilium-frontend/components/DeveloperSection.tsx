"use client";
import * as React from 'react';
import Link from 'next/link';

export interface DeveloperSectionProps {
  id?: string;
  className?: string;
}

const LEFT_LINKS = [
  { label: 'Placeholder link one', href: '/placeholder/one' },
  { label: 'Placeholder link two', href: '/placeholder/two' },
  { label: 'Placeholder link three', href: '/placeholder/three' },
  { label: 'Placeholder link four', href: '/placeholder/four' }
];

const RIGHT_LINKS = [
  { label: 'Placeholder link five', href: '/placeholder/five' },
  { label: 'Placeholder link six', href: '/placeholder/six' },
  { label: 'Placeholder link seven', href: '/placeholder/seven' },
  { label: 'Placeholder link eight', href: '/placeholder/eight' }
];

export default function DeveloperSection({ id, className }: DeveloperSectionProps) {
  const headingId = id || React.useId();
  return (
    <section aria-labelledby={headingId} className={["uc-devtoolkit", className].filter(Boolean).join(' ')}>
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
          <h2 id={headingId} className="cds--type-expressive-heading-05 uc-devtoolkit__heading">Developer toolkit</h2>
        </div>
      </div>
      <div className="cds--row uc-devtoolkit__cols" role="group" aria-label="Developer resources">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8 uc-devtoolkit__col">
          <h3 className="cds--productive-heading-03 uc-devtoolkit__sub">
            <span className="uc-devtoolkit__accent">Build</span>{' '}
            <span className="uc-devtoolkit__accent">learn</span>{' '}
            <span className="uc-devtoolkit__accent">deploy</span>
          </h3>
          <p className="cds--type-body-long-02 uc-devtoolkit__intro">Placeholder paragraph describing how to build fast, learn quickly and deploy reliably with modern AI tooling.</p>
          <ul className="uc-devtoolkit__links" role="list">
            {LEFT_LINKS.map((l, i) => (
              <li key={l.href + i} className="uc-devtoolkit__item">
                <Link href={l.href} className="cds--link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8 uc-devtoolkit__col">
          <h3 className="cds--productive-heading-03 uc-devtoolkit__sub">Why us?</h3>
          <p className="cds--type-body-long-02 uc-devtoolkit__intro">Second placeholder paragraph outlining analyst perspective and value narrative with generic wording for now.</p>
          <ul className="uc-devtoolkit__links" role="list">
            {RIGHT_LINKS.map((l, i) => (
              <li key={l.href + i} className="uc-devtoolkit__item">
                <Link href={l.href} className="cds--link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
