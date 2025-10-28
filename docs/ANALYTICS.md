# Integración de Analytics - Guía de Uso

## Configuración

### Variables de Entorno
Asegúrate de tener configurado tu `.env.local` con:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Componentes Principales

1. **AnalyticsScript** - Carga Google Analytics y configura el consent mode
2. **AnalyticsProvider** - Hook para tracking de navegación entre páginas
3. **CookieConsentBanner** - Manejo de consentimiento GDPR/CCPA

### Funciones de Tracking

```typescript
import { trackEvent, trackPageView } from '@/utils/analytics';

// Tracking de eventos personalizados (método estándar)
trackEvent({
  action: 'button_click',
  category: 'engagement', 
  label: 'hero_cta',
  value: 1
});

// Tracking manual de páginas (raramente necesario)
trackPageView('/custom-path', 'Custom Page Title');
```

### Implementación Estándar

✅ **Pageviews automáticos**: Se usan eventos `page_view` estándar de GA4  
✅ **Sin timeouts**: Confiamos en la carga natural de gtag  
✅ **Método recomendado**: `gtag('event', 'page_view')` para SPA  
✅ **Tracking completo**: Incluye page_title, page_location y page_path

### Eventos Pre-configurados

- ✅ **Navegación entre páginas** - Automático
- ✅ **Envío de formulario de contacto** - Exitoso/Error/Fallo
- ✅ **Consentimiento de cookies** - Aceptado

### Privacidad y Cumplimiento

- ✅ Consent Mode v2 implementado
- ✅ IP anonimizada por defecto
- ✅ Señales de Google deshabilitadas
- ✅ Personalización de anuncios deshabilitada
- ✅ Banner de consentimiento GDPR/CCPA

### Verificación

1. Abre las herramientas de desarrollador
2. Ve a la pestaña Network
3. Busca llamadas a `google-analytics.com/g/collect`
4. Verifica que se envían pageviews y eventos

### Debugging

Habilita el modo debug añadiendo a tu `.env.local`:
```bash
NEXT_PUBLIC_GA_DEBUG=true
```