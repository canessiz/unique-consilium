"use client";

import { Breadcrumb, BreadcrumbItem } from '@carbon/react';

export default function AboutPage() {
  return (
    <div className="cds--grid uc-page">
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>About</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="cds--row uc-stack-06">
        <div className="cds--col">
          <h1 className="cds--type-expressive-heading-05">About</h1>
          <p className="cds--type-body-long-02">
            Unique Consilium is a premium, modern and reliable global trade consultancy. We combine
            IBM Carbon Design System standards with meticulous execution to deliver consistent,
            accessible and performant digital experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
