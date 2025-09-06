"use client";

import { Breadcrumb, BreadcrumbItem, Tile, Tag } from '@carbon/react';

export default function ReferencesPage() {
  return (
  <main id="main-content" className="cds--grid uc-page">
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>References</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="cds--row uc-stack-06">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">References</h1>
          <p className="cds--body-long-01">A selection of engagements and success stories.</p>
        </div>
      </div>

  <section className="cds--row uc-stack-08" aria-label="Reference tiles">
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">ACME Europe</h3>
            <p className="cds--body-long-01">Market entry & partner sourcing.</p>
            <Tag type="green">EU</Tag>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Globex MENA</h3>
            <p className="cds--body-long-01">Compliance & risk framework.</p>
            <Tag type="cyan">MENA</Tag>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Initech APAC</h3>
            <p className="cds--body-long-01">Channel design & pricing.</p>
            <Tag type="purple">APAC</Tag>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Umbrella NA</h3>
            <p className="cds--body-long-01">Customs & export controls.</p>
            <Tag type="blue">NA</Tag>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Stark LATAM</h3>
            <p className="cds--body-long-01">Partner due diligence.</p>
            <Tag type="magenta">LATAM</Tag>
          </Tile>
        </div>
        <div className="cds--col-lg-4 cds--col">
          <Tile>
            <h3 className="cds--productive-heading-03">Wayne EMEA</h3>
            <p className="cds--body-long-01">Contracts & SLAs.</p>
            <Tag type="teal">EMEA</Tag>
          </Tile>
        </div>
      </section>
    </main>
  );
}
