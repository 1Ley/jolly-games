# 🔐 Sistema de Autenticación MySQL + React + Node.js

## 📁 Archivos Incluidos

- **`GUIA_MYSQL_AUTENTICACION.md`** - Guía completa paso a paso
- **`ejemplos-codigo-autenticacion.md`** - Código completo de implementación
- **`setup-database.sql`** - Script SQL para configurar la base de datos
- **`README-AUTENTICACION.md`** - Este archivo (resumen ejecutivo)

## 🚀 Inicio Rápido

### 1. Configurar Base de Datos
```bash
# Conectar a MySQL
mysql -u root -p

# Ejecutar script de configuración
source setup-database.sql
```

### 2. Backend (Node.js)
```bash
# Crear directorio del backend
mkdir backend && cd backend

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon

# Crear archivo .env
echo "DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=jolly_games_auth
JWT_SECRET=tu_jwt_secret_seguro
PORT=5000" > .env
```

### 3. Frontend (React)
```bash
# En el directorio del proyecto React
npm install axios react-router-dom
```

### 4. Estructura de Archivos Recomendada
```
proyecto/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   └── App.js
│   └── package.json
└── database/
    └── setup-database.sql
```

## 🔧 Configuración VS Code + MySQL

### Instalar Extensión MySQL
1. Abrir VS Code
2. Ir a Extensiones (`Ctrl+Shift+X`)
3. Buscar "MySQL" por Jun Han
4. Instalar y reiniciar VS Code

### Conectar a MySQL
1. Presionar `Ctrl+Shift+P`
2. Escribir "MySQL: Connect"
3. Configurar:
   - Host: `localhost`
   - Puerto: `3306`
   - Usuario: `root`
   - Contraseña: tu contraseña MySQL

## 📊 Esquema de Base de Datos

### Tabla `users`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT AUTO_INCREMENT | Clave primaria |
| `username` | VARCHAR(50) UNIQUE | Nombre de usuario |
| `email` | VARCHAR(100) UNIQUE | Correo electrónico |
| `password` | VARCHAR(255) | Contraseña hasheada |
| `full_name` | VARCHAR(100) | Nombre completo |
| `role` | ENUM | Rol del usuario |
| `status` | ENUM | Estado de la cuenta |
| `email_verified` | BOOLEAN | Email verificado |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

## 🛡️ Características de Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT tokens para autenticación
- ✅ Validación de entrada
- ✅ Protección contra SQL injection
- ✅ Rate limiting (recomendado)
- ✅ HTTPS en producción (recomendado)

## 🔄 Flujo de Autenticación

### Registro
1. Usuario envía datos (username, email, password)
2. Backend valida datos
3. Contraseña se hashea con bcrypt
4. Usuario se guarda en base de datos
5. Se genera JWT token
6. Token se envía al frontend

### Login
1. Usuario envía credenciales
2. Backend busca usuario en BD
3. Verifica contraseña con bcrypt
4. Genera JWT token si es válido
5. Token se envía al frontend

### Verificación
1. Frontend envía token en headers
2. Backend verifica token JWT
3. Extrae información del usuario
4. Permite o deniega acceso

## 📝 Comandos SQL Útiles

```sql
-- Ver todos los usuarios
SELECT id, username, email, role, status, created_at FROM users;

-- Buscar usuario específico
SELECT * FROM users WHERE username = 'nombre_usuario';

-- Contar usuarios por rol
SELECT role, COUNT(*) as cantidad FROM users GROUP BY role;

-- Usuarios registrados en los últimos 7 días
SELECT username, email, created_at 
FROM users 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Limpiar sesiones expiradas
CALL CleanExpiredSessions();

-- Ver estadísticas
CALL GetUserStats();
```

## 🚨 Solución de Problemas

### Error: "Access denied for user"
```bash
# Verificar que MySQL esté ejecutándose
sudo systemctl status mysql

# Reiniciar MySQL si es necesario
sudo systemctl restart mysql
```

### Error: "Cannot connect to database"
1. Verificar credenciales en `.env`
2. Confirmar que la base de datos existe
3. Revisar permisos del usuario MySQL

### Error: "JWT token invalid"
1. Verificar que `JWT_SECRET` sea el mismo en backend
2. Comprobar que el token no haya expirado
3. Revisar formato del header Authorization

### Error: "Duplicate entry"
- El username o email ya existe
- Verificar unicidad antes de insertar

## 🔧 Scripts de Package.json

### Backend
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

### Frontend
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

## 🌐 Despliegue en Producción

### Variables de Entorno
```env
# Producción
NODE_ENV=production
DB_HOST=tu_servidor_mysql
DB_USER=usuario_produccion
DB_PASSWORD=password_seguro
DB_NAME=jolly_games_auth
JWT_SECRET=jwt_secret_muy_seguro_256_bits
PORT=5000
```

### Consideraciones
- Usar HTTPS obligatorio
- Configurar CORS apropiadamente
- Implementar rate limiting
- Configurar logs de auditoría
- Backup automático de base de datos
- Monitoreo de rendimiento

## 📚 Recursos Adicionales

- [Documentación MySQL](https://dev.mysql.com/doc/)
- [Guía de bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [JWT.io](https://jwt.io/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Router](https://reactrouter.com/)

## 🤝 Contribución

Para mejorar este sistema:
1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -am 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**¡Felicidades!** 🎉 Tienes todo lo necesario para implementar un sistema de autenticación completo y seguro.

**Próximos pasos sugeridos:**
1. Implementar verificación de email
2. Agregar recuperación de contraseña
3. Implementar autenticación de dos factores (2FA)
4. Agregar OAuth (Google, Facebook, etc.)
5. Implementar roles y permisos avanzados