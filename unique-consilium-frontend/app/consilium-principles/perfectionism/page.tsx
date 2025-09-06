"use client";

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Tag } from '@carbon/react';

export default function PerfectionismPage() {
	return (
		<main id="main-content" className="cds--grid uc-page">
			{/* Breadcrumb */}
			<div className="cds--row">
				<div className="cds--col">
					<Breadcrumb noTrailingSlash aria-label="Breadcrumb">
						<BreadcrumbItem href="/">Home</BreadcrumbItem>
						<BreadcrumbItem href="/consilium-principles">Consilium Principles</BreadcrumbItem>
						<BreadcrumbItem isCurrentPage>Perfectionism</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</div>

			{/* Heading + Intro */}
			<div className="cds--row">
				<div className="cds--col">
					<h1 className="cds--expressive-heading-05">Perfectionism</h1>
					<p className="cds--body-long-01">
						We pursue excellence through discipline, attention to detail, and uncompromising quality across strategy, design, and delivery.
					</p>
					<div role="group" aria-label="Principle tags">
						<Tag>Quality</Tag>
						<Tag>Discipline</Tag>
						<Tag>Detail</Tag>
					</div>
				</div>
			</div>

			{/* Two-column content */}
			<div className="cds--row">
				<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
					<h2 className="cds--productive-heading-03">What it means</h2>
					<p className="cds--body-long-01">
						Perfectionism is a mindset—setting the bar high, validating rigorously, and shipping work we can stand behind.
					</p>
					<ul className="cds--list--unordered">
						<li>Clear definitions of done and measurable quality gates</li>
						<li>Peer reviews and repeatable checklists for critical tasks</li>
						<li>Design system fidelity and consistent implementation</li>
					</ul>
				</div>
				<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
					<h2 className="cds--productive-heading-03">How we apply it</h2>
					<p className="cds--body-long-01">
						We transform high standards into habits—automation, documentation, and predictable workflows.
					</p>
					<ul className="cds--list--unordered">
						<li>Automated checks for accessibility, performance, and linting</li>
						<li>Token-first UI with Carbon grid and typography utilities</li>
						<li>Issue-driven delivery with traceable acceptance criteria</li>
					</ul>
				</div>
			</div>

			{/* Standards */}
			<div className="cds--row">
				<div className="cds--col">
					<h2 className="cds--productive-heading-03">Standards we follow</h2>
					<ol className="cds--list--ordered">
						<li>100% Carbon compliance (design system first)</li>
						<li>Accessibility audits (Lighthouse/axe)</li>
						<li>Performance budgets (Core Web Vitals)</li>
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
