"use client";

import { Breadcrumb, BreadcrumbItem, ClickableTile } from '@carbon/react';

export default function ConsiliumPrinciplesPage() {
  return (
    <div className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Consilium Principles</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Intro */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Consilium Principles</h1>
          <p className="cds--body-long-01">Our guiding principles shape how we think, deliver, and partner for impact.</p>
        </div>
      </div>

      {/* Tiles */}
      <div className="cds--row" aria-label="Principles tiles">
        <div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-4">
          <ClickableTile href="/consilium-principles/perfectionism" aria-label="Read about Perfectionism">
            <h3 className="cds--productive-heading-03">Perfectionism</h3>
            <p className="cds--body-short-01">We pursue excellence with zero tolerance for mediocrity.</p>
          </ClickableTile>
        </div>

        <div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-4">
          <ClickableTile href="/consilium-principles/professionalism" aria-label="Read about Professionalism">
            <h3 className="cds--productive-heading-03">Professionalism</h3>
            <p className="cds--body-short-01">We act with integrity, clarity, and accountability.</p>
          </ClickableTile>
        </div>

        <div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-4">
          <ClickableTile href="/consilium-principles/innovation" aria-label="Read about Innovation">
            <h3 className="cds--productive-heading-03">Innovation</h3>
            <p className="cds--body-short-01">We solve complex trade problems with smart, modern methods.</p>
          </ClickableTile>
        </div>
      </div>
    </div>
  );
}
