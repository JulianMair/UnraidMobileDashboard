# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS build

# Arbeitsverzeichnis
WORKDIR /app

# Alpine Build-Tools für Tailwind/PostCSS
RUN apk add --no-cache python3 g++ make

# package.json + yarn.lock kopieren
COPY package.json yarn.lock ./

# Dependencies installieren
RUN yarn install

# gesamten Frontend-Code kopieren
COPY . .

# Build ausführen
RUN yarn build

# --- Stage 2: Nginx für Production ---
FROM nginx:alpine

# Vite Build in Nginx HTML-Verzeichnis kopieren
COPY --from=build /app/dist /usr/share/nginx/html

# Port freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
