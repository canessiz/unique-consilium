"use client";

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Tag } from '@carbon/react';

export default function InnovationPage() {
  return (
    <main id="main-content" className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/consilium-principles">Consilium Principles</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Innovation</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Intro */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Innovation</h1>
          <p className="cds--body-long-01">
            We advance global trade with curiosity, pragmatic engineering, and solutions that drive measurable impact.
          </p>
          <div role="group" aria-label="Principle tags">
            <Tag>Curiosity</Tag>
            <Tag>Pragmatism</Tag>
            <Tag>Impact</Tag>
          </div>
        </div>
      </div>

      {/* Two-column content */}
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <h2 className="cds--productive-heading-03">What it means</h2>
          <p className="cds--body-long-01">
            Innovation is purposeful change—linking insight to action and turning complex problems into scalable outcomes.
          </p>
          <ul className="cds--list--unordered">
            <li>Start with the user and the business objective</li>
            <li>Validate assumptions quickly and learn openly</li>
            <li>Balance novelty with reliability and maintainability</li>
          </ul>
        </div>
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <h2 className="cds--productive-heading-03">How we apply it</h2>
          <p className="cds--body-long-01">
            We experiment in small, safe steps—shipping value early, measuring results, and iterating with discipline.
          </p>
          <ul className="cds--list--unordered">
            <li>Discovery spikes and rapid proofs with clear exit criteria</li>
            <li>Data-informed prioritization and decision records</li>
            <li>Design system first delivery with Carbon grid and tokens</li>
          </ul>
        </div>
      </div>

      {/* Standards */}
      <div className="cds--row">
        <div className="cds--col">
          <h2 className="cds--productive-heading-03">Standards we drive</h2>
          <ol className="cds--list--ordered">
            <li>Continuous improvement &amp; experimentation</li>
            <li>Data-informed decisions and measurable outcomes</li>
            <li>Rapid prototyping with enterprise safety &amp; compliance</li>
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
