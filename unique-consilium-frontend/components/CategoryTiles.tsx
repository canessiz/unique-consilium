"use client";

import * as React from "react";
import { Tile, ClickableTile, Tag } from "@carbon/react";

export type CategoryItem = {
	title: string;
	description?: string;
	href?: string;
	external?: boolean;
	tags?: string[];
	icon?: React.ReactElement;
	ariaLabel?: string;
};

export type CategoryTilesProps = {
	items: CategoryItem[];
	className?: string;
	colClassName?: string;
	ariaLabel?: string;
};

export default function CategoryTiles({
	items,
	className,
	colClassName = "cds--col-lg-4 cds--col",
	ariaLabel = "Categories",
}: CategoryTilesProps) {
	return (
		<div className={["cds--row", className].filter(Boolean).join(" ")} role="list" aria-label={ariaLabel}>
			{items.map((item, idx) => {
				const key = item.href ?? `${item.title}-${idx}`;
				const headingId = `ct-title-${idx}`;

				const Content = () => (
					<>
						{item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
						<h3 id={headingId} className="cds--productive-heading-03">{item.title}</h3>
						{item.description ? <p className="cds--body-long-01">{item.description}</p> : null}
						{Array.isArray(item.tags) && item.tags.length > 0 ? (
							<div role="group" aria-label="Item tags">
								{item.tags.map((t, i) => (
									<Tag key={i}>{t}</Tag>
								))}
							</div>
						) : null}
					</>
				);

				return (
					<div className={colClassName} role="listitem" key={key}>
						{item.href ? (
							<ClickableTile
								href={item.href}
								aria-label={item.ariaLabel ?? item.title}
								aria-labelledby={item.ariaLabel ? undefined : headingId}
								{...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
							>
								<Content />
							</ClickableTile>
						) : (
							<Tile aria-labelledby={headingId}>
								<Content />
							</Tile>
						)}
					</div>
				);
			})}
		</div>
	);
}

