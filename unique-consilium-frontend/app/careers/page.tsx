"use client";

import { Breadcrumb, BreadcrumbItem, Tile } from '@carbon/react';

export default function CareersPage() {
  return (
    <div className="cds--grid uc-page">
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Careers</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="cds--row uc-stack-06">
        <div className="cds--col">
          <h1 className="cds--type-expressive-heading-05">Careers</h1>
          <p className="cds--type-body-long-02">
            Join a premium, modern and reliable consultancy shaping global trade.
          </p>
        </div>
      </div>

      <div className="cds--row uc-stack-08">
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--type-productive-heading-03">Trade Analyst</h3>
            <p className="cds--type-body-long-02">Research, data and regulatory analysis.</p>
            <a className="cds--link" href="mailto:careers@unique-consilium.com?subject=Application%20-%20Trade%20Analyst">Apply</a>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--type-productive-heading-03">Market Entry Consultant</h3>
            <p className="cds--type-body-long-02">Localization, partner sourcing and GTM.</p>
            <a className="cds--link" href="mailto:careers@unique-consilium.com?subject=Application%20-%20Market%20Entry%20Consultant">Apply</a>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--type-productive-heading-03">Compliance Specialist</h3>
            <p className="cds--type-body-long-02">Customs, export controls and documentation.</p>
            <a className="cds--link" href="mailto:careers@unique-consilium.com?subject=Application%20-%20Compliance%20Specialist">Apply</a>
          </Tile>
        </div>
      </div>

      <div className="cds--row uc-stack-06">
        <div className="cds--col">
          <p className="cds--type-body-long-02">
            Don’t see a role that fits? Send your CV to <a className="cds--link" href="mailto:careers@unique-consilium.com">careers@unique-consilium.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
