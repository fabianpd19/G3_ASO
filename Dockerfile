# Usa una imagen oficial de Node.js como base
FROM node:14

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "server.js"]
