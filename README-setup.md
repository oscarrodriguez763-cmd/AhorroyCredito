# Guía de instalación paso a paso (con marcadores para imágenes)

Este archivo describe cómo levantar localmente el proyecto AhorroyCredito y dónde añadir las capturas de pantalla (imágenes) para documentar el proceso.

Rutas clave del repo:
- Backend: ./backend
- Docker Compose: ./docker-compose.yml
- Variables de ejemplo: ./backend/.env.example
- ORM: Prisma (backend/prisma)

Resumen rápido de comandos (ejecutar desde la raíz del repo):

1) Pre-requisitos (captura: images/1_prerequisitos.png)
- Git, Node.js (LTS recomendado 18/20), npm, Docker y Docker Compose instalados.
- Comprobación rápida:
  - node -v && npm -v && git --version
  - docker --version && docker compose version

2) Clonar (si no lo tienes) (captura: images/2_clonar_repo.png)
- git clone https://github.com/oscarrodriguez763-cmd/AhorroyCredito.git
- cd AhorroyCredito

3) Revisar el README del repo (captura: images/3_readme.png)
- Abre README.md y comprueba instrucciones específicas. (Ya incluye pasos con docker-compose y prisma.)

4) Levantar con Docker (recomendado para reproducibilidad) (captura: images/4_docker_compose.png)
- docker compose up --build
- Esto crea dos servicios: db (Postgres) y backend (puerto 4000 expuesto).
- Espera hasta ver logs que indiquen que el backend está corriendo en el puerto 4000.
- Capturas recomendadas: salida del docker compose y `docker ps` mostrando contenedores.

5) Alternativa — Ejecutar backend local (sin Docker) (captura: images/5_npm_install.png)
- cd backend
- npm install
- Copiar variables de entorno:
  - cp .env.example .env
  - Edita backend/.env con valores locales (por ejemplo para conectar a tu Postgres local).
- Generar cliente Prisma y migraciones:
  - npx prisma generate
  - npx prisma migrate dev --name init
- Ejecutar seed (si existe):
  - npm run seed
- Levantar en modo desarrollo:
  - npm run dev
- Captura: terminal con `npm run dev` y localización de servidor en http://localhost:4000

6) Comprobar endpoints (capturas: images/6_api_health.png y images/6_example_flow.png)
- Health:
  - curl http://localhost:4000/api/health
- Registro / Login: usar Postman o curl para POST /api/auth/register y /api/auth/login
- Captura resultados JSON y pantallas de Postman.

7) Ejecutar tests (si los hay) (captura: images/7_tests.png)
- Desde backend: npm test

8) Build para producción (captura: images/8_build.png)
- cd backend
- npm run build
- npm start

9) Docker (opción avanzada) (capturas: images/9_docker_build.png y images/9_docker_browser.png)
- Si prefieres usar Docker para todo:
  - docker compose up --build
  - Accede a la app en http://localhost:4000 (o al puerto definido)
- Para recrear y limpiar volúmenes:
  - docker compose down -v

10) Añadir capturas al repo
- Crea la carpeta images/ en la raíz (ya existe un placeholder en el repo).
- Sube las imágenes nombradas como en esta guía:
  - images/1_prerequisitos.png
  - images/2_clonar_repo.png
  - images/3_readme.png
  - images/4_docker_compose.png
  - images/5_npm_install.png
  - images/6_api_health.png
  - images/6_example_flow.png
  - images/7_tests.png
  - images/8_build.png
  - images/9_docker_build.png
  - images/9_docker_browser.png

11) README final (qué haré si me autorizas escribir en el repo)
- Puedo crear `README-SETUP.md` (este archivo) y una carpeta `images/` con ejemplos/plantillas.
- También puedo crear un PR con las imágenes ya añadidas (si me proporcionas las capturas) o con imágenes ficticias de ejemplo si quieres que lo demuestre end-to-end.

Notas de seguridad
- Nunca subas claves reales ni secretos. Antes de añadir capturas, difumina/borra valores sensibles de .env o de la UI.

Problemas comunes y soluciones rápidas
- Error de migraciones: revisa `DATABASE_URL` en `backend/.env` y asegúrate de que la BD está accesible.
- Puerto 4000 ocupado: cambia PORT en backend/.env o para docker-compose modifica mapping.
- Permisos al correr Prisma: si Prisma falla, borra `node_modules` y ejecuta `npm ci`.

Qué hice ahora
- He creado este archivo `README-setup.md` en la raíz del repo con la guía personalizada y los nombres de imagen sugeridos.

Siguientes pasos (elige una)
- 1) Puedo crear las imágenes de ejemplo y subirlas si me das las capturas o permiso para generar imágenes sintéticas.
- 2) Puedo crear una rama y abrir un PR con mejoras al README y ejemplos de imágenes.
- 3) Si quieres, te guío en vivo por videollamada o compartes pantallas y yo te indico qué capturar.

Dime cómo quieres que continúe y procedo: crear PR con este README-setup.md (ya creado), subir imágenes que me des, o generar imágenes de ejemplo y hacer PR.
