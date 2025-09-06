import * as React from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type SectionTitleProps = {
  as?: HeadingTag;                 // default 'h2'
  title: React.ReactNode | string; // required
  eyebrow?: string;
  subtitle?: React.ReactNode;
  align?: 'start' | 'center';      // default 'start'
  size?: 'xl' | 'lg' | 'md';       // default 'lg'
  gradient?: boolean;
  anchor?: string;
  autoAnchor?: boolean;
  actions?: React.ReactNode;
  actionsAriaLabel?: string;
  className?: string;
  ariaDescribedBy?: string;
  testId?: string;                 // default 'section-title'
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const sizeToClass: Record<NonNullable<SectionTitleProps['size']>, string> = {
  xl: 'cds--expressive-heading-05',
  lg: 'cds--productive-heading-03',
  md: 'cds--productive-heading-02',
};

const SectionTitle = React.forwardRef<HTMLElement, SectionTitleProps>(function SectionTitle(
  {
    as = 'h2',
    title,
    eyebrow,
    subtitle,
    align = 'start',
    size = 'lg',
    gradient = false,
    anchor,
    autoAnchor = false,
    actions,
    actionsAriaLabel,
    className,
    ariaDescribedBy,
    testId = 'section-title',
  },
  ref
) {
  const Heading = as;
  const autoId = React.useId();
  const cleanedId = autoId.replace(/[^a-zA-Z0-9]/g, '');
  const shortSuffix = (cleanedId.slice(-4) || cleanedId).padStart(4, '0');
  const computedId = anchor
    || (autoAnchor && typeof title === 'string' ? `${slugify(title)}-${shortSuffix}` : undefined)
    || `${autoId}-heading`;
  const subtitleId = subtitle ? `${autoId}-subtitle` : undefined;
  const describedIds = [ariaDescribedBy, subtitleId].filter(Boolean).join(' ') || undefined;
  const sizeClass = sizeToClass[size];
  const instrumentedActions = actions
    ? React.Children.map(actions, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, { 'data-slot': 'action' })
          : child
      )
    : null;
  return (
    <header
      ref={ref}
      className={cx('uc-sectiontitle', align === 'center' && 'uc-sectiontitle--center', className)}
      aria-labelledby={computedId}
      {...(describedIds ? { 'aria-describedby': describedIds } : {})}
      data-testid={testId}
    >
      {eyebrow && (
        <span className="cds--label-01 uc-sectiontitle__eyebrow">{eyebrow}</span>
      )}
      <div
        className={cx(
          'uc-sectiontitle__row',
          actions && align !== 'center' ? 'uc-sectiontitle__row--with-actions' : undefined
        )}
      >
        <Heading id={computedId} className={cx(sizeClass, 'uc-sectiontitle__heading')}>
          {gradient ? <span className="uc-title-gradient">{title}</span> : title}
        </Heading>
        {instrumentedActions && (
          <div
            className="uc-sectiontitle__actions"
            role="group"
            {...(actionsAriaLabel ? { 'aria-label': actionsAriaLabel } : {})}
          >
            {instrumentedActions}
          </div>
        )}
      </div>
      {subtitle && (
        <p id={subtitleId} className="cds--body-long-01 uc-sectiontitle__subtitle">
          {subtitle}
        </p>
      )}
    </header>
  );
});

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;

/* Example usage:
<SectionTitle
  eyebrow="Featured"
  title="Lead in AI"
  subtitle="Build, govern and scale AI initiatives."
  size="lg"
  gradient
  autoAnchor
  actions={<button>Explore</button>}
/> */
