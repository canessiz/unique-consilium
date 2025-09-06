"use client";

import { Breadcrumb, BreadcrumbItem, Tile } from '@carbon/react';

export default function TeamPage() {
  return (
  <main id="main-content" className="cds--grid uc-page">
      <div className="cds--row">
        <div className="cds--col">
      <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Team</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="cds--row uc-stack-06">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Team</h1>
          <p className="cds--body-long-01">Senior experts in cross-border trade and operations.</p>
        </div>
      </div>

      <div className="cds--row uc-stack-08">
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Can Es</h3>
            <p className="cds--body-long-01">Founder & Principal Consultant</p>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">A. Kaya</h3>
            <p className="cds--body-long-01">Head of Market Entry</p>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">E. Yılmaz</h3>
            <p className="cds--body-long-01">Compliance & Risk Lead</p>
          </Tile>
        </div>
      </div>
    </main>
  );
}
