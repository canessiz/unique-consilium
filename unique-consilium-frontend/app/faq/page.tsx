"use client";

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Accordion, AccordionItem } from '@carbon/react';

export default function FAQPage() {
  return (
    <main id="main-content" className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>FAQ</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Intro */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">FAQ</h1>
          <p className="cds--body-long-01">Answers to common questions about our services, approach, and ways of working.</p>
        </div>
      </div>

      {/* Content: Centered Accordion */}
      <div className="cds--row">
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <Accordion>
            <AccordionItem title="What services do you provide?">
              <p className="cds--body-long-01">
                We provide consulting across strategy, design, and engineering with a focus on data and AI. From discovery and architecture to delivery and enablement, we cover the full lifecycle.
              </p>
            </AccordionItem>
            <AccordionItem title="Which industries do you specialize in?">
              <p className="cds--body-long-01">
                We work across financial services, retail, telecommunications, public sector, and healthcare, applying domain-aware best practices.
              </p>
            </AccordionItem>
            <AccordionItem title="Do you work internationally?">
              <p className="cds--body-long-01">
                Yes. We operate remotely by default and support on-site engagements across EMEA when required by the project scope.
              </p>
            </AccordionItem>
            <AccordionItem title="How can we start a project?">
              <p className="cds--body-long-01">
                Reach out via our contact form. We'll schedule a short discovery call, align on outcomes, then share a proposal and delivery plan.
              </p>
            </AccordionItem>
            <AccordionItem title="How do you handle confidentiality and compliance?">
              <p className="cds--body-long-01">
                We work under NDAs and follow ISO-aligned practices. Data handling and security controls match your compliance requirements.
              </p>
            </AccordionItem>
            <AccordionItem title="What are your typical engagement models?">
              <p className="cds--body-long-01">
                Options include fixed-scope delivery, time-and-materials for flexibility, and retainers for ongoing support and optimization.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
      </div>

      {/* Footer line */}
      <div className="cds--row">
        <div className="cds--col">
          <p className="cds--body-long-01">
            Still have questions? <Link className="cds--link" href="/contact">Contact us</Link>.
          </p>
        </div>
      </div>
  </main>
  );
}
