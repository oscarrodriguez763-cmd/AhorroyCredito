# Sistema Financiero 💰

Plataforma integral para control de ahorros y créditos con diseño elegante y características avanzadas.

## 🎯 Características Principales

- ✅ **Autenticación Segura**: JWT + Bcrypt
- ✅ **Gestión de Cuentas**: Crear y administrar cuentas de ahorro
- ✅ **Control de Créditos**: Solicitar, aprobar y gestionar préstamos
- ✅ **Dashboard Interactivo**: Estadísticas en tiempo real
- ✅ **Historial de Transacciones**: Registro completo de movimientos
- ✅ **Reportes y Gráficos**: Análisis visual de datos
- ✅ **Interfaz Responsiva**: Optimizada para desktop y mobile
- ✅ **Validación de Datos**: Seguridad en todas las operaciones

## 📊 Stack Tecnológico

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Base de Datos**: PostgreSQL 14+
- **Autenticación**: JWT + Bcrypt
- **ORM**: Sequelize
- **Validación**: Joi
- **Variables de Entorno**: dotenv

### Frontend
- **Framework**: React 18 + TypeScript
- **Estilos**: Tailwind CSS
- **Gestión de Estado**: Redux Toolkit
- **HTTP Client**: Axios
- **Gráficos**: Chart.js + react-chartjs-2
- **Iconos**: Heroicons
- **Rutas**: React Router v6

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Pasos de Instalación

#### 1. Clonar el Repositorio
```bash
git clone https://github.com/oscarrodriguez763-cmd/AhorroyCredito.git
cd AhorroyCredito
```

#### 2. Configurar Backend
```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env

# Configurar variables de entorno
# Editar .env con tus credenciales de PostgreSQL

# Ejecutar migraciones
npm run migrate

# Iniciar servidor
npm run dev
```

#### 3. Configurar Frontend
```bash
cd ../frontend
npm install

# Crear archivo .env
cp .env.example .env

# Iniciar aplicación
npm start
```

## 📁 Estructura del Proyecto

```
AhorroyCredito/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── savingsController.js
│   │   ├── creditsController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── SavingsAccount.js
│   │   ├── Credit.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── savingsRoutes.js
│   │   ├── creditsRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── validators.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   └── ARCHITECTURE.md
└── README.md
```

## 🔐 Seguridad

- Contraseñas encriptadas con Bcrypt
- Tokens JWT con expiración
- Validación de entrada en todas las operaciones
- CORS configurado
- Rate limiting en endpoints sensibles
- SQL injection prevention con ORM

## 📚 Documentación

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 📞 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

---

**Desarrollado con ❤️ para gestionar tus finanzas**