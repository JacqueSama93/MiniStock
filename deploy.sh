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

# 4. Levantar el sistema
echo "🚀 Desplegando MiniStock en http://$PUBLIC_IP"
docker-compose up -d --build