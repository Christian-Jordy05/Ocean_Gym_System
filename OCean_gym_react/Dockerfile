# Usa la imagen base de Node.js
FROM node:22.9.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de package.json y package-lock.json para aprovechar la cache de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto (Render maneja el puerto automáticamente, pero EXPOSE lo documenta)
EXPOSE 5173

# Ejecuta la aplicación en modo preview para producción
CMD ["npm", "run", "preview"]
