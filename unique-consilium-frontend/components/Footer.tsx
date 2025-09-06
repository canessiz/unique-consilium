"use client";

import Link from 'next/link';
import { useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { FC, ReactElement, MouseEvent } from 'react';

// UNIQUE CONSILIUM striped logo (inline SVG, currentColor-based)
const UniqueConsiliumStripedLogo: FC = (): ReactElement => (
    <svg viewBox="0 0 120 32" className="uc-footer__logo-svg" aria-hidden="true" focusable="false">
        {/* U */}
        <rect x="0" y="4" width="4" height="20" fill="currentColor" />
        <rect x="12" y="4" width="4" height="20" fill="currentColor" />
        <rect x="4" y="24" width="8" height="4" fill="currentColor" />
        {/* N */}
        <rect x="20" y="4" width="4" height="24" fill="currentColor" />
        <rect x="32" y="4" width="4" height="24" fill="currentColor" />
        <rect x="24" y="8" width="4" height="4" transform="rotate(45 24 8)" fill="currentColor" />
        <rect x="26" y="12" width="4" height="4" transform="rotate(45 26 12)" fill="currentColor" />
        <rect x="28" y="16" width="4" height="4" transform="rotate(45 28 16)" fill="currentColor" />
        {/* I */}
        <rect x="44" y="4" width="12" height="4" fill="currentColor" />
        <rect x="48" y="8" width="4" height="16" fill="currentColor" />
        <rect x="44" y="24" width="12" height="4" fill="currentColor" />
        {/* Q (stylized O + tail) */}
        <rect x="60" y="8" width="16" height="4" fill="currentColor" />
        <rect x="60" y="8" width="4" height="16" fill="currentColor" />
        <rect x="72" y="8" width="4" height="16" fill="currentColor" />
        <rect x="60" y="20" width="16" height="4" fill="currentColor" />
        <rect x="72" y="22" width="8" height="4" transform="rotate(45 72 22)" fill="currentColor" />
        {/* U */}
        <rect x="84" y="4" width="4" height="20" fill="currentColor" />
        <rect x="96" y="4" width="4" height="20" fill="currentColor" />
        <rect x="88" y="24" width="8" height="4" fill="currentColor" />
        {/* E */}
        <rect x="104" y="4" width="4" height="24" fill="currentColor" />
        <rect x="108" y="4" width="12" height="4" fill="currentColor" />
        <rect x="108" y="14" width="10" height="4" fill="currentColor" />
        <rect x="108" y="24" width="12" height="4" fill="currentColor" />
    </svg>
);

// Cookie preferences button
const CookiePreferencesButton: FC = () => {
    const [pending, setPending] = useState<boolean>(false);
    const handleCookieReset = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (pending) return;
        setPending(true);
        try { localStorage.removeItem('uc-cookie-consent'); } catch { /* ignore */ }
        setTimeout(() => { window.location.reload(); }, 40);
    }, [pending]);
    return (
        <button
            type="button"
            className="uc-footer__link-btn"
            aria-busy={pending}
            aria-label="Manage cookie preferences"
            onClick={handleCookieReset}
        >
            Cookie Preferences
        </button>
    );
};

interface FooterLink { href: string; label: string; external?: boolean }
interface FooterSection { id: string; title: string; links: FooterLink[] }

const footerSections: FooterSection[] = [
    {
        id: 'services',
        title: 'Services',
        links: [
            { href: '/foreign-trade-consulting', label: 'Foreign Trade Consulting' },
            { href: '/import-export-services', label: 'Import & Export Services' },
            { href: '/international-business', label: 'International Business' },
            { href: '/market-research', label: 'Market Research' },
            { href: '/trade-documentation', label: 'Trade Documentation' },
            { href: '/logistics-support', label: 'Logistics Support' },
        ],
    },
    {
        id: 'connect',
        title: 'Connect',
        links: [
            { href: '/business-partners', label: 'Business partners' },
            { href: '/documentation', label: 'Documentation' },
            { href: '/events', label: 'Events' },
            { href: '/download-center', label: 'Download center' },
            { href: '/support', label: 'Support' },
            { href: '/client-community', label: 'Client community' },
        ],
    },
    {
        id: 'follow',
        title: 'Follow',
        links: [
            { href: 'https://www.linkedin.com', label: 'LinkedIn', external: true },
            { href: 'https://x.com', label: 'X', external: true },
            { href: 'https://www.instagram.com', label: 'Instagram', external: true },
            { href: 'https://www.youtube.com', label: 'YouTube', external: true },
            { href: '/newsletter', label: 'Newsletter' },
        ],
    },
    {
        id: 'about',
        title: 'About',
        links: [
            { href: '/overview', label: 'Overview' },
            { href: '/team', label: 'Team' },
            { href: '/references', label: 'References' },
            { href: '/careers', label: 'Careers' },
            { href: '/news', label: 'News & Updates' },
            { href: '/contact', label: 'Contact Us' },
        ],
    },
];

const legalLinks: FooterLink[] = [
    { href: '/contact', label: 'Contact' },
    { href: '/terms#privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms of use' },
    { href: '/accessibility', label: 'Accessibility' },
];

const Footer: FC = (): ReactElement => {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();
    // HYDRATION GUARD: aria-current sadece client'ta set edilsin
    const [hydrated, setHydrated] = useState(false);
    const footerRef = useRef<HTMLElement | null>(null);
    useEffect(() => setHydrated(true), []);
    // SELF-HEAL: İstemciye özgü beklenmeyen <div class="cds--g100 cds--layer-one"> sarmalayıcısı oluşursa kaldır.
    useEffect(() => {
        if (!hydrated) return;
        const footerEl = footerRef.current;
        if (!footerEl) return;
        const parent = footerEl.parentElement;
        if (parent && parent.tagName === 'DIV' && parent.classList.contains('cds--g100') && parent.classList.contains('cds--layer-one')) {
            // Eğer parent zaten body değil ve sadece bu footer'ı içeriyorsa unwrap et.
            const onlyChild = parent.children.length === 1 && parent.firstElementChild === footerEl;
            if (onlyChild && parent.parentElement) {
                parent.parentElement.insertBefore(footerEl, parent);
                parent.remove();
                // Sınıflar footer üzerinde zaten var; sadece bilgi amaçlı log.
                // eslint-disable-next-line no-console
                console.log('[footer-self-heal] Removed stray Theme wrapper div.');
            }
        }
    }, [hydrated]);

    return (
        <footer
            className="uc-footer cds--g100 cds--layer-one"
            data-footer-build="v4"
            role="contentinfo"
            aria-label="Footer"
            ref={footerRef as any}
        >
            <div className="cds--grid cds--grid--narrow">
                {/* Row 1: Brand */}
                <div className="cds--row uc-footer__brand-row">
                    <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16 uc-footer__brand">
                        <Link
                            href="/"
                            aria-label="UNIQUE CONSILIUM - Go to homepage"
                            aria-current={hydrated && pathname === '/' ? 'page' : undefined}
                            className="uc-footer__logo-link"
                        >
                            <UniqueConsiliumStripedLogo />
                        </Link>
                    </div>
                </div>

                {/* Row 2: Navigation — 4 eşit kolon */}
                <div className="cds--row uc-footer__nav-row">
                    {footerSections.map((section) => (
                        <div key={section.id} className="cds--col-sm-4 cds--col-md-2 cds--col-lg-4 uc-footer__col">
                            <nav aria-labelledby={`footer-${section.id}`}>
                                <h3 id={`footer-${section.id}`} className="uc-footer__heading">{section.title}</h3>
                                <ul className="uc-footer__list" role="list">
                                    {section.links.map((link) => (
                                        <li key={link.href} className="uc-footer__item">
                                            {link.external ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="uc-footer__link"
                                                    aria-label={`${link.label} (opens in new tab)`}
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="uc-footer__link"
                                                    aria-current={hydrated && pathname === link.href ? 'page' : undefined}
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Row 3: Legal */}
                <div className="cds--row uc-footer__bottom" role="navigation" aria-label="Legal and preferences">
                    <div className="cds--col-sm-4 cds--col-md-6 cds--col-lg-12 uc-footer__legal-left">
                        <ul className="uc-footer__legal-links" role="list" aria-label="Legal links">
                            {legalLinks.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="uc-footer__link"
                                        aria-current={hydrated && pathname === l.href ? 'page' : undefined}
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="cds--col-sm-4 cds--col-md-2 cds--col-lg-4 uc-footer__legal-right">
                        <CookiePreferencesButton />
                    </div>
                </div>

                {/* Row 4: Copyright */}
                <div className="cds--row uc-footer__copyright-row">
                    <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
                        <p className="uc-footer__copyright">
                            © <time dateTime={String(currentYear)} suppressHydrationWarning>{currentYear}</time> Unique Consilium — All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
