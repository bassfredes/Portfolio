import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Fuerza la raíz a este proyecto para evitar warnings por lockfiles externos
    root: path.join(__dirname),
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Habilitar export estático para máximo caché (comentar si necesitas API routes)
  // output: 'export',
  
  // Headers de caché para recursos estáticos
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        // Páginas estáticas
        source: '/:path((?!api|_next).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
    ];
  },
  // Redirects para archivos .py a sus imágenes correspondientes
  async redirects() {
    return [
      {
        source: '/blog/:slug.py',
        destination: '/blog/:slug.jpg',
        permanent: true,
      },
      {
        source: '/:path*.py',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
