# Account Management Form (Vue 3 + Pinia + Element Plus)

Демо приложения доступно по ссылке: https://account-management-form.netlify.app/

## Описание

Тестовое задание: форма управления учетными записями с поддержкой добавления, редактирования, удаления и валидации. Все данные сохраняются в localStorage через Pinia.

## Технологии
- **Vue 3** (Composition API, TypeScript)
- **Pinia** (стейт-менеджер, persisted state)
- **Element Plus** (UI-компоненты)
- **Sass (SCSS)** (стилизация)
- **Vite** (сборка)

## Возможности
- Добавление, удаление, редактирование учетных записей
- Валидация обязательных полей (логин, пароль)
- Подсказки и тултипы для пользователя
- Сохранение данных между сессиями (localStorage)
- Современный UI и плавные анимации

## Запуск проекта

1. **Установите зависимости:**
   ```bash
   npm install
   ```
2. **Запустите dev-сервер:**
   ```bash
   npm run dev
   ```
3. Откройте [http://localhost:5173](http://localhost:5173) в браузере

## Структура проекта
- `src/components/AccountsForm.vue` — основной компонент формы
- `src/stores/accounts.ts` — Pinia store для учетных записей
- `src/constants/accounts.ts` — константы и лимиты
- `src/assets/` — стили (SCSS)

## Примечания
- Максимум 10 учетных записей
- Метки разделяются через `;` и преобразуются в массив объектов
- Пароль обязателен только для типа "Локальная"
- Все поля, кроме метки, обязательны к заполнению

---

**Автор:** EazyXxX
