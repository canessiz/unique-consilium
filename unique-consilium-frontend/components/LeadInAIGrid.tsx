"use client";

import * as React from "react";
import CategoryTiles, { type CategoryItem } from "./CategoryTiles";

export type LeadInAIGridProps = {
	title?: string;
	description?: string;
	items?: CategoryItem[];
	ariaLabel?: string;
	className?: string;
	headingLevel?: 'h2' | 'h3';
	colClassName?: string;
};

export const DEFAULT_ITEMS: CategoryItem[] = [
	{ title: "Autonomous Agents", description: "Task-specific agents with guardrails.", href: "/services", tags: ["AI","Agents"] },
	{ title: "Data Foundation", description: "Clean pipelines and governance.", href: "/services", tags: ["Data","MLOps"] },
	{ title: "Compliance by Design", description: "Controls aligned to GDPR/KVKK.", href: "/terms", tags: ["Compliance"] },
	{ title: "Innovation in Practice", description: "Experiment, measure, iterate.", href: "/consilium-principles/innovation", tags: ["Innovation"] },
	{ title: "Case Studies", description: "Outcomes and impact snapshots.", href: "/references", tags: ["References"] },
	{ title: "Briefings & Downloads", description: "Curated insights and PDFs.", href: "/downloads", tags: ["Docs"] },
];

export default function LeadInAIGrid({
	title,
	description,
	items,
	ariaLabel,
	className,
	headingLevel = 'h2',
	colClassName,
}: LeadInAIGridProps) {
	const resolvedItems = items && items.length > 0 ? items : DEFAULT_ITEMS;
	const resolvedColClassName = colClassName || "cds--col-sm-4 cds--col-md-4 cds--col-lg-4";
	const autoId = React.useId();
	const titleId = `${autoId}-title`;
	const descId = description ? `${autoId}-desc` : undefined;
	const Heading = headingLevel === 'h3' ? 'h3' : 'h2';
	const resolvedTitle = title ?? 'Lead in AI';

	return (
		<section
			role="region"
			aria-labelledby={titleId}
			{...(descId ? { 'aria-describedby': descId } : {})}
			className={["cds--row","uc-stack-08", className].filter(Boolean).join(" ")}
		>
			<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
				<Heading id={titleId} className="cds--productive-heading-03">{resolvedTitle}</Heading>
				{description ? <p id={descId} className="cds--body-long-01">{description}</p> : null}
			</div>
			<CategoryTiles
				items={resolvedItems}
				ariaLabel={ariaLabel ?? "Lead in AI categories"}
				colClassName={resolvedColClassName}
			/>
		</section>
	);
}

