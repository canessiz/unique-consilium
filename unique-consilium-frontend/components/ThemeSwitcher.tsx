'use client';

import { HeaderGlobalAction } from '@carbon/react';
import { Sun, Moon } from '@carbon/icons-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/settingsslice';
import useIsMounted from '@/hooks/useIsMounted';

export default function ThemeSwitcher() {
	const theme = useAppSelector((s) => s.settings.theme);
	const dispatch = useAppDispatch();
	const mounted = useIsMounted();
	if (!mounted) return null; // Avoid any SSR markup & pre-hydration diffs
	const isDark = theme === 'g100';
	const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
	return (
		<HeaderGlobalAction
			aria-label={label}
			aria-pressed={isDark}
			onClick={() => dispatch(toggleTheme())}
			/* tooltip props omitted intentionally */
		>
			{isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
		</HeaderGlobalAction>
	);
}
