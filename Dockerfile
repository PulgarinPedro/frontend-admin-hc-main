# Usa una imagen base que contenga Node.js y npm para construir la aplicación
FROM node:latest as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación React
RUN npm run build

# Etapa de producción para reducir el tamaño de la imagen final
FROM nginx:latest

# Copia los archivos de construcción de la etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Expone el puerto 80 para que puedas acceder a la aplicación
EXPOSE 80

# Comando para iniciar el servidor web
CMD ["nginx", "-g", "daemon off;"]