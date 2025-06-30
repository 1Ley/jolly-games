# 🎮 Jolly Games - Minecraft Minigames Community Website

Una web corporativa y de comunidad moderna para Jolly Games, empresa de videojuegos especializada en minijuegos de Minecraft. Construida con Next.js 14, React 19, TypeScript y Tailwind CSS con un diseño minimalista estilo Bento UI y efectos glassmorphism.

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
- **Framework**: Next.js 14+ con App Router
- **UI Library**: React 19.1.0
- **Lenguaje**: TypeScript 5+
- **Estilos**: Tailwind CSS 3.4.17
- **Componentes**: Radix UI + shadcn/ui
- **Animaciones**: Framer Motion 12.12.2
- **Iconos**: Lucide React

### Desarrollo y Calidad
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky
- **Testing**: Jest + Testing Library (configurado)
- **E2E Testing**: Playwright (configurado)

### Futuras Integraciones
- **Estado Global**: Zustand o Redux Toolkit
- **Data Fetching**: SWR o React Query
- **Base de Datos**: Prisma + PostgreSQL
- **Autenticación**: NextAuth.js o Clerk
- **Despliegue**: Vercel o Netlify

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
- Node.js 18+ 
- npm, yarn o pnpm
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/jolly-games.git
cd jolly-games

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de desarrollo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Base de datos (cuando se implemente)
# DATABASE_URL="postgresql://..."

# Autenticación (cuando se implemente)
# NEXTAUTH_SECRET="tu-secret-aqui"
# NEXTAUTH_URL=http://localhost:3000

# APIs externas (cuando se necesiten)
# DISCORD_CLIENT_ID=""
# DISCORD_CLIENT_SECRET=""
```

### Comandos de Desarrollo

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia la aplicación en modo producción
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de linting automáticamente
npm run type-check   # Verifica tipos de TypeScript

# Testing (cuando se implemente)
npm run test         # Ejecuta tests unitarios
npm run test:watch   # Tests en modo watch
npm run test:e2e     # Tests end-to-end con Playwright

# Utilidades
npm run clean        # Limpia archivos de build
npm run analyze      # Analiza el bundle
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

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar dominio personalizado
vercel domains add tu-dominio.com
```

### Netlify
```bash
# Build command
npm run build

# Output directory
out

# Environment variables
# Configurar en Netlify dashboard
```

### Docker
```dockerfile
# Dockerfile incluido para desarrollo local
docker build -t jolly-games .
docker run -p 3000:3000 jolly-games
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