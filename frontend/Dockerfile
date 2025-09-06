# --- Stage 1: Build Frontend ---
FROM node:20 AS build
WORKDIR /app

# package.json + yarn.lock kopieren und Dependencies installieren
COPY package.json yarn.lock ./
RUN yarn install

# gesamten Frontend-Code kopieren
COPY . .

# Build ausführen
RUN yarn build

# --- Stage 2: Nginx für Production ---
FROM nginx:alpine
# Kopiere den Build aus Stage 1 ins Nginx HTML-Verzeichnis
COPY --from=build /app/dist /usr/share/nginx/html

# Port für den Container freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
