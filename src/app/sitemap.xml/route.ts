import { NextResponse } from 'next/server';
import { getSortedPostsData, getAllCategories, slugify } from '@/utils/posts';

// Forzar generación estática y revalidación cada 24 horas
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 horas en segundos

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

  // Usar fecha fija para evitar regeneración innecesaria (se actualiza con cada build/revalidación)
  const lastmod = new Date().toISOString().split('T')[0]; // Solo fecha YYYY-MM-DD

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (url) => `
      <url>
        <loc>${escapeXml(baseUrl)}${escapeXml(url)}</loc>
        <lastmod>${lastmod}</lastmod>
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
