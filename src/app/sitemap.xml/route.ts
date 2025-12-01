import { NextResponse } from 'next/server';
import { getSortedPostsData, getAllCategories, slugify } from '@/utils/posts';

// Función para escapar caracteres especiales de XML y prevenir XSS
function escapeXml(text: string): string {
  const xmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };
  return text.replace(/[&<>"']/g, (char) => xmlEscapes[char]);
}

export async function GET() {
  const baseUrl = 'https://www.bassfredes.dev';
  
  // Static sections
  const sections = [
    '',
    'experience',
    'projects',
    'about',
    'contact',
    'blog',
  ];

  // Dynamic blog posts
  const posts = getSortedPostsData();
  const postUrls = posts.map(post => `/blog/${post.id}`);

  // Dynamic categories
  const categories = getAllCategories();
  const categoryUrls = categories.map(cat => `/blog/category/${slugify(cat)}`);

  const allUrls = [
    ...sections.map(section => section ? `/${section}` : ''),
    ...postUrls,
    ...categoryUrls
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (url) => `
      <url>
        <loc>${escapeXml(baseUrl)}${escapeXml(url)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
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
