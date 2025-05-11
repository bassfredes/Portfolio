import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.bassfredes.dev';
  const sections = [
    '',
    'experience',
    'projects',
    'about',
    'contact',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sections
      .map(
        (section) => `
      <url>
        <loc>${baseUrl}${section ? `/${section}` : ''}</loc>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
