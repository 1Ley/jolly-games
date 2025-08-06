# 🎮 Jolly Games - Minecraft Minigames Community Website

Una web corporativa y de comunidad moderna para Jolly Games, empresa de videojuegos especializada en minijuegos de Minecraft. Construida con Next.js 14, React 18, TypeScript y Tailwind CSS con un diseño minimalista estilo Bento UI y efectos glassmorphism.

## 🚀 Instalación Rápida

**¿Primera vez? Lee el archivo [INSTALACION.md](./INSTALACION.md) para una guía paso a paso.**

```bash
git clone https://github.com/1Ley/jolly-games.git
cd jolly-games
npm install
npm run dev
```

## 🌟 Características

- **🎨 Diseño Moderno**: Bento UI con glassmorphism y dark mode
- **⚡ Rendimiento**: Next.js 14 con App Router, SSR/SSG optimizado
- **🔧 TypeScript**: Tipado fuerte para mayor robustez
- **📱 Responsive**: Diseño adaptativo para todos los dispositivos
- **♿ Accesible**: Cumple con estándares WCAG AA
- **🎭 Animaciones**: Framer Motion para transiciones fluidas
- **🔍 SEO Optimizado**: Meta tags y estructura semántica

## 🛠️ Stack Tecnológico

### Frontend

- **Framework**: Next.js 14.2.0 con App Router
- **UI Library**: React 18.2.0
- **Lenguaje**: TypeScript 5.4.0
- **Estilos**: Tailwind CSS 3.4.17
- **Componentes**: Radix UI + shadcn/ui
- **Animaciones**: Framer Motion 12.12.2
- **Iconos**: Lucide React 0.445.0
- **Temas**: Next Themes 0.2.1

### Backend y Base de Datos

- **ORM**: Prisma 5.14.0
- **Base de Datos**: MySQL2 3.14.2
- **Autenticación**: NextAuth.js 4.24.0
- **API**: Express 5.1.0
- **Validación**: Express Validator 7.2.1
- **Seguridad**: Helmet 8.1.0, CORS 2.8.5

### Estado y Data Fetching

- **Estado Global**: Zustand 4.5.0
- **Data Fetching**: SWR 2.2.0 + React Query 3.39.3
- **HTTP Client**: Axios 1.10.0

### Desarrollo y Calidad

- **Linting**: ESLint 8.57.0 + Prettier 3.2.0
- **Git Hooks**: Husky 9.0.0
- **Testing**: Jest 29.7.0 + Testing Library 15.0.0
- **E2E Testing**: Playwright 1.44.0
- **Type Checking**: TypeScript strict mode

## 📁 Estructura del Proyecto

```
jolly-games/
├── app/                          # App Router de Next.js 14
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── forum/                   # Páginas del foro
│   ├── leaderboard/             # Clasificaciones
│   ├── support/                 # Soporte y contacto
│   ├── community/               # Galería de comunidad
│   └── rules/                   # Reglas y políticas
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base (shadcn/ui)
│   ├── layout/                  # Componentes de layout
│   └── sections/                # Secciones específicas
├── lib/                         # Utilidades y configuraciones
├── data/                        # Datos mock y tipos
├── styles/                      # Estilos globales
├── public/                      # Archivos estáticos
└── docs/                        # Documentación
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- **Node.js 18+** (Recomendado: 20.x LTS)
- **npm 9+** (incluido con Node.js)
- **Git** para clonar el repositorio

### Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/jolly-games.git
cd jolly-games

# 2. Instalar dependencias (esto puede tomar unos minutos)
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000 (o el puerto que se muestre en la terminal)
```

### Instalación Detallada

```bash
# Verificar versiones de Node.js y npm
node --version  # Debe ser 18.x o superior
npm --version   # Debe ser 9.x o superior

# Clonar el repositorio
git clone https://github.com/1Ley/jolly-games.git
cd jolly-games

# Instalar todas las dependencias
npm install

# Verificar que la instalación fue exitosa
npm run type-check
npm run lint

# Iniciar en modo desarrollo
npm run dev
```

### Variables de Entorno (Opcional)

El proyecto funciona sin configuración adicional, pero puedes personalizar variables:

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Edita .env.local con tus valores (opcional)
# Ver .env.example para todas las opciones disponibles
```

**Configuración mínima recomendada:**

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

> 📝 **Nota**: Revisa el archivo [.env.example](./.env.example) para ver todas las variables disponibles y sus descripciones.

### Comandos de Desarrollo

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia la aplicación en modo producción
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de linting automáticamente
npm run type-check   # Verifica tipos de TypeScript
npm run format       # Formatea el código con Prettier

# Testing
npm run test         # Ejecuta tests unitarios
npm run test:watch   # Tests en modo watch
npm run test:e2e     # Tests end-to-end con Playwright

# Utilidades
npm run prune        # Encuentra código TypeScript no utilizado
```

## 🔧 Solución de Problemas Comunes

### Error: "Module not found"

```bash
# Limpiar caché de npm e instalar de nuevo
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"

```bash
# El servidor se iniciará automáticamente en el siguiente puerto disponible
# Busca en la terminal el mensaje: "ready - started server on 0.0.0.0:XXXX"
# O especifica un puerto manualmente:
npm run dev -- -p 3001
```

### Error de TypeScript

```bash
# Verificar errores de tipos
npm run type-check

# Si hay errores, revisar los archivos mencionados
# La mayoría son errores menores que no afectan la funcionalidad
```

### Error de ESLint

```bash
# Corregir automáticamente errores de formato
npm run lint:fix
npm run format
```

### Problemas con Git

```bash
# Si hay problemas con los hooks de Git
npm run prepare

# Si no puedes hacer commit
git config core.autocrlf false  # En Windows
```

## 📄 Páginas Implementadas

### 🏠 Home (`/`)

- Hero section con CTA principal
- Bento grid con secciones modulares:
  - Actualizaciones recientes
  - Juegos destacados (carrusel)
  - Estadísticas del servidor
  - Actividades de la comunidad
  - Call-to-action

### 💬 Foro (`/forum`)

- Listado de temas por categorías
- Sistema de filtrado y búsqueda
- Indicadores de temas fijados/cerrados
- Paginación

### 🏆 Leaderboard (`/leaderboard`)

- Clasificación global de jugadores
- Filtros por minijuego y período
- Podium destacado (top 3)
- Tabla completa con estadísticas
- Sistema de búsqueda

### 🛠️ Soporte (`/support`)

- Formulario de tickets de soporte
- FAQ con secciones colapsables
- Información de contacto
- Tiempos de respuesta

### 🎨 Comunidad (`/community`)

- Galería de creaciones de usuarios
- Filtros por tipo de contenido
- Vista en grid y lista
- Lightbox para imágenes
- Sistema de likes y comentarios

### 📋 Reglas (`/rules`)

- Reglas organizadas por categorías
- Secciones colapsables
- Sistema de sanciones
- Proceso de apelaciones
- Políticas de privacidad

## 🎨 Diseño y Temas

### Colores Principales

```css
/* Variables CSS definidas en globals.css */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

--accent-50: #fdf4ff;
--accent-500: #a855f7;
--accent-900: #581c87;

--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
```

### Componentes de Diseño

- **Bento Grid**: Layout modular responsivo
- **Glassmorphism**: Efectos de cristal con backdrop-blur
- **Dark Mode**: Tema oscuro por defecto con toggle
- **Animaciones**: Transiciones suaves con Framer Motion

## 🧩 Componentes Principales

### UI Components (`/components/ui/`)

- `Button`: Botón con múltiples variantes
- `Badge`: Etiquetas con estilos personalizados
- `Toast`: Sistema de notificaciones
- `ThemeToggle`: Cambio entre modo claro/oscuro

### Layout Components (`/components/layout/`)

- `Navbar`: Navegación principal con glassmorphism
- `Footer`: Pie de página con enlaces y redes sociales
- `ThemeProvider`: Proveedor de tema

### Section Components (`/components/sections/`)

- `HeroSection`: Sección principal de la home
- `UpdatesSection`: Últimas actualizaciones
- `StatsSection`: Estadísticas del servidor
- `FeaturedGamesSection`: Carrusel de juegos
- `CommunitySection`: Actividades de la comunidad
- `CTASection`: Call-to-action

## 📊 Datos Mock

El proyecto incluye datos de ejemplo en `/data/mock-data.ts`:

- **Usuarios**: Perfiles de jugadores
- **Actividades**: Creaciones de la comunidad
- **Leaderboard**: Clasificaciones de jugadores
- **Foro**: Categorías, temas y posts
- **Juegos**: Información de minijuegos
- **Estadísticas**: Datos del servidor
- **Actualizaciones**: Changelog y noticias

## 🔧 Configuración

### Tailwind CSS

Configuración personalizada en `tailwind.config.js` con:

- Tema extendido con colores personalizados
- Animaciones y keyframes personalizados
- Plugins para formularios y tipografía
- Clases utilitarias para glassmorphism

### Next.js

Configuración en `next.config.js` con:

- App Router habilitado
- Optimizaciones de imágenes
- Headers de seguridad
- Variables de entorno

### TypeScript

Configuración estricta en `tsconfig.json` con:

- Paths absolutos configurados
- Strict mode habilitado
- Tipos personalizados en `/types/`

## 📤 Subir a GitHub

### Primera vez (Crear repositorio)

```bash
# 1. Crear repositorio en GitHub (sin README, .gitignore, ni licencia)
# 2. En tu terminal, dentro del proyecto:

git remote add origin https://github.com/TU-USUARIO/jolly-games.git
git branch -M main
git push -u origin main
```

### Actualizar repositorio existente

```bash
# Agregar cambios
git add .
git commit -m "feat: Actualización del proyecto Jolly Games"
git push origin main
```

### Para que tus amigos clonen el proyecto

```bash
# Ellos deben ejecutar:
git clone https://github.com/TU-USUARIO/jolly-games.git
cd jolly-games
npm install
npm run dev
```

## 🚀 Despliegue en Producción

### Vercel (Recomendado - Gratis)

```bash
# 1. Crear cuenta en vercel.com
# 2. Conectar repositorio de GitHub
# 3. Vercel detectará automáticamente Next.js
# 4. Deploy automático en cada push

# O usando CLI:
npm i -g vercel
vercel
```

### Netlify (Alternativa gratuita)

```bash
# Build command: npm run build
# Output directory: .next
# Node version: 18.x
```

### GitHub Pages (Solo para sitios estáticos)

```bash
# Agregar en package.json:
"homepage": "https://TU-USUARIO.github.io/jolly-games",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d .next"
}

# Instalar gh-pages
npm install --save-dev gh-pages
npm run deploy
```

## 🧪 Testing

### Tests Unitarios

```bash
# Ejecutar tests
npm run test

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Tests E2E

```bash
# Instalar Playwright
npx playwright install

# Ejecutar tests E2E
npm run test:e2e

# Modo interactivo
npm run test:e2e:ui
```

## 📈 Roadmap

### Fase 1 - Completada ✅

- [x] Estructura base del proyecto
- [x] Diseño y componentes UI
- [x] Páginas principales
- [x] Sistema de navegación
- [x] Datos mock y tipos

### Fase 2 - Próximamente

- [ ] Integración con base de datos (Prisma + PostgreSQL)
- [ ] Sistema de autenticación (NextAuth.js)
- [ ] API endpoints
- [ ] Estado global (Zustand)
- [ ] Data fetching (SWR)

### Fase 3 - Futuro

- [ ] Sistema de comentarios real
- [ ] Upload de imágenes
- [ ] Notificaciones en tiempo real
- [ ] Panel de administración
- [ ] Analytics y métricas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usa TypeScript para todo el código
- Sigue las reglas de ESLint y Prettier
- Escribe tests para nuevas funcionalidades
- Documenta componentes complejos
- Usa commits semánticos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollo**: Jolly Games Development Team
- **Diseño**: Jolly Games Design Team
- **Comunidad**: Jolly Games Community Team

## 📞 Contacto

- **Website**: [jollygames.net](https://jollygames.net)
- **Discord**: [discord.gg/jollygames](https://discord.gg/jollygames)
- **Email**: contact@jollygames.net
- **Twitter**: [@JollyGamesNet](https://twitter.com/JollyGamesNet)

---

**© 2025 Jolly Games. Todos los derechos reservados.**
