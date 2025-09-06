"use client";

import * as React from "react";
import Link from "next/link";
import { Tile, Toggle, Button, Tag } from "@carbon/react";

export type DevLink = { label: string; href: string; external?: boolean };
export type DeveloperToolkitProps = {
	forceVisible?: boolean;
	className?: string;
	links?: DevLink[];
	storageKeys?: string[];
};

const DEFAULT_LINKS: DevLink[] = [
	{ label: "Carbon React Docs", href: "https://carbondesignsystem.com/developing/react/", external: true },
	{ label: "Next.js Docs", href: "https://nextjs.org/docs", external: true },
	{ label: "Redux Toolkit", href: "https://redux-toolkit.js.org/", external: true },
	{ label: "React Testing Library", href: "https://testing-library.com/docs/react-testing-library/intro/", external: true },
];

const DEFAULT_STORAGE_KEYS = ["uc-cookie-consent"];

export default function DeveloperToolkit({
	forceVisible = false,
	className,
	links = DEFAULT_LINKS,
	storageKeys = DEFAULT_STORAGE_KEYS,
}: DeveloperToolkitProps) {
	const isDev = process.env.NODE_ENV !== "production";
	if (!isDev && !forceVisible) return null;

	const [gridOn, setGridOn] = React.useState(false);
	const [cleared, setCleared] = React.useState(false);

	const clearStorage = () => {
		try {
			storageKeys.forEach((k) => localStorage.removeItem(k));
			setCleared(true);
			setTimeout(() => setCleared(false), 1500);
		} catch {
			// ignore
		}
	};

	return (
		<>
			{/* Dev grid overlay (debug only) */}
			{gridOn && (
				<div
					aria-hidden="true"
					style={{
						position: "fixed",
						inset: 0,
						pointerEvents: "none",
						zIndex: 6000,
						backgroundImage:
							"linear-gradient(to right, rgba(15,98,254,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,98,254,.08) 1px, transparent 1px)",
						backgroundSize: "8px 100%, 100% 8px",
					}}
				/>
			)}

			<section
				className={["cds--row", className].filter(Boolean).join(" ")}
				role="region"
				aria-label="Developer toolkit"
			>
				<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
					<Tile>
						<div className="cds--row">
							<div className="cds--col">
								<h2 className="cds--productive-heading-03">Developer Toolkit</h2>
								<div role="group" aria-label="Environment">
									<Tag type={isDev ? "green" : "gray"}>{isDev ? "DEV" : "PROD"}</Tag>
									{forceVisible ? <Tag type="cyan">forceVisible</Tag> : null}
								</div>
							</div>
						</div>

						<div className="cds--row uc-stack-06" role="group" aria-label="Tools">
							<div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-4">
								<Toggle
									id="uc-grid-overlay"
									size="sm"
									labelText="Grid overlay"
									toggled={gridOn}
									onToggle={() => setGridOn((v) => !v)}
								/>
							</div>

							<div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-4">
								<Button kind="tertiary" size="sm" onClick={clearStorage}>
									Clear localStorage
								</Button>
							</div>

							{cleared ? (
								<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8" role="status" aria-live="polite">
									<span className="cds--label-01">Storage cleared</span>
								</div>
							) : null}
						</div>

						<div className="cds--row uc-stack-06" role="list" aria-label="Documentation links">
							{links.map((l, i) => (
								<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-4" role="listitem" key={`${l.href}-${i}`}>
									{l.external ? (
										<a href={l.href} target="_blank" rel="noopener noreferrer" className="cds--link">
											{l.label}
										</a>
									) : (
										<Link className="cds--link" href={l.href}>
											{l.label}
										</Link>
									)}
								</div>
							))}
						</div>
					</Tile>
				</div>
			</section>
		</>
	);
}
