import * as React from "react";

/**
 * Carbon grid helpers (server components).
 *
 * Example:
 * <MainGrid page>
 *   <MainRow>
 *     <MainCol sm={4} lg={8}>Content</MainCol>
 *     <MainCol sm={4} lg={8} offsetLg={2}>More</MainCol>
 *   </MainRow>
 * </MainGrid>
 */

type HTMLElementTag = Extract<keyof JSX.IntrinsicElements, 'div' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'nav' | 'article'>;

export type MainGridProps = {
	as?: HTMLElementTag;
	id?: string;
	role?: string;
	ariaLabel?: string;
	ariaLabelledby?: string;
	className?: string;
	page?: boolean;
	children: React.ReactNode;
};

export function MainGrid({
	as: Comp = 'div',
	id,
	role,
	ariaLabel,
	ariaLabelledby,
	className,
	page,
	children,
	...rest
}: MainGridProps & Omit<React.HTMLAttributes<HTMLElement>, keyof MainGridProps>) {
	const cls = ["cds--grid", page ? "uc-page" : undefined, className].filter(Boolean).join(" ");
	return (
		<Comp id={id} role={role} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} className={cls} {...rest}>
			{children}
		</Comp>
	);
}

export type MainRowProps = {
	as?: HTMLElementTag;
	id?: string;
	role?: string;
	ariaLabel?: string;
	ariaLabelledby?: string;
	className?: string;
	children: React.ReactNode;
};

export function MainRow({
	as: Comp = 'div',
	id,
	role,
	ariaLabel,
	ariaLabelledby,
	className,
	children,
	...rest
}: MainRowProps & Omit<React.HTMLAttributes<HTMLElement>, keyof MainRowProps>) {
	const cls = ["cds--row", className].filter(Boolean).join(" ");
	return (
		<Comp id={id} role={role} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} className={cls} {...rest}>
			{children}
		</Comp>
	);
}

export type BreakpointSpan = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16;

export type MainColProps = {
	as?: HTMLElementTag;
	id?: string;
	role?: string;
	ariaLabel?: string;
	ariaLabelledby?: string;
	className?: string;
	// spans
	sm?: BreakpointSpan;
	md?: BreakpointSpan;
	lg?: BreakpointSpan;
	xlg?: BreakpointSpan;
	max?: BreakpointSpan;
	// offsets
	offsetSm?: BreakpointSpan;
	offsetMd?: BreakpointSpan;
	offsetLg?: BreakpointSpan;
	offsetXlg?: BreakpointSpan;
	offsetMax?: BreakpointSpan;
	fluid?: boolean; // if true (default) adds base col when no spans
	children: React.ReactNode;
};

export function MainCol({
	as: Comp = 'div',
	id,
	role,
	ariaLabel,
	ariaLabelledby,
	className,
	sm, md, lg, xlg, max,
	offsetSm, offsetMd, offsetLg, offsetXlg, offsetMax,
	fluid = true,
	children,
	...rest
}: MainColProps & Omit<React.HTMLAttributes<HTMLElement>, keyof MainColProps>) {
	if (process.env.NODE_ENV !== 'production') {
		// Development-only range validation (spans 1-16, offsets 1-15)
		const warn = (val: number | undefined, name: string, max: number) => {
			if (val !== undefined && (val < 1 || val > max)) {
				// eslint-disable-next-line no-console
				console.warn(`[MainCol] ${name} value ${val} out of range (1-${max}).`);
			}
		};
		warn(sm, 'sm', 16); warn(md, 'md', 16); warn(lg, 'lg', 16); warn(xlg, 'xlg', 16); warn(max, 'max', 16);
		warn(offsetSm, 'offsetSm', 15); warn(offsetMd, 'offsetMd', 15); warn(offsetLg, 'offsetLg', 15); warn(offsetXlg, 'offsetXlg', 15); warn(offsetMax, 'offsetMax', 15);
	}
	const classes: string[] = [];
	if (sm) classes.push(`cds--col-sm-${sm}`);
	if (md) classes.push(`cds--col-md-${md}`);
	if (lg) classes.push(`cds--col-lg-${lg}`);
	if (xlg) classes.push(`cds--col-xlg-${xlg}`);
	if (max) classes.push(`cds--col-max-${max}`);

	if (offsetSm) classes.push(`cds--offset-sm-${offsetSm}`);
	if (offsetMd) classes.push(`cds--offset-md-${offsetMd}`);
	if (offsetLg) classes.push(`cds--offset-lg-${offsetLg}`);
	if (offsetXlg) classes.push(`cds--offset-xlg-${offsetXlg}`);
	if (offsetMax) classes.push(`cds--offset-max-${offsetMax}`);

	const hasSpan = sm || md || lg || xlg || max;
	if (!hasSpan && fluid) {
		classes.push('cds--col');
	}
	if (className) classes.push(className);

	const cls = classes.join(' ');
	return (
		<Comp id={id} role={role} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} className={cls} {...rest}>
			{children}
		</Comp>
	);
}

export default MainGrid;

// Named exports already provided above via function declarations; duplicate export list removed to avoid TS redeclare warnings.
