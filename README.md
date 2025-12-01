# Portafolio Profesional – Bastian Fredes

Este repositorio contiene el código fuente del portafolio profesional de Bastian Fredes, Solution Architect, Tech Lead y Frontend Developer.

- Sitio: [bassfredes.dev](https://www.bassfredes.dev)
- Tecnologías: Next.js, React, TypeScript, Tailwind CSS
- Navegación SPA con rutas limpias y scroll suave a secciones
- Optimizado para SEO, LLMs y crawlers modernos

![Preview](public/og-image.jpg)

## Características
- Línea de tiempo de experiencia profesional
- Proyectos destacados y consistentes visualmente
- Sección de contacto y redes sociales
- Accesibilidad y diseño responsivo
- Sitemap y robots.txt configurados para máxima indexación
- Google Consent Mode v2 y GTM para analytics con respeto a la privacidad

## Analytics & Privacy
This portfolio implements Google Consent Mode v2 with Google Tag Manager integration:
- **Consent Mode v2**: Full compliance with the latest Google consent requirements
- **GTM Integration**: Centralized tag management with automatic fallback to GA4
- **Privacy-First**: All non-essential tracking defaults to 'denied'
- **Essential Data**: Security and functionality data collected independently of consent

To enable analytics, set `NEXT_PUBLIC_GTM_ID` (preferred) or `NEXT_PUBLIC_GA_ID` in your environment variables.

## Blog Management

The blog uses Markdown files located in `src/content/posts/`.

### Post Format
Each post must be a `.md` file with the following Frontmatter structure:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief summary of the post content."
author: "Author Name"
category: "Category"
tags: ["Tag1", "Tag2"]
---

# Content
Your Markdown content here...
```

### Categories
Categories are defined in the `category` field of the Frontmatter.
- The system automatically generates category pages based on these values.
- Use consistent casing (e.g., "Development", "Architecture").

---

© 2025 Bastian Fredes
