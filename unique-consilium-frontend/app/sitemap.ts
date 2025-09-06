import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unique-consilium.com').replace(/\/$/, '');
  const paths = [
    '/',
    '/about',
    '/services',
    '/team',
    '/references',
    '/careers',
    '/contact',
    '/downloads',
    '/faq',
    '/terms',
    '/customer-login',
    '/manufacturer-login',
    '/field-sales-representative-login',
    '/consilium-principles',
    '/consilium-principles/perfectionism',
    '/consilium-principles/professionalism',
    '/consilium-principles/innovation',
  ];

  const now = new Date();

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
