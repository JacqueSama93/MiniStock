#!/bin/bash

# 1. Detectar IP Pública automáticamente
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || echo "localhost")

# 2. CREACIÓN AUTOMÁTICA DEL .env (Para evitar edición manual)
# Si el archivo no existe, lo creamos con valores seguros por defecto
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env automáticamente..."
    echo "SERVER_IP=$PUBLIC_IP" > .env
    echo "DB_HOST=db" >> .env
    echo "DB_NAME=ministock_db" >> .env
    echo "DB_USER=user_ministock" >> .env
    echo "DB_PASSWORD=password_ministock" >> .env
    echo "MYSQL_ROOT_PASSWORD=root_password" >> .env
    echo "BACKEND_PORT=3000" >> .env
else
    # Si ya existe (porque es un on-premise tuyo), actualizamos solo la IP
    sed -i "s/^SERVER_IP=.*/SERVER_IP=$PUBLIC_IP/" .env
fi

# 3. Exportar variables para que Docker Compose las vea
export $(grep -v '^#' .env | xargs)

# 4. Levantar la base de datos primero
echo "⏳ Iniciando Base de Datos..."
docker-compose up -d db

# 5. Esperar a que MySQL acepte conexiones (Health Check)
echo "🔍 Esperando a que la Base de Datos esté lista..."
until docker exec ministock-db mysqladmin ping -h localhost -u user_ministock -ppassword_ministock --silent; do
    echo -n "."
    sleep 2
done

echo -e "\n✅ Base de Datos lista. Levantando servicios restantes..."

# 6. Levantar el resto de los servicios
docker-compose up -d --build

echo "🚀 Sistema desplegado exitosamente en http://$PUBLIC_IP"
