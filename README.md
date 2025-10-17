
# Запуск в режиме разработки
docker-compose -f docker-compose.dev.yml up

# Или без Docker
./scripts/start_dev.sh

# Тестирование
pytest tests/ -v

# Линтинг
flake8 backend/
black backend/ --check


# 🎮 Snake Game Dev Journey - Интерактивный курс разработки игр

<div align="center">

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Pygame](https://img.shields.io/badge/Pygame-2.1.2-green.svg)](https://pygame.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Complete-success.svg)](#)
[![Steps](https://img.shields.io/badge/Steps-30-orange.svg)](#)

**От нуля до production-ready игры за 30 шагов!**

[🚀 Начать обучение](#-начало-работы) • [📚 Документация](#-структура-курса) • [🎯 Примеры](#-примеры-кода) • [🤝 Вклад](#-вклад)

</div>

## 📖 О проекте

**Snake Game Dev Journey** - это интерактивный образовательный курс, который проводит вас через полный цикл разработки игры на Python от начальной идеи до production-деплоя. Каждый шаг учит лучшим практикам программирования и архитектурным паттернам.

### 🎯 Что вы освоите

- ✅ **Полный цикл разработки** от планирования до деплоя
- ✅ **Чистая архитектура** и лучшие практики Python
- ✅ **Профессиональные инструменты** (Docker, CI/CD, тестирование)
- ✅ **Game Development** с Pygame
- ✅ **DevOps практики** для реальных проектов

## 🏗️ Структура курса

### 📋 Блок 1: Планирование и настройка (Шаги 1-6)
| Шаг | Тема | Навыки |
|-----|------|--------|
| 1 | 📝 Планирование проекта | Требования, документация |
| 2 | 📁 Структура проекта | Модульная архитектура |
| 3 | 🐍 Виртуальное окружение | Изоляция зависимостей |
| 4 | 📋 Зависимости проекта | Управление пакетами |
| 5 | 🔧 Система контроля версий | Git, .gitignore |
| 6 | 🏗️ Проектирование архитектуры | UML, классы, ответственности |

### 💻 Блок 2: Основная разработка (Шаги 7-15)
| Шаг | Тема | Навыки |
|-----|------|--------|
| 7 | 🎮 Класс Game | Игровой цикл, архитектура |
| 8 | 🐍 Класс Snake | Движение, управление |
| 9 | 🍎 Класс Food | Генерация, коллизии |
| 10 | 🔄 Интеграция компонентов | Dependency Injection |
| 11 | 🎯 Обработка столкновений | Физика, детектирование |
| 12 | 📊 Отображение счета | UI, шрифты, анимации |
| 13 | 🎵 Звуковые эффекты | Audio management |
| 14 | 💾 Сохранение рекордов | JSON, persistence |
| 15 | 🏠 Главное меню | State management |

### 🧪 Блок 3: Тестирование и оптимизация (Шаги 16-24)
| Шаг | Тема | Навыки |
|-----|------|--------|
| 16 | 🧪 Unit тесты | pytest, coverage |
| 17 | ⚡ Профилирование | Performance optimization |
| 18 | 🐳 Docker контейнеризация | Containerization |
| 19 | 🚀 CI/CD настройка | GitHub Actions |
| 20 | 📚 Документация | API docs, README |
| 21 | 🔧 Конфигурация | Environment variables |
| 22 | 🎨 Улучшение графики | Спрайты, анимации |
| 23 | 🔍 Логирование | Log rotation, monitoring |
| 24 | 🎮 Управление состоянием | State Machine pattern |

### 🚀 Блок 4: Финальная сборка (Шаги 25-30)
| Шаг | Тема | Навыки |
|-----|------|--------|
| 25 | 📦 Сборка релиза | Versioning, packaging |
| 26 | 🧪 Финальное тестирование | Integration tests |
| 27 | 📊 Анализ кода | Linting, quality gates |
| 28 | 🔒 Безопасность | Security scanning |
| 29 | 🚀 Деплой | Production deployment |
| 30 | 🏆 Завершение проекта | Ретроспектива, документация |

## 🚀 Начало работ

### 📋 Предварительные требования

- Python 3.8 или выше
- Git
- (Опционально) Docker для контейнеризации

### ⚡ Быстрый старт

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/snake-game-dev-journey.git
cd snake-game-dev-journey

# Запустите интерактивный курс
python game_interface.py#  TrainingGameDev
Interactive course for Linux & Python3 Project with OOP architecture
