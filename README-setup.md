# Guía de instalación paso a paso (con capturas integradas)

Este archivo describe cómo levantar localmente el proyecto AhorroyCredito y dónde están las capturas de pantalla (imágenes) para documentar el proceso.

Rutas clave del repo:
- Backend: ./backend
- Docker Compose: ./docker-compose.yml
- Variables de ejemplo: ./backend/.env.example
- ORM: Prisma (backend/prisma)

Resumen rápido de comandos (ejecutar desde la raíz del repo):

1) Pre-requisitos
- Git, Node.js (LTS recomendado 18/20), npm, Docker y Docker Compose instalados.
- Comprobación rápida:
  - `node -v && npm -v && git --version`
  - `docker --version && docker compose version`

![Pre-requisitos](images/1_prerequisitos.png)

2) Clonar (si no lo tienes)
- `git clone https://github.com/oscarrodriguez763-cmd/AhorroyCredito.git`
- `cd AhorroyCredito`

![Clonar repo](images/2_clonar_repo.png)

3) Revisar el README del repo
- Abre `README.md` y comprueba instrucciones específicas. (Ya incluye pasos con docker-compose y prisma.)

![README del repo](images/3_readme.png)

4) Levantar con Docker (recomendado para reproducibilidad)
- `docker compose up --build`
- Esto crea dos servicios: `db` (Postgres) y `backend` (puerto 4000 expuesto).
- Espera hasta ver logs que indiquen que el backend está corriendo en el puerto 4000.
- Capturas recomendadas: salida del docker compose y `docker ps` mostrando contenedores.

![Docker Compose levantado](images/4_docker_compose.png)

5) Alternativa — Ejecutar backend local (sin Docker)
- `cd backend`
- `npm install`
- Copiar variables de entorno:
  - `cp .env.example .env`
  - Edita `backend/.env` con valores locales (por ejemplo para conectar a tu Postgres local).
- Generar cliente Prisma y migraciones:
  - `npx prisma generate`
  - `npx prisma migrate dev --name init`
- Ejecutar seed (si existe):
  - `npm run seed`
- Levantar en modo desarrollo:
  - `npm run dev`

![Instalación de dependencias](images/5_npm_install.png)

6) Comprobar endpoints
- Health:
  - `curl http://localhost:4000/api/health`
- Registro / Login: usar Postman o curl para `POST /api/auth/register` y `POST /api/auth/login`.

![Health check API](images/6_api_health.png)

Ejemplo de flujo (registro/login, crear cuenta, depositar):

![Flujo de ejemplo](images/6_example_flow.png)

7) Ejecutar tests (si los hay)
- Desde `backend`: `npm test`

![Resultados de tests](images/7_tests.png)

8) Build para producción
- `cd backend`
- `npm run build`
- `npm start`

![Build y run producción](images/8_build.png)

9) Docker (opción avanzada)
- Si prefieres usar Docker para todo:
  - `docker compose up --build`
  - Accede a la app en `http://localhost:4000` (o al puerto definido)
- Para recrear y limpiar volúmenes:
  - `docker compose down -v`

![Docker build](images/9_docker_build.png)

![App en navegador desde Docker](images/9_docker_browser.png)

10) Añadir capturas al repo
- La carpeta `images/` existe y contiene un `.gitkeep` como placeholder. Sube tus capturas usando los nombres exactos indicados arriba para que se muestren correctamente en este README.

11) Notas de seguridad
- Nunca subas claves reales ni secretos. Antes de añadir capturas, difumina/borra valores sensibles de `.env` o de la UI.

12) Problemas comunes y soluciones rápidas
- Error de migraciones: revisa `DATABASE_URL` en `backend/.env` y asegúrate de que la BD está accesible.
- Puerto 4000 ocupado: cambia `PORT` en `backend/.env` o para docker-compose modifica mapping.
- Permisos al correr Prisma: si Prisma falla, borra `node_modules` y ejecuta `npm ci`.

Qué hice ahora
- He integrado los marcadores de imagen directamente en `README-setup.md`. Cuando subas las capturas con los nombres indicados, aparecerán en el documento.

Siguientes pasos (elige una)
- 1) Sube las capturas y yo confirmo la integración final.
- 2) Quieres que añada este contenido al `README.md` principal además de `README-setup.md` (dímelo y lo hago).
- 3) Prefieres que abra una rama y un PR con estos cambios para revisar antes de mergear (recomendado).