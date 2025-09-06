"use client";

import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
  <main id="main-content" className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Contact</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Intro */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Contact</h1>
          <p className="cds--body-long-01">Send us a message and our team will respond shortly.</p>
        </div>
      </div>

      {/* Form centered on large screens */}
      <div className="cds--row">
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <ContactForm />
        </div>
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
      </div>

      {/* Secondary info */}
      <div className="cds--row">
        <div className="cds--col">
          <p className="cds--body-long-01">
            Prefer email or phone? <a className="cds--link" href="mailto:hello@uniqueconsilium.com">hello@uniqueconsilium.com</a> · <a className="cds--link" href="tel:+900000000000">+90 000 000 00 00</a>
          </p>
        </div>
      </div>
  </main>
  );
}
