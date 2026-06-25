# Sistema de Ahorros y Préstamos (MVP)

Stack:
- Backend: Node.js + Express + TypeScript
- ORM: Prisma
- DB: PostgreSQL
- Auth: JWT + bcrypt
- Containerización: Docker + docker-compose

Cómo arrancar (local):
1. Copia `.env.example` a `backend/.env` y ajusta variables si quieres.
2. Levanta servicios:
   docker-compose up --build
3. Entra al contenedor backend o en tu host instala dependencias:
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed
   npm run dev

Endpoints principales:
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- POST /api/accounts { type } (auth)
- GET /api/accounts (auth)
- POST /api/accounts/:id/deposit { amount }
- POST /api/accounts/:id/withdraw { amount }
- POST /api/loans/request { requestedAmount, termMonths, annualRatePercent }
- POST /api/loans/:id/approve { approvedAmount } (admin)

Siguientes pasos sugeridos:
- Frontend React (Vite) + conexión a la API
- Validaciones y sanitización más robustas
- Tests unitarios/integración
- Pago real (Stripe) y conciliación
- KYC y subida de documentos
