"use client";

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Tag } from '@carbon/react';

export default function ProfessionalismPage() {
  return (
  <main id="main-content" className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/consilium-principles">Consilium Principles</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Professionalism</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Intro */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Professionalism</h1>
          <p className="cds--body-long-01">
            We act with integrity, communicate clearly, and take ownership for outcomes—building trust through reliable delivery.
          </p>
          <div role="group" aria-label="Principle tags">
            <Tag>Integrity</Tag>
            <Tag>Clarity</Tag>
            <Tag>Accountability</Tag>
          </div>
        </div>
      </div>

      {/* Two-column content */}
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <h2 className="cds--productive-heading-03">What it means</h2>
          <p className="cds--body-long-01">
            Professionalism is consistency in behavior and craft—setting clear expectations and following through.
          </p>
          <ul className="cds--list--unordered">
            <li>Honest, respectful interactions and feedback</li>
            <li>Documented decisions and confirmed agreements</li>
            <li>Ownership mindset with proactive risk management</li>
          </ul>
        </div>
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <h2 className="cds--productive-heading-03">How we apply it</h2>
          <p className="cds--body-long-01">
            We operationalize standards in everyday workflows—clarity in plans, responsibilities, and tracking.
          </p>
          <ul className="cds--list--unordered">
            <li>Written scopes, timelines, and change control</li>
            <li>Clear roles, DRI assignments, and escalation paths</li>
            <li>Regular status updates with action-oriented notes</li>
          </ul>
        </div>
      </div>

      {/* Standards */}
      <div className="cds--row">
        <div className="cds--col">
          <h2 className="cds--productive-heading-03">Standards we uphold</h2>
          <ol className="cds--list--ordered">
            <li>Clear communication and written confirmations</li>
            <li>Transparent timelines and responsibilities</li>
            <li>Code of conduct and conflict-of-interest policies</li>
          </ol>
        </div>
      </div>

      {/* Footer link */}
      <div className="cds--row">
        <div className="cds--col">
          <p className="cds--body-short-01">
            Back to <Link href="/consilium-principles">Consilium Principles</Link> hub.
          </p>
        </div>
      </div>
  </main>
  );
}
