import Home from "../page";

// Forzar generación estática
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidar cada hora

// Generar rutas estáticas para las secciones conocidas
export function generateStaticParams() {
  return [
    { slug: ['experience'] },
    { slug: ['projects'] },
    { slug: ['about'] },
    { slug: ['contact'] },
  ];
}

export default function CatchAllPage() {
  return <Home />;
}
