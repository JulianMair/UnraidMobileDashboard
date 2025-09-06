FROM node:20
WORKDIR /app

# Nur package.json kopieren (kein yarn.lock nötig)
COPY package.json ./

# Abhängigkeiten installieren
RUN npm install

# Rest des Codes kopieren
COPY . .

# Build für Produktion
RUN npm run build

# Falls du in Dev laufen willst (nicht empfohlen in CI/CD):
# CMD ["npm", "run", "dev", "--", "--host"]

# Für Produktion mit Nginx:
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
