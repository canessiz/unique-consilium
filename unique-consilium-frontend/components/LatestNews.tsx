"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@carbon/icons-react';

const items = [
	{ href: '/news/market-outlook', title: 'Quarterly market outlook released' },
	{ href: '/news/ai-trade-automation', title: 'AI trade automation pilot expands' },
	{ href: '/news/supply-chain-brief', title: 'Supply chain risk brief (PDF)' },
	{ href: '/news/events', title: 'Upcoming events & webinars' },
];

export default function LatestNews() {
	return (
		<nav aria-label="Latest news feed">
			<div className="uc-latest__cards" role="list">
				{items.slice(0, 4).map(item => (
					<Link key={item.href} href={item.href} role="listitem" className="uc-latest-card">
						<span className="uc-latest-card__text">{item.title}</span>
						<ArrowRight size={16} aria-hidden="true" />
					</Link>
				))}
				<div className="uc-latest__more">
					<Link href="/news" className="uc-latest__all">All news <ArrowRight size={16} aria-hidden="true" /></Link>
				</div>
			</div>
		</nav>
	);
}
