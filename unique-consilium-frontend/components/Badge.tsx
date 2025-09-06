import * as React from 'react';

// Simple Badge component (previous file caused self-referential circular export)
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	kind?: 'gray' | 'purple' | 'blue' | 'green' | 'red';
}

const kindClass: Record<NonNullable<BadgeProps['kind']>, string> = {
	gray: 'uc-badge--gray',
	purple: 'uc-badge--purple',
	blue: 'uc-badge--blue',
	green: 'uc-badge--green',
	red: 'uc-badge--red',
};

export default function Badge({ kind = 'gray', className, children, ...rest }: BadgeProps) {
	const cls = ['uc-badge', kindClass[kind], className].filter(Boolean).join(' ');
	return (
		<span className={cls} {...rest}>
			{children}
		</span>
	);
}

// Optional named export
export { Badge };
