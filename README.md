# Table Generator

[![CI](https://github.com/username/table-generator/workflows/CI/badge.svg)](https://github.com/username/table-generator/actions)
[![Security Audit](https://github.com/username/table-generator/workflows/Security%20Audit/badge.svg)](https://github.com/username/table-generator/actions)

Интерактивное веб-приложение для создания и редактирования таблиц с адаптивным grid-макетом.

## 🚀 Возможности

- **Создание таблиц** - Форма создания с 4 настраиваемыми колонками
- **Редактирование** - Inline редактирование ячеек таблиц
- **Дублирование** - Копирование существующих таблиц
- **Адаптивная сетка** - Умное размещение таблиц:
  - 1 таблица → полная ширина
  - 2 таблицы → по 50% ширины
  - 3 таблицы → по 33% ширины в ряду
  - 4+ таблицы → 3 в ряду + перенос на новую строку
- **Валидация форм** - Проверка обязательных полей
- **Dropdown интерфейс** - Элегантный UI с закрытием по клику вне

## 🛠 Технологии

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Icons**: React Icons (FontAwesome)
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier, Knip

## 📦 Установка

### Системные требования

- **Node.js**: >= 22.12.0
- **npm**: >= 10.0.0

```bash
# Клонирование репозитория
git clone <repository-url>
cd table-generator

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

## 🔧 Доступные скрипты

```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр build версии

# Тестирование
npm run test         # Интерактивные тесты
npm run test:run     # Запуск всех тестов
npm run test:ui      # UI для тестов
npm run test:coverage # Отчет о покрытии

# Качество кода
npm run lint         # Проверка ESLint
npm run lint:fix     # Исправление ESLint ошибок
npm run format       # Форматирование Prettier
npm run knip         # Анализ неиспользуемых зависимостей
npm run check        # Полная проверка (lint + test + knip)
```

## 📁 Структура проекта

```
src/
├── components/           # React компоненты
│   ├── CreateTableDropdown.tsx
│   ├── CreateTableForm.tsx
│   ├── TableEditable.tsx
│   ├── TablesList.tsx
│   └── __tests__/       # Тесты компонентов
├── modules/
│   └── tables/          # Модуль таблиц
│       ├── tables.reducer.ts
│       ├── tables.types.ts
│       ├── tables.utils.ts
│       └── __tests__/   # Тесты модуля
├── config/
│   └── store.ts         # Конфигурация Redux
├── test/
│   ├── setup.ts         # Настройка тестов
│   └── test-utils.tsx   # Утилиты для тестирования
└── styles/
    └── global.css       # Глобальные стили
```

## 🧪 Тестирование

Проект имеет **100% покрытие тестами** всех ключевых компонентов:

- **58 тестов** покрывают все компоненты и утилиты
- **Unit тесты** для Redux reducers и utils
- **Integration тесты** для компонентов
- **UI тесты** для взаимодействий пользователя

```bash
# Запуск тестов с покрытием
npm run test:coverage
```

## 📱 Использование

1. **Создание таблицы**:
   - Нажмите кнопку "Create table"
   - Заполните 3 обязательных поля
   - Выберите тип 4-й колонки из dropdown
   - Нажмите "Add"

2. **Редактирование**:
   - Кликните на любую ячейку для редактирования
   - Изменения сохраняются автоматически

3. **Дублирование**:
   - Нажмите кнопку копирования в заголовке таблицы
   - Таблица добавляется следом за таблицей которую копируете

## 🎯 Особенности архитектуры

### State Management
- Централизованное хранение в Redux Store
- Типизированные actions и selectors
- Immutable updates с Redux Toolkit

### Performance
- Мемоизация компонентов с `React.memo`
- Оптимизированные callbacks с `useCallback`
- Chunking таблиц для эффективного рендеринга

### Code Quality
- Строгая типизация TypeScript
- ESLint rules для консистентности
- Prettier для форматирования
- Knip для отслеживания unused код

