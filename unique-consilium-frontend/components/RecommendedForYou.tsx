"use client";
import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@carbon/icons-react';

export type RecoCard = {
  title: string;
  href: string;
  category?: string;
  description?: string;
  external?: boolean;
};

export interface RecommendedForYouProps {
  headingLevel?: 'h2' | 'h3';
  items: RecoCard[];
  className?: string;
  id?: string; // custom id for heading aria
}

export default function RecommendedForYou({ headingLevel = 'h2', items, className, id }: RecommendedForYouProps) {
  if (!items || items.length === 0) return null;
  const HeadingTag = headingLevel;
  const headingId = id || React.useId();
  return (
    <section aria-labelledby={headingId} className={['uc-reco-block', className].filter(Boolean).join(' ')}>
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
          <HeadingTag id={headingId} className="cds--productive-heading-03 uc-reco-block__heading">Recommended for you</HeadingTag>
        </div>
      </div>
      <div className="uc-reco-row" role="list">
        {items.slice(0, 4).map((card, idx) => {
          const isExternal = !!card.external && /^https?:\/\//.test(card.href);
          const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
            href: card.href,
            className: 'uc-reco-card',
            role: 'listitem',
            'aria-label': `${card.title}${card.category ? ', ' + card.category : ''}`
          };
          if (isExternal) {
            anchorProps.target = '_blank';
            anchorProps.rel = 'noopener noreferrer';
          }
          return (
            <a key={card.href + idx} {...anchorProps}>
              <div className="uc-reco-card__media" aria-hidden="true" />
              <div className="uc-reco-card__body">
                {card.category && (
                  <span className="cds--label-01 uc-reco-card__category">{card.category}</span>
                )}
                <span className="cds--productive-heading-02 uc-reco-card__title">{card.title}</span>
                {card.description && (
                  <span className="cds--body-long-01 uc-reco-card__desc">{card.description}</span>
                )}
                <span className="uc-reco-card__footer" aria-hidden="true">
                  <ArrowRight size={16} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
