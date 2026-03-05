# Backend Ironclad - Configurator API

## Estructura del Proyecto

```
server/
├── src/
│   ├── index.ts              # Servidor Express principal
│   ├── config/
│   │   └── supabase.ts       # Cliente de Supabase
│   └── routes/
│       ├── areas.ts          # API de áreas
│       ├── categorias.ts     # API de categorías
│       ├── reglas.ts         # API de reglas de configuración
│       ├── unidades.ts       # API de registro de unidades
│       ├── vendedores.ts     # API de vendedores
│       └── referencia.ts     # Tablas de referencia (capacidad, chassis, etc.)
├── package.json
├── tsconfig.json
├── start.sh                  # Script de inicio para Azure
├── .env                      # Variables de entorno (desarrollo)
└── .env.example             # Ejemplo de variables de entorno
```

## Configuración de Variables de Entorno

### Desarrollo Local

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita `.env` y configura tus credenciales de Supabase:

```env
# Puerto del servidor
PORT=3000

# URL de tu proyecto Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co

# Clave anónima de Supabase (Anon Key)
SUPABASE_ANON_KEY=tu-anon-key-aqui

# URL del frontend (para desarrollo)
VITE_API_URL=http://localhost:3000/api
```

### Azure App Service

En Azure Portal > tu App Service > Configuration, agrega estas variables:

| Nombre | Valor |
|--------|-------|
| `PORT` | 3000 |
| `SUPABASE_URL` | https://tu-proyecto.supabase.co |
| `SUPABASE_ANON_KEY` | tu-anon-key |
| `VITE_API_URL` | https://tu-app.azurewebsites.net/api |

## Instalación

```bash
cd server
npm install
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/areas` | Listar todas las áreas |
| GET | `/api/categorias` | Listar categorías (opcional: ?area=1) |
| GET | `/api/vendedores` | Listar vendedores |
| GET | `/api/reglas?id_categoria=1` | Listar reglas por categoría |
| GET | `/api/capacidad` | Listar capacidad (opcional: ?tipo=remolque) |
| GET | `/api/chasis` | Listar tipos de chasis |
| GET | `/api/compuerta` | Listar compuertas |
| GET | `/api/ejes` | Listar ejes |
| GET | `/api/piso` | Listar tipos de piso |
| GET | `/api/suspension` | Listar suspensiones |
| GET | `/api/trocha` | Listar trochas |
| GET | `/api/llanta` | Listar llantas |
| GET | `/api/bocamaza` | Listar bocamazas |
| GET | `/api/muelles` | Listar muelles |
| GET | `/api/unidades` | Listar unidades registradas |
| POST | `/api/unidades` | Registrar nueva unidad |
| GET | `/api/health` | Health check |

## Tablas de Supabase Requeridas

El backend espera las siguientes tablas en tu base de datos Supabase:

- `areas` (id, nombre)
- `categorias` (id, id_area, nombre)
- `vendedores` (id, nombre)
- `reglas` (id, id_categoria, tipo_js, campo_nombre, tabla_referencia, filtro_tipo, orden_visualizacion)
- `capacidad` (id, nombre, tipo)
- `chasis` (id, nombre)
- `compuerta` (id, nombre)
- `ejes` (id, nombre)
- `piso` (id, nombre)
- `suspension` (id, nombre)
- `trocha` (id, nombre)
- `llanta` (id, nombre)
- `bocamaza` (id, nombre)
- `muelles` (id, nombre)
- `unidades` (id, estructura, serie, id_categoria, id_subcategoria, cliente, id_vendedor, c_respuestas, fecha_registro)
- `vw_detalle_unidades` (vista para consultar unidades registradas)

## Deployment en Azure

1. **Build del proyecto:**
```bash
npm run build
```

2. **Configura Azure App Service:**
   - Runtime: Node 22
   - Startup command: `node dist/index.js` o `npm start`

3. **Configura las variables de entorno** en Azure Portal

4. **Deploy** usando Azure CLI o GitHub Actions

