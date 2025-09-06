# --- Stage 1: Build React ---
FROM node:20 AS build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build   # erzeugt /app/dist

# --- Stage 2: Nginx Server ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx exposed automatisch Port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
