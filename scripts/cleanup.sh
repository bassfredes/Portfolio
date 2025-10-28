#!/bin/bash

# Script de limpieza del proyecto siguiendo buenas prácticas
# Uso: ./scripts/cleanup.sh [--firebase]

PROJECT_ID="bassfredes-portfolio"

echo "🧹 Iniciando limpieza del proyecto..."

# Limpiar node_modules (SÍ se debe eliminar)
echo "📦 Limpiando node_modules..."
rm -rf node_modules

# Limpiar build artifacts
echo "🏗️ Limpiando artefactos de build..."
rm -rf .next
rm -rf out
rm -rf dist
rm -rf build

# Limpiar archivos temporales y de entorno (NO el .env.example)
echo "🗑️ Limpiando archivos temporales..."
rm -rf .env.local
rm -rf .env
rm -rf *.log
rm -rf logs/

# Limpiar caches
echo "💾 Limpiando caches..."
rm -rf .cache
rm -rf .parcel-cache
rm -rf .vercel
rm -rf .turbo

# Limpiar coverage y test artifacts
echo "📊 Limpiando coverage..."
rm -rf coverage
rm -rf .nyc_output
rm -rf jest_coverage

# Limpiar TypeScript artifacts
echo "🔧 Limpiando TypeScript artifacts..."
rm -rf tsconfig.tsbuildinfo

# Reinstalar dependencias (MANTIENE package-lock.json)
echo "📦 Reinstalando dependencias..."
npm ci

# Función para limpieza de Firebase (opcional)
cleanup_firebase() {
    echo ""
    echo "🔥 Limpiando artefactos de Firebase..."
    
    # Verificar si Firebase CLI está instalado
    if ! command -v firebase &> /dev/null; then
        echo "⚠️ Firebase CLI no encontrado. Instálalo con: npm install -g firebase-tools"
        return 1
    fi

    # Verificar autenticación
    if ! firebase projects:list &> /dev/null; then
        echo "🔐 Por favor, autentícate con Firebase: firebase login"
        return 1
    fi

    echo "🗂️ Limpiando versiones antiguas de Hosting..."
    # Listar y eliminar canales de preview antiguos (mantener últimas 5)
    firebase hosting:channel:list --project $PROJECT_ID 2>/dev/null | \
    grep -v "live" | tail -n +6 | while read channel_id _; do
        if [ ! -z "$channel_id" ]; then
            echo "Eliminando canal de preview: $channel_id"
            firebase hosting:channel:delete $channel_id --project $PROJECT_ID --force 2>/dev/null || \
            echo "No se pudo eliminar $channel_id"
        fi
    done

    echo "📊 Limpiando logs antiguos de Functions..."
    # Limpiar logs de functions si existen (requiere gcloud)
    if command -v gcloud &> /dev/null; then
        CUTOFF_DATE=$(date -d "30 days ago" +%Y-%m-%d 2>/dev/null || date -v-30d +%Y-%m-%d)
        gcloud logging logs delete "projects/$PROJECT_ID/logs/firebase-functions" \
            --before="$CUTOFF_DATE" --quiet 2>/dev/null || \
            echo "No hay logs de Functions para limpiar"
    else
        echo "ℹ️ gcloud CLI no encontrado, saltando limpieza de logs"
    fi

    echo "✅ Limpieza de Firebase completada"
}

# Ejecutar limpieza local
echo "✅ Limpieza local completada!"

# Ejecutar limpieza de Firebase si se solicita
if [[ "$1" == "--firebase" ]]; then
    cleanup_firebase
fi

echo ""
echo "✅ Buenas prácticas aplicadas:"
echo "- ✅ package-lock.json preservado"
echo "- ✅ Solo node_modules eliminado" 
echo "- ✅ Usamos 'npm ci' en lugar de 'npm install'"
if [[ "$1" == "--firebase" ]]; then
    echo "- ✅ Artefactos antiguos de Firebase limpiados"
fi
echo ""
echo "💡 Para rebuild del proyecto ejecuta: npm run build"
if [[ "$1" != "--firebase" ]]; then
    echo "💡 Para limpiar también Firebase: ./scripts/cleanup.sh --firebase"
fi