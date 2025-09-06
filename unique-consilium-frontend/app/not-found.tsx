import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="cds--grid uc-page" role="region" aria-labelledby="not-found-title">
			<div className="cds--row">
				<div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-12">
					<h1 id="not-found-title" className="cds--type-expressive-heading-05">404 — Page not found</h1>
					<p className="cds--type-body-long-02">The page you’re looking for doesn’t exist.</p>
					<p className="cds--type-body-long-02">
						<Link className="cds--link" href="/">Go back home</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
