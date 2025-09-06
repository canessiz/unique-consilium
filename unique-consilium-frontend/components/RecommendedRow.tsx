"use client";

import * as React from 'react';
import { ClickableTile, Tag, Button } from '@carbon/react';
import Link from 'next/link';

export type RecommendedItem = {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  tags?: string[];
  icon?: React.ReactElement;
  ariaLabel?: string; // explicit label for the tile
};

export type RecommendedRowProps = {
  title?: string;
  description?: string;
  items: RecommendedItem[];
  className?: string;
  ariaLabel?: string; // region label (fallbacks to title)
  headingLevel?: 'h2' | 'h3';
  showAllHref?: string;
  onItemClick?: (item: RecommendedItem, index: number) => void;
  onScrollChange?: (state: { canLeft: boolean; canRight: boolean; activeIndex: number }) => void;
};

// Utility: join classes
function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

export default function RecommendedRow({
  title,
  description,
  items,
  className,
  ariaLabel,
  headingLevel = 'h2',
  showAllHref,
  onItemClick,
  onScrollChange,
}: RecommendedRowProps) {
  const railRef = React.useRef<HTMLDivElement | null>(null);
  const firstItemRef = React.useRef<HTMLDivElement | null>(null);
  // Alias to allow target/rel without ts-expect-error
  const TileLink = React.useMemo(() => (
    ClickableTile as unknown as React.FC<React.ComponentProps<typeof ClickableTile> & React.AnchorHTMLAttributes<HTMLAnchorElement>>
  ), []);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rafPendingRef = React.useRef(false);
  const prevScrollStateRef = React.useRef<{canLeft:boolean;canRight:boolean;activeIndex:number}>({canLeft:false,canRight:false,activeIndex:0});
  const idBase = React.useId();
  const headingId = title ? `${idBase}-heading` : undefined;
  const railId = `${idBase}-rail`;
  const hintId = `${idBase}-hint`;

  // Early empty state
  if (!items || items.length === 0) {
    return (
      <section
        role="region"
        aria-label={ariaLabel || title || 'Recommendations'}
        className={cx('uc-reco', className)}
      >
        {title && React.createElement(headingLevel, { className: 'cds--productive-heading-03' }, title)}
        <p className="cds--label-01" style={{ marginBlockStart: '0.25rem' }}>Nothing to recommend.</p>
      </section>
    );
  }

  const updateScrollState = React.useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const railRect = el.getBoundingClientRect();
    const children = Array.from(el.children) as HTMLElement[];
    const firstRect = children[0]?.getBoundingClientRect();
    const lastRect = children[children.length - 1]?.getBoundingClientRect();
    const newCanLeft = !!firstRect && firstRect.left < railRect.left - 1;
    const newCanRight = !!lastRect && lastRect.right > railRect.right + 1;

    // Active index: nearest fully visible tile (unchanged logic)
    let newActive = 0;
    for (let i = 0; i < children.length; i++) {
      const r = children[i].getBoundingClientRect();
      if (r.left >= railRect.left - 1 && r.right <= railRect.right + 1) {
        newActive = i;
        break;
      }
    }
    setCanScrollLeft(newCanLeft);
    setCanScrollRight(newCanRight);
    setActiveIndex(prev => (prev === newActive ? prev : newActive));

    const prevState = prevScrollStateRef.current;
    if (prevState.canLeft !== newCanLeft || prevState.canRight !== newCanRight || prevState.activeIndex !== newActive) {
      prevScrollStateRef.current = { canLeft: newCanLeft, canRight: newCanRight, activeIndex: newActive };
      onScrollChange?.({ canLeft: newCanLeft, canRight: newCanRight, activeIndex: newActive });
    }
  }, [onScrollChange]);

  React.useEffect(() => {
    updateScrollState();
    const el = railRef.current;
    if (!el) return;
    const schedule = () => {
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        updateScrollState();
      });
    };
    const onScroll = () => schedule();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => schedule();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateScrollState, items.length]);

  const scrollByCard = (dir: -1 | 1, multiplier = 1) => {
    const rail = railRef.current;
    if (!rail) return;
    let delta = 320; // fallback card width
    const first = firstItemRef.current;
    if (first) {
      const rect = first.getBoundingClientRect();
      const cs = getComputedStyle(rail);
      // Attempt to use CSS custom properties first
      const gapVarRaw = cs.getPropertyValue('--reco-gap').trim();
      const tileMinRaw = cs.getPropertyValue('--reco-tile-min').trim();
      const gapVar = parseFloat(gapVarRaw); // px values parse fine
      const tileMinVar = parseFloat(tileMinRaw);
      if (!isNaN(gapVar) && !isNaN(tileMinVar)) {
        delta = tileMinVar + gapVar;
      } else {
        const gapPx = parseFloat(cs.gap || '16');
        delta = rect.width + (isNaN(gapPx) ? 16 : gapPx); // include gap
      }
    }
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const rtl = typeof document !== 'undefined' && document.dir === 'rtl';
    rail.scrollBy({ left: (rtl ? -dir : dir) * delta * multiplier, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const onKey = (e: React.KeyboardEvent) => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
    else if (e.key === 'Home') {
      e.preventDefault();
      railRef.current?.scrollTo({ left: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
    else if (e.key === 'End') {
      e.preventDefault();
      const rail = railRef.current; if (rail) rail.scrollTo({ left: rail.scrollWidth, behavior: prefersReduced ? 'auto' : 'smooth' });
    } else if (e.key === 'PageDown') { e.preventDefault(); scrollByCard(1, 3); }
    else if (e.key === 'PageUp') { e.preventDefault(); scrollByCard(-1, 3); }
  };

  const HeadingTag = headingLevel;
  const regionLabel = ariaLabel || (headingId ? undefined : 'Recommendations');
  const regionProps = headingId ? { 'aria-labelledby': headingId } : { 'aria-label': regionLabel };

  return (
    <section
      role="region"
      {...regionProps}
      className={cx('uc-reco', className)}
    >
      {title && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', justifyContent: showAllHref ? 'space-between' : undefined }}>
          <div style={{ flex: '1 1 auto' }}>
            <HeadingTag id={headingId} className="cds--productive-heading-03" style={{ margin: 0 }}>
              {title}
            </HeadingTag>
            {description && (
              <p className="cds--body-long-01" style={{ marginBlockStart: '0.25rem', marginBlockEnd: 0 }}>{description}</p>
            )}
          </div>
          {showAllHref && (() => {
            const isInternal = (h?: string) => !!h && h.startsWith('/');
            return isInternal(showAllHref) ? (
              <Link href={showAllHref} className="cds--link" aria-label="View all recommendations">
                View all
              </Link>
            ) : (
              <a href={showAllHref} className="cds--link" target="_blank" rel="noopener noreferrer" aria-label="View all recommendations">
                View all
              </a>
            );
          })()}
        </div>
      )}
      <div style={{ position: 'relative', marginBlockStart: title ? '1rem' : 0 }}>
        {(canScrollLeft || canScrollRight) && (
          <div>
            <Button
              kind="ghost"
              size="sm"
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              aria-controls={railId}
              onClick={() => scrollByCard(-1)}
              style={{ position: 'absolute', insetBlockStart: '50%', insetInlineStart: 0, transform: 'translate(-50%, -50%)', zIndex: 3 }}
            >
              Prev
            </Button>
            <Button
              kind="ghost"
              size="sm"
              disabled={!canScrollRight}
              aria-label="Scroll right"
              aria-controls={railId}
              onClick={() => scrollByCard(1)}
              style={{ position: 'absolute', insetBlockStart: '50%', insetInlineEnd: 0, transform: 'translate(50%, -50%)', zIndex: 3 }}
            >
              Next
            </Button>
          </div>
        )}
        {/* Edge fades */}
        {canScrollLeft && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', insetBlock: 0, insetInlineStart: 0, width: '3rem', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to right, var(--cds-layer, #fff) 30%, rgba(255,255,255,0))'
            }}
          />
        )}
        {canScrollRight && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', insetBlock: 0, insetInlineEnd: 0, width: '3rem', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to left, var(--cds-layer, #fff) 30%, rgba(255,255,255,0))'
            }}
          />
        )}
        {/* Rail */}
        <div
          id={railId}
          ref={railRef}
          role="list"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-describedby={hintId}
          onKeyDown={onKey}
          className="uc-reco__rail"
          style={{
            display: 'flex',
            gap: 'var(--reco-gap, 1rem)',
            overflowX: 'auto',
            paddingBlockEnd: '0.5rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            ['--reco-tile-min' as any]: '280px',
            ['--reco-gap' as any]: '1rem'
          }}
        >
          {items.map((it, idx) => {
            const isExternal = !!it.external && /^https?:\/\//.test(it.href);
            const computedAriaLabel = it.ariaLabel || `${it.title}, item ${idx + 1} of ${items.length}`;
            const content = (
              <TileLink
                href={it.href}
                className={cx('uc-reco__tile')}
                aria-label={computedAriaLabel}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => onItemClick?.(it, idx)}
                style={{
                  minWidth: 'var(--reco-tile-min, 280px)',
                  flex: '0 0 auto',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}
              >
                {it.icon && <span aria-hidden="true" style={{ lineHeight: 0 }}>{it.icon}</span>}
                <span className="cds--productive-heading-03" style={{ fontSize: '1rem' }}>{it.title}</span>
                {it.description && <span className="cds--body-long-01" style={{ fontSize: '0.875rem' }}>{it.description}</span>}
                {it.tags && it.tags.length > 0 && (
                  <div role="group" aria-label="Item tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {it.tags.map(tag => <Tag key={tag} size="sm" type="gray">{tag}</Tag>)}
                  </div>
                )}
              </TileLink>
            );
            return (
              <div
                key={it.href + it.title + idx}
                role="listitem"
                ref={idx === 0 ? firstItemRef : undefined}
                style={{ flex: '0 0 auto' }}
                aria-current={idx === activeIndex ? 'true' : undefined}
                data-active={idx === activeIndex ? 'true' : undefined}
                aria-setsize={items.length}
                aria-posinset={idx + 1}
              >
                {content}
              </div>
            );
          })}
        </div>
  <p id={hintId} className="sr-only">
          Use Arrow Left/Right keys to scroll recommendation items.
        </p>
        <p className="sr-only" role="status" aria-live="polite">
          {`Active item ${activeIndex + 1} of ${items.length}: ${items[activeIndex]?.title}`}
        </p>
      </div>
    </section>
  );
}

// Example usage:
// <RecommendedRow
//   title="Recommended for you"
//   description="Quick links to get you started."
//   items={[
//     { title: 'Services', href: '/services', tags: ['Strategy'] },
//     { title: 'References', href: '/references', tags: ['Cases'] },
//     { title: 'Downloads', href: '/downloads', tags: ['PDFs'] },
//     { title: 'Innovation', href: '/consilium-principles/innovation', tags: ['Principle'] },
//   ]}
//   showAllHref="/references"
// />
