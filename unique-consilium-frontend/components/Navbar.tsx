'use client';

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import { Search, Chat, Globe, User, ArrowRight, ChevronDown } from '@carbon/icons-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

function useHeaderBottomVar() {
  useEffect(() => {
    const headerEl = document.querySelector('.cds--header') as HTMLElement | null;
    if (!headerEl) return;
    const setH = () => {
      // Use the actual bottom position to be robust if header offset ever changes
      document.documentElement.style.setProperty('--uc-header-bottom', headerEl.getBoundingClientRect().bottom + 'px');
    };
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(headerEl);
    window.addEventListener('scroll', setH, { passive: true });
    window.addEventListener('orientationchange', setH);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', setH);
      window.removeEventListener('orientationchange', setH);
    };
  }, []);
}

export default function Navbar(): JSX.Element {
  const router = useRouter();
  useHeaderBottomVar();

  // Mega menu state (only one open at a time)
  const [openMega, setOpenMega] = useState<null | 'principles' | 'services'>(null);
  // (Columns variant no longer needs per-category active state)
  const megaRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // portal target
  const portalEl = typeof document !== 'undefined' ? document.getElementById('megamenu-root') : null;

  const closeMega = useCallback(() => {
    if (openMega) {
      const key = openMega;
      setOpenMega(null);
      // return focus
      const btn = triggerRefs.current[key];
      btn?.focus();
    }
  }, [openMega]);

  // Toggle body class to lock scroll when open
  useEffect(() => {
    const body = document.body;
    if (openMega) body.classList.add('uc-mega-open');
    else body.classList.remove('uc-mega-open');
  }, [openMega]);

  // Outside click / escape handling
  useEffect(() => {
    if (!openMega) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeMega();
      }
      if (e.key === 'Tab') {
        // focus trap minimal: if focus leaves panel + triggers, close
        requestAnimationFrame(() => {
          if (!megaRef.current) return;
          const active = document.activeElement as HTMLElement | null;
          if (active && megaRef.current.contains(active)) return;
          // allow staying on triggers
          const anyTrigger = Object.values(triggerRefs.current).some(t => t === active);
          if (!anyTrigger) closeMega();
        });
      }
    }
    function onClick(e: MouseEvent) {
      if (!megaRef.current) return;
      if (megaRef.current.contains(e.target as Node)) return;
      const anyTrigger = Object.values(triggerRefs.current).some(t => t && t.contains(e.target as Node));
      if (!anyTrigger) closeMega();
    }
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('mousedown', onClick, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('mousedown', onClick, true);
    };
  }, [openMega, closeMega]);


  // Flat category lists (single items per grid cell – IBM parity)
  const principleCategories = ['Perfectionism','Professionalism','Innovation','Reliability','Integrity','Sustainability'];
  const serviceCategories = ['Advisory','Implementation','Integration','Managed Services','Support','Training'];
  const list = openMega === 'principles' ? principleCategories : serviceCategories;
  const isCompact = list.length <= 6; // 3x2 grid when 6 or fewer items
  return (
    <Header aria-label="Unique Consilium">
      <HeaderName href="/" prefix="">
        Unique Consilium
      </HeaderName>

      <HeaderNavigation aria-label="Primary navigation">
        {/* Order & labels per spec (routes unchanged where possible) */}
  <li className="cds--header__nav-item uc-nav-trigger-item" role="none">
          <button
            type="button"
            ref={(el) => { triggerRefs.current['principles'] = el; }}
            className={openMega === 'principles' ? 'uc-nav-trigger is-active' : 'uc-nav-trigger'}
            aria-haspopup="true"
            aria-expanded={openMega === 'principles'}
            aria-controls="uc-mega-panel"
            onClick={(e) => {
              e.preventDefault();
              setOpenMega(openMega === 'principles' ? null : 'principles');
            }}
          >
            <span className="uc-nav-trigger__label">Principles</span>
            <span className="uc-nav-trigger__icon" aria-hidden="true"><ChevronDown size={16} /></span>
          </button>
        </li>
  <li className="cds--header__nav-item uc-nav-trigger-item" role="none">
          <button
            type="button"
            ref={(el) => { triggerRefs.current['services'] = el; }}
            className={openMega === 'services' ? 'uc-nav-trigger is-active' : 'uc-nav-trigger'}
            aria-haspopup="true"
            aria-expanded={openMega === 'services'}
            aria-controls="uc-mega-panel"
            onClick={(e) => {
              e.preventDefault();
              setOpenMega(openMega === 'services' ? null : 'services');
            }}
          >
            <span className="uc-nav-trigger__label">Services</span>
            <span className="uc-nav-trigger__icon" aria-hidden="true"><ChevronDown size={16} /></span>
          </button>
        </li>
        <HeaderMenuItem href="/team">Team</HeaderMenuItem>
        <HeaderMenuItem href="/references">References</HeaderMenuItem>
        <HeaderMenuItem href="/faq">FAQ</HeaderMenuItem>
        <HeaderMenuItem href="/terms">Terms</HeaderMenuItem>
        <HeaderMenu menuLinkName="Downloads" aria-label="Downloads" className="uc-header-menu--compact">
          <HeaderMenuItem href="/manufacturer-login">All downloads</HeaderMenuItem>
        </HeaderMenu>
        <HeaderMenu menuLinkName="Login" aria-label="Login" className="uc-header-menu--compact">
          <HeaderMenuItem href="/customer-login">Customer</HeaderMenuItem>
          <HeaderMenuItem href="/manufacturer-login">Manufacturer</HeaderMenuItem>
          <HeaderMenuItem href="/field-sales-representative-login">Field Sales Rep</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>

      <HeaderGlobalBar className="uc-header-actions" aria-label="Global actions" aria-live="polite">
        {/* IBM-style four distinct global actions: Search, Chat/Support, Language, Account */}
        <HeaderGlobalAction
          aria-label="Search"
          data-uc-action="search"
          tooltipAlignment="end"
          onClick={() => console.log('search open')}
        >
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Chat support"
          data-uc-action="chat"
          tooltipAlignment="end"
          onClick={() => console.log('chat open')}
        >
          <Chat size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Change language"
          data-uc-action="language"
          aria-haspopup="menu"
          aria-expanded="false"
          tooltipAlignment="end"
          onClick={() => console.log('language select')}
        >
          <Globe size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Account"
          data-uc-action="account"
          aria-haspopup="menu"
          aria-expanded="false"
          tooltipAlignment="end"
          onClick={() => router.push('/customer-login')}
        >
          <User size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      {openMega && (
        <>
          {portalEl && createPortal(
            <div className="uc-mega-overlay" role="presentation" aria-hidden="true" onMouseDown={closeMega} />,
            portalEl
          )}
          <div
            ref={megaRef}
            id="uc-mega-panel"
            className={"uc-mega uc-mega--rail"}
            role="dialog"
            aria-modal="true"
            aria-label={openMega === 'principles' ? 'Principles menu' : 'Services menu'}
          >
            <div className="cds--grid">
              <div className="cds--row uc-mega__row">
                {/* Left side rail (visual navigation aid). Marked aria-hidden to avoid duplicate announcements. */}
                <div className="uc-mega__rail" aria-hidden="true">
                  <ul className="uc-mega-rail" role="presentation">
                    {list.map((item) => (
                      <li key={"rail-" + item}>
                        <button type="button" className="uc-mega-rail__btn" tabIndex={-1}>
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right content: actual interactive links (unchanged content + order) */}
                <div className="uc-mega__content cds--col-sm-4 cds--col-md-8 cds--col-lg-12" role="region" aria-label={openMega === 'principles' ? 'Principles links' : 'Services links'}>
                  <ul className={"uc-mega-columns uc-mega-columns--flat" + (isCompact ? ' uc-mega-columns--compact3' : '')} role="list">
                    {list.map((item) => (
                      <li key={item} className="uc-mega-columns__item">
                        <a href="#" className="uc-mega__col-link" onClick={closeMega}>
                          {item} <ArrowRight aria-hidden="true" size={14} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Header>
  );
}
