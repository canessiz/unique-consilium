"use client";

import React, { useEffect, useRef } from 'react';
import { AspectRatio, Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import LatestNews from '@/components/LatestNews';
import RecommendedForYou from '@/components/RecommendedForYou';
import DeveloperSection from '@/components/DeveloperSection';
import CapabilitySection from '@/components/CapabilitySection';

export default function Page() {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	// Respect prefers-reduced-motion by pausing autoplay loop
	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		function apply() {
			if (mq.matches && videoRef.current) {
				videoRef.current.pause();
				videoRef.current.removeAttribute('autoplay');
			}
		}
		apply();
		mq.addEventListener('change', apply);
		return () => mq.removeEventListener('change', apply);
	}, []);

	return (
		<main id="main-content" className="cds--grid uc-main-offset">
			<div className="cds--row uc-hero">
				{/* Left column: heading + CTAs */}
				<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-6 cds--col-xlg-6">
					<section aria-labelledby="hero-heading" aria-describedby="hero-tagline">
						<h1 id="hero-heading" className="cds--type-expressive-heading-06 uc-hero__title">Intelligent<br />trade execution.</h1>
						<p id="hero-tagline" className="cds--type-body-long-02 uc-hero__tagline">AI agents. Secure integration. Measurable outcomes.</p>
						<div className="uc-hero__cta-group uc-cta" data-ctas>
							<Button kind="primary" size="lg" href="/services">Explore services</Button>
							<Button kind="tertiary" size="lg" href="/contact" className="uc-hero__cta-alt" renderIcon={ArrowRight}>Talk to an expert</Button>
						</div>
					</section>
				</div>

				{/* Middle column: media */}
				<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-6 cds--col-xlg-6">
					<div className="uc-media uc-media--hero">
						<AspectRatio ratio="16x9" aria-label="Hero media">
							<video
								ref={videoRef}
								autoPlay
								muted
								loop
								playsInline
								preload="metadata"
								aria-hidden="true"
								crossOrigin="anonymous"
								poster="/media/hero-poster.jpg"
								onLoadedData={(e) => {
									// reduce sudden flash; fade in
									const v = e.currentTarget; v.classList.add('uc-media__video--ready');
								}}
							>
								<source src="/media/hero.webm" type="video/webm" />
								<source src="/media/hero.mp4" type="video/mp4" />
								Your browser does not support HTML5 video.
							</video>
						</AspectRatio>
					</div>
				</div>

				{/* Right column: LatestNews */}
				<aside className="cds--col-sm-4 cds--col-md-8 cds--col-lg-4 cds--col-xlg-4 uc-latest" role="complementary">
					<section aria-labelledby="latest-news-heading">
						<h2 id="latest-news-heading" className="cds--type-productive-heading-02 uc-latest__title">Latest news</h2>
						<LatestNews />
					</section>
				</aside>
			</div>
			{/* Recommended cards row */}
			{/* Capability taxonomy section (IBM-style grid) */}
			<CapabilitySection />

			{/* Recommended content row */}
			<section aria-label="Recommended resources">
				<RecommendedForYou
					items={[
						{ title: 'Start scaling AI agents like a pro', href: '/insights/ai-agents', category: 'Insights' },
						{ title: 'Enable seamless integration', href: '/solutions/integration', category: 'Solutions' },
						{ title: 'Build trust in AI adoption', href: '/products/trust-ai', category: 'Products' },
						{ title: 'Quantum safety readiness', href: '/reports/quantum-safety', category: 'Report' },
					]}
				/>
			</section>

			{/* Developer resources section */}
			<DeveloperSection />
		</main>
	);
}
