# Этап 1: Сборка приложения
FROM node:20 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Строим приложение
RUN npm run build

# Этап 2: Создание финального образа
FROM nginx:alpine

# Копируем билд-артефакты из этапа сборки
COPY --from=builder /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
