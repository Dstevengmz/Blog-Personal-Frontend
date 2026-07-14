# BlogDarwin

Portafolio profesional de **Darwin Steven Gómez**, Desarrollador de Software Full Stack. La aplicación presenta proyectos y artículos obtenidos desde una API, casos de estudio con campos opcionales, perfiles profesionales y un formulario real de contacto.

## Vista principal

- Sitio publicado: [blogdarwin.vercel.app](https://blogdarwin.vercel.app/)
- La captura definitiva del nuevo diseño debe agregarse después del siguiente despliegue para evitar documentar una interfaz desactualizada.

## Tecnologías

### Frontend

- React 19 y React DOM.
- Vite 7.
- React Router 7.
- React Bootstrap y Bootstrap 5.
- Axios.
- Motion para transiciones respetando `prefers-reduced-motion`.

### Backend

- Node.js y Express 5.
- Sequelize 6 y MySQL.
- JWT y bcrypt para autenticación.
- Multer y Cloudinary para imágenes.
- API HTTPS de Resend para contacto y recuperación de contraseña.
- `express-rate-limit` para limitar envíos del formulario e intentos de recuperación.

## Requisitos

- Node.js compatible con Vite 7.
- npm.
- Una instancia de MySQL.
- Una cuenta de Cloudinary para la gestión de imágenes.
- Una cuenta de Resend para los correos de contacto y recuperación.

## Instalación

Desde la raíz del repositorio:

```bash
cd backend
npm ci
cd ../frontend
npm ci
```

## Variables de entorno

Copiar los archivos de ejemplo, sin registrar archivos `.env` ni valores secretos en el repositorio.

### Frontend (`frontend/.env`)

| Variable | Uso |
| --- | --- |
| `VITE_API_URL` | URL base pública de la API, con la barra final adecuada para resolver las rutas `api/...`. |

Las variables con prefijo `VITE_` quedan incorporadas al bundle público. Por esta razón, el frontend solo contiene la URL pública de la API y nunca claves de Resend, JWT, base de datos o Cloudinary.

### Backend (`backend/.env`)

| Variable | Uso |
| --- | --- |
| `PORT` | Puerto HTTP del servidor. |
| `NODE_ENV` | Entorno de ejecución. |
| `JWT_SECRET` | Firma de tokens; debe ser extensa y privada. |
| `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_DIALECT` | Conexión a MySQL mediante Sequelize. |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Datos para el seeder administrativo. |
| `RESEND_API_KEY` | Clave privada de la API de Resend. |
| `RESEND_FROM` | Remitente autorizado; durante pruebas puede usarse `Darwin Steven Gómez <onboarding@resend.dev>`. |
| `CONTACT_EMAIL` | Destinatario de los mensajes. |
| `FRONTEND_URL` | URL pública del frontend usada para construir el enlace de recuperación, por ejemplo `https://blogdarwin.vercel.app`. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Almacenamiento de imágenes. |

## Base de datos

Con las variables del backend configuradas:

```bash
cd backend
npm run migrate
```

La migración de recuperación agrega el hash y la fecha de vencimiento del token a `Usuarios`. Debe ejecutarse también contra la base de datos de producción antes de utilizar esta función. El seeder de administrador existe en `backend/seeders/`; debe ejecutarse solo en un entorno controlado y con credenciales seguras configuradas.

## Ejecución local

En dos terminales:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

## Comprobaciones y build

```bash
cd backend
npm test

cd frontend
npm run lint
npm run build
npm run preview
```

El backend incluye pruebas unitarias para la integración de correo y las reglas del restablecimiento de contraseña.

## Estructura principal

```text
BlogPersonal/
├── backend/
│   ├── app.js                 # Express y montaje de rutas
│   ├── controllers/           # Entrada HTTP y respuestas
│   ├── services/              # Reglas y acceso a datos/servicios externos
│   ├── routers/               # Contratos de la API
│   ├── models/                # Modelos Sequelize
│   ├── migrations/            # Esquema versionado
│   └── middlewares/           # Auth, roles, propiedad y subida
└── frontend/
    ├── public/                # Favicon, robots y sitemap
    └── src/
        ├── components/        # Layout, navegación y tarjetas reutilizables
        ├── lib/               # Cliente API, URLs y normalización de proyectos
        ├── pages/             # Rutas públicas y administrativas
        ├── services/          # Acceso centralizado a endpoints
        └── profile.config.js  # Información profesional pública
```

## Carga dinámica de proyectos

El frontend no contiene un arreglo de proyectos escrito manualmente. Las vistas consultan:

- `GET /api/listarproyectos` para el listado.
- `GET /api/listarproyectos?tipo=web|movil` para filtros.
- `GET /api/listarproyectos?limit=6` para la selección del inicio.
- `GET /api/buscarproyecto/:id` para el detalle.

El contrato base admite `titulo`, `descripcion`, `tipo`, `github`, `demoUrl`, `imagen`, `tecnologias` e `imagenes`. El detalle también puede mostrar campos opcionales de caso de estudio cuando la API los proporcione; los campos ausentes no se renderizan.

Los listados implementan estados de carga, error con reintento, lista vacía, datos recibidos, fallback de imagen, validación de enlaces y cancelación de solicitudes al desmontar o cambiar de filtro.

## Funcionalidades

- Inicio profesional con llamadas a proyectos y contacto.
- Navegación responsive, accesible y con sección activa.
- Proyectos dinámicos, filtrables y priorizados para lectura profesional.
- Detalle reutilizable con galería y campos opcionales de caso de estudio.
- Artículos dinámicos.
- Formulario de contacto validado, con honeypot y límite de frecuencia en backend.
- Recuperación de contraseña mediante un enlace de un solo uso que vence en 30 minutos.
- Autenticación y administración protegida por roles.
- SEO técnico: canonical, Open Graph, Twitter Card, `Person` JSON-LD, `robots.txt` y `sitemap.xml`.
- Rutas cargadas de forma diferida para reducir el JavaScript inicial.

## Autenticación y seguridad del cliente

- `/login` inicia la sesión y conserva únicamente el JWT y los datos públicos del usuario.
- `/recuperar-contrasena` solicita el correo sin revelar desde la interfaz si existe una cuenta.
- `/restablecer-contrasena/:token` valida la contraseña y consume el enlace recibido por correo.
- `authStorage.js` centraliza la lectura, escritura y eliminación de la sesión y descarta datos corruptos.
- `ProtectedRoute` controla la navegación visible, pero la autorización definitiva siempre se realiza en el backend.
- React escapa el contenido dinámico y no se utiliza `dangerouslySetInnerHTML` para mostrar datos recibidos de la API.
- Los enlaces externos se validan para aceptar únicamente HTTP o HTTPS y los enlaces en pestaña nueva usan `noopener noreferrer`.

El JWT se mantiene en `localStorage`, por lo que debe evitarse cualquier ejecución de JavaScript no confiable. Una migración futura a cookies `HttpOnly`, `Secure` y `SameSite` requeriría ajustar conjuntamente el backend, CORS y la protección CSRF.

## Despliegue

- El frontend incluye `vercel.json` para servir correctamente las rutas del SPA en Vercel.
- El backend está desplegado en Render e incluye un `Procfile` que ejecuta `node app.js`.
- Antes de desplegar, configurar todas las variables en el proveedor, ejecutar migraciones y definir `VITE_API_URL` con la URL pública del backend.
- En Render puede configurarse el Build Command como `npm install && npm run migrate` para aplicar automáticamente las migraciones pendientes antes de cada despliegue.
- El remitente de prueba `onboarding@resend.dev` solo permite enviar al correo propietario de la cuenta de Resend. Para recuperar cuentas con otros correos es obligatorio verificar un dominio y cambiar `RESEND_FROM` a una dirección de ese dominio.

## Mejoras pendientes

- Ampliar las pruebas de integración y añadir pruebas end-to-end.
- Definir y documentar campos persistentes de caso de estudio mediante una migración, si se desea administrarlos desde la base de datos.
- Restringir CORS del backend a los dominios autorizados en producción.
- Añadir captura actualizada del nuevo inicio.
- Generar entradas dinámicas de proyectos y artículos en el sitemap cuando exista un proceso de build conectado a la API.
- Documentar el proveedor y el procedimiento exacto de respaldo de la base de datos.
