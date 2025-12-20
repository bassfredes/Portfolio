import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Fuerza la raíz a este proyecto para evitar warnings por lockfiles externos
    root: path.join(__dirname),
  },
  // Exportación estática - genera HTML/CSS/JS sin necesidad de servidor
  // El formulario de contacto usará una Cloud Function separada
  output: 'export',
  
  images: {
    // Desactivar optimización de imágenes en exportación estática
    unoptimized: true,
    qualities: [70, 75],
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
  // NOTA: headers y redirects son manejados por Firebase Hosting (firebase.json)
  // No funcionan con output: 'export'
};

export default nextConfig;
