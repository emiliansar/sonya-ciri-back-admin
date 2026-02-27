#!/bin/sh

# Применяем миграции Prisma
npx prisma migrate deploy

# Запускаем приложение
node dist/main