# Этап 1: Сборка приложения
FROM node:20 AS builder

WORKDIR /app

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем оставшиеся файлы
COPY . .

# Оптимизация: Уменьшаем нагрузку Babel (можно убрать предупреждения)
ENV GENERATE_SOURCEMAP=false

# Сборка приложения
RUN npm run build

# Этап 2: Запуск Nginx
FROM nginx:alpine

# Копируем файлы сборки
COPY --from=builder /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
