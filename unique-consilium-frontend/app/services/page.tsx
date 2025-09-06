"use client";

import { Breadcrumb, BreadcrumbItem, Tile } from '@carbon/react';

export default function ServicesPage() {
  return (
  <main id="main-content" className="cds--grid uc-page">
      <div className="cds--row">
        <div className="cds--col">
      <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Services</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="cds--row uc-stack-06">
        <div className="cds--col">
      <h1 className="cds--expressive-heading-05">Services</h1>
          <p className="cds--body-long-01">
            Strategy, operations and technology for cross-border trade. All delivered with IBM Carbon
            standards, accessibility and performance in mind.
          </p>
        </div>
      </div>

      <div className="cds--row uc-stack-08">
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Trade Strategy</h3>
            <p className="cds--body-long-01">Go-to-market, pricing and channel design.</p>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Market Entry</h3>
            <p className="cds--body-long-01">Target markets, regulations and localization.</p>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Compliance & Risk</h3>
            <p className="cds--body-long-01">Customs, export controls and documentation.</p>
          </Tile>
        </div>

        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Partner Sourcing</h3>
            <p className="cds--body-long-01">Manufacturers, distributors and due diligence.</p>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Contract Negotiation</h3>
            <p className="cds--body-long-01">Terms, SLAs and risk allocation.</p>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Analytics & Reporting</h3>
            <p className="cds--body-long-01">KPIs, dashboards and continuous improvement.</p>
          </Tile>
        </div>
      </div>
    </main>
  );
}
