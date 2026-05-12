# MiniStock
MiniStock es una aplicación de inventario de productos desarrollada como prueba técnica. Incluye un frontend en React, un backend en Node.js/Express con MySQL, y un proxy inverso con Nginx para servir el frontend y enrutar las peticiones API.

## Arquitectura
La aplicación se divide en cuatro servicios principales:

- `frontend`: aplicación React construida con Vite. Se comunica con la API del backend mediante una URL configurada con `VITE_API_URL`.
- `backend`: API REST en Node.js/Express que expone operaciones CRUD sobre productos y se conecta a MySQL.
- `db`: base de datos MySQL donde se almacenan los productos.
- `proxy`: servidor Nginx usado como proxy inverso. Sirve el frontend y enruta `/api/` a la API del backend.

## Instrucciones para levantar el proyecto con Docker Compose

1. Copia el archivo `docker-compose.yml` en la raíz del proyecto.
2. (Opcional) Crea un archivo `.env` en la raíz para personalizar variables de entorno.
3. Ejecuta:

```bash
docker-compose up --build
```

4. Abre en el navegador:

```bash
http://tu-ip-o-localhost
```

5. Para detenerlo:

```bash
docker-compose down
```

## Separación de componentes y organización

### Backend
- `Backend/index.js`: punto de entrada del servidor Express.
- `Backend/routes/producto.routes.js`: define las rutas REST para los productos.
- `Backend/controllers/producto.controller.js`: lógica de controladores CRUD.
- `Backend/models/producto.model.js`: acceso a la base de datos MySQL.
- `Backend/config/db.js`: configuración del pool de conexiones MySQL usando variables de entorno.

### Frontend
- `Frontend/src/App.jsx`: componente principal que orquesta el estado y llama a los componentes hijos.
- `Frontend/src/components/ProductoForm.jsx`: formulario para crear y editar productos.
- `Frontend/src/components/ProductoTabla.jsx`: tabla de visualización de productos con acciones de editar/eliminar.
- `Frontend/src/services/productoService.js`: capa de servicio que centraliza las llamadas HTTP a la API.

### Nginx
- `nginx/nginx.conf`: configura el proxy inverso. Todas las peticiones a `/api/` se envían al servicio `backend:3000` y el resto de tráfico se envía al servicio `frontend:80`.

## Variables de entorno requeridas

El proyecto soporta valores por defecto, pero se recomienda definirlos en `.env` para mayor control.

Variables principales:

- `MYSQL_ROOT_PASSWORD`: contraseña del usuario root de MySQL.
- `DB_NAME`: nombre de la base de datos MySQL.
- `DB_USER`: usuario de la base de datos.
- `DB_PASSWORD`: contraseña del usuario de la base de datos.
- `DB_HOST`: host de la base de datos para el backend (`db` en Docker Compose).
- `BACKEND_PORT`: puerto donde corre el backend dentro del contenedor (por defecto `3000`).
- `SERVER_IP`: IP/host usado para construir la URL del frontend hacia el backend en Vite.

Ejemplo de `.env`:

```env
MYSQL_ROOT_PASSWORD=root_password
DB_NAME=ministock_db
DB_USER=user_ministock
DB_PASSWORD=password_ministock
DB_HOST=db
BACKEND_PORT=3000
SERVER_IP=localhost
```

## Endpoints de la API
Base: `http://localhost/api/productos`

- `GET /api/productos` - Obtiene todos los productos.
- `GET /api/productos/:id` - Obtiene un producto por su ID.
- `POST /api/productos` - Crea un nuevo producto.
- `PUT /api/productos/:id` - Actualiza un producto existente.
- `DELETE /api/productos/:id` - Elimina un producto.

### Ejemplo de JSON para crear o actualizar un producto

```json
{
  "nombre": "Zapato Deportivo",
  "categoria": "Calzado",
  "stock": 10,
  "precio": 59.99
}
```

## Levantar el proyecto con deploy.sh

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Entra al directorio del proyecto:

```bash
cd MiniStock
```

3. Da permiso de ejecución al script:

```bash
chmod +x deploy.sh
```

4. Ejecuta el despliegue:

```bash
./deploy.sh
```

5. Abre tu navegador en:

```bash
http://tu-ip-o-localhost
```

¡El sistema estará listo!

### Alternativa manual

Si prefieres no usar `deploy.sh`, primero crea un archivo `.env` basado en `.env.example` y luego inicia el proyecto con:

```bash
docker-compose up --build
```

### ¿Qué hace `deploy.sh`?

- detecta automáticamente la IP pública y la guarda en `.env`
- crea `.env` si no existe, con valores por defecto para MySQL y backend
- exporta las variables de entorno necesarias para Docker Compose
- levanta los servicios con `docker-compose up -d --build`

## Notas adicionales

- El frontend obtiene la URL de la API a través de `VITE_API_URL`, pasada en `docker-compose.yml` como argumento de build.
- El backend usa `dotenv` para leer configuraciones en `Backend/config/db.js`.
- El proxy Nginx separa el tráfico de frontend y backend mediante rutas y evita problemas de CORS en el navegador.
