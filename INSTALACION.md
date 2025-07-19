# 🚀 Guía de Instalación Rápida - Jolly Games

## ⚡ Instalación en 4 pasos

### 1️⃣ Verificar prerrequisitos
```bash
# Verificar que tienes Node.js instalado
node --version
# Debe mostrar algo como: v18.x.x o v20.x.x

# Si no tienes Node.js, descárgalo de: https://nodejs.org/
```

### 2️⃣ Clonar el proyecto
```bash
# Clonar desde GitHub
git clone https://github.com/TU-USUARIO/jolly-games.git

# Entrar al directorio
cd jolly-games
```

### 3️⃣ Instalar dependencias
```bash
# Instalar todas las dependencias (puede tomar 2-3 minutos)
npm install
```

### 4️⃣ Iniciar el proyecto
```bash
# Iniciar el servidor de desarrollo
npm run dev

# ¡Listo! Abre tu navegador en:
# http://localhost:3000
# (o el puerto que se muestre en la terminal)
```

---

## 🔧 Si algo sale mal...

### ❌ Error: "node no se reconoce como comando"
- **Solución**: Instala Node.js desde https://nodejs.org/
- Reinicia tu terminal después de instalar

### ❌ Error: "git no se reconoce como comando"
- **Solución**: Instala Git desde https://git-scm.com/
- O descarga el proyecto como ZIP desde GitHub

### ❌ Error: "Port 3000 is already in use"
- **Solución**: El proyecto se abrirá automáticamente en otro puerto
- Busca en la terminal el mensaje que dice el puerto correcto

### ❌ Error: "Module not found" o errores de instalación
```bash
# Limpiar e instalar de nuevo
npm cache clean --force
rm -rf node_modules
npm install
```

### ❌ En Windows: Errores de permisos
```bash
# Ejecutar terminal como administrador
# O usar PowerShell en lugar de CMD
```

---

## 📱 ¿Qué verás?

Cuando todo funcione correctamente, verás:

1. **Terminal**: Mensajes de compilación exitosa
2. **Navegador**: La página de Jolly Games cargando
3. **URL**: `http://localhost:3000` (o similar)

---

## 🎯 Comandos útiles

```bash
# Detener el servidor
Ctrl + C

# Reiniciar el servidor
npm run dev

# Verificar que todo está bien
npm run lint
npm run type-check

# Construir para producción
npm run build
```

---

## 💡 Consejos

- **Mantén la terminal abierta** mientras uses el proyecto
- **Guarda los cambios** en tu editor y se actualizarán automáticamente
- **Si modificas algo**, los cambios se verán en tiempo real
- **Para cerrar**, usa `Ctrl + C` en la terminal

---

## 🆘 ¿Necesitas ayuda?

1. **Revisa la terminal** - ahí aparecen los errores
2. **Lee el README.md completo** - tiene más detalles
3. **Contacta al desarrollador** - si nada funciona

---

**¡Disfruta explorando Jolly Games! 🎮**