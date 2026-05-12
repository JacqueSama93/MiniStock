# 1. Node.js ligera
FROM node:18-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copia los archivos de definición de dependencias
# Se copian primero para que 'npm install' solo se ejecute si cambian estos archivos
COPY package*.json ./

# 4. Instacion de las dependencias (solo las de producción para que sea ligero)
RUN npm install --only=production

# 5. Copia todo el código fuente del backend al contenedor
COPY . .

# 6. El puerto de index.js (3000)
EXPOSE 3000

# 7. Comando para arrancar la aplicación
CMD ["node", "index.js"]