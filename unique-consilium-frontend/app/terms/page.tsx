"use client";

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';

export default function TermsPage() {
  return (
  <main id="main-content" className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
      <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Terms</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Meta */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Terms of Service</h1>
          <p className="cds--body-short-01">Last updated: August 15, 2025</p>
          <p className="cds--body-long-01">
            These Terms of Service (the “Terms”) govern your access to and use of our websites, products, and services. By
            accessing or using our services, you agree to be bound by these Terms.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="cds--row">
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <section>
            <h2 className="cds--productive-heading-03">1) Acceptance of Terms</h2>
            <p className="cds--body-long-01">
              By accessing or using our services, you acknowledge that you have read, understood, and agree to these Terms and
              to our applicable policies referenced herein.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">2) Services &amp; Scope</h2>
            <p className="cds--body-long-01">
              We provide consulting and technology services as described in the applicable order or agreement. The scope,
              deliverables, and timelines are defined in mutually agreed statements of work.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">3) Accounts &amp; Security</h2>
            <p className="cds--body-long-01">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities under
              your account. Notify us immediately of any unauthorized use or security incident.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">4) Fees &amp; Payment</h2>
            <p className="cds--body-long-01">
              Fees, invoicing, and payment terms are specified in the applicable order or statement of work. Unless otherwise
              agreed, invoices are due upon receipt and payable in the stated currency.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">5) Confidentiality &amp; Data Protection (GDPR/KVKK)</h2>
            <p className="cds--body-long-01">
              Each party agrees to protect confidential information and to process personal data in compliance with applicable
              data protection laws, including GDPR and KVKK, as defined in the data processing terms where required.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">6) Intellectual Property</h2>
            <p className="cds--body-long-01">
              Unless otherwise agreed, we retain ownership of pre-existing IP and reusable assets. Client-specific deliverables
              are licensed or assigned as set forth in the applicable agreement.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">7) Warranties Disclaimer</h2>
            <p className="cds--body-long-01">
              Except as expressly stated, the services are provided “as is” without warranties of any kind, whether express,
              implied, or statutory, including warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">8) Limitation of Liability</h2>
            <p className="cds--body-long-01">
              To the maximum extent permitted by law, neither party will be liable for indirect, incidental, special, or
              consequential damages. Our aggregate liability will not exceed the fees paid for the relevant services.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">9) Compliance &amp; Export Control</h2>
            <p className="cds--body-long-01">
              You agree to comply with applicable laws and regulations, including export control and sanctions regimes
              governing the use and transfer of technology and services.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">10) Termination</h2>
            <p className="cds--body-long-01">
              Either party may terminate as specified in the agreement for convenience or for cause, including material breach.
              Upon termination, you will pay for services performed and return confidential information.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">11) Governing Law &amp; Jurisdiction</h2>
            <p className="cds--body-long-01">
              These Terms are governed by the laws specified in the applicable agreement. Courts of the stated jurisdiction
              will have exclusive authority over disputes arising from these Terms.
            </p>
          </section>

          <section>
            <h2 className="cds--productive-heading-03">12) Contact</h2>
            <p className="cds--body-long-01">
              Questions about these Terms? <Link className="cds--link" href="/contact">Contact us</Link> and our team will assist you.
            </p>
          </section>
        </div>
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
      </div>
    </main>
  );
}
