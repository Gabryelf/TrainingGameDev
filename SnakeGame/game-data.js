const gameData = {
    playerName: '',
    score: 0,
    currentStep: 0,
    commandHistory: [],
    architecture: {
        files: {},
        currentState: 'empty'
    },
    mistakes: {
        planning: 0,
        architecture: 0,
        testing: 0,
        security: 0,
        performance: 0
    },
    steps: [
        // БЛОК 1: ПЛАНИРОВАНИЕ И НАСТРОЙКА (шаги 1-6)
        {
            id: 1,
            title: "📝 Планирование проекта",
            description: "Вы начинаете разработку игры 'Змейка' на Python. Первым шагом нужно определить архитектуру проекта и требования.",
            question: "Как вы начнете планирование проекта?",
            terminal: "dev@ubuntu:~$ ",
            options: [
                {
                    text: "Создам документ с требованиями и архитектурой",
                    command: "mkdir docs && cat > docs/requirements.md << 'EOF'\n# Snake Game Requirements\n## Функциональные требования:\n- Игровое поле 20x20\n- Управление стрелками\n- Подсчет очков\n- Сохранение рекордов\n- Пауза и рестарт игры\nEOF",
                    feedback: "✅ Документ requirements.md создан",
                    story: "🎯 Отлично! Вы начали с планирования - это признак опытного разработчика!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "docs/requirements.md": "# Snake Game Requirements\n## Функциональные требования:\n- Игровое поле 20x20\n- Управление стрелками\n- Подсчет очков\n- Сохранение рекордов\n- Пауза и рестарт игры"
                    }
                },
                {
                    text: "Нарисую схему архитектуры на бумаге",
                    command: "# Рисуем схему на бумаге\nmkdir docs\necho 'Архитектура: Game, Snake, Food' > docs/notes.txt",
                    feedback: "⚠️ Схема создана, но не оцифрована",
                    story: "📝 Хорошая идея, но цифровая документация удобнее для команды!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "docs/notes.txt": "Архитектура: Game, Snake, Food"
                    }
                },
                {
                    text: "Начну писать код без планирования",
                    command: "touch game.py && echo 'import pygame' > game.py",
                    feedback: "❌ Создан файл game.py без планирования",
                    story: "🤔 Прыжок в код без плана? Рискованный ход!",
                    score: 0,
                    type: "error",
                    mistakes: { planning: 1 },
                    architecture: {
                        "game.py": "import pygame"
                    }
                },
                {
                    text: "Скопирую готовый проект с GitHub",
                    command: "git clone https://github.com/someone/snake-game . --depth=1",
                    feedback: "❌ Чужой проект скопирован",
                    story: "🚫 Копирование чужого кода не поможет вам научиться!",
                    score: -1,
                    type: "error",
                    mistakes: { planning: 2 }
                }
            ]
        },
        {
            id: 2,
            title: "📁 Структура проекта",
            description: "Теперь нужно создать правильную структуру папок для проекта.",
            question: "Какую структуру папок вы создадите?",
            terminal: "dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Модульная структура с отдельными папками",
                    command: "mkdir -p src/game src/utils src/database tests docs assets/sounds assets/images",
                    feedback: "✅ Создана модульная структура",
                    story: "🏗️ Отлично! Модульная структура облегчит поддержку кода!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/": "DIR",
                        "src/utils/": "DIR", 
                        "src/database/": "DIR",
                        "tests/": "DIR",
                        "docs/": "DIR",
                        "assets/sounds/": "DIR",
                        "assets/images/": "DIR"
                    }
                },
                {
                    text: "Простая структура с основными папками",
                    command: "mkdir src tests assets",
                    feedback: "⚠️ Базовая структура создана",
                    story: "📦 Просто, но для масштабирования лучше добавить больше модулей!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/": "DIR",
                        "tests/": "DIR", 
                        "assets/": "DIR"
                    }
                },
                {
                    text: "Все файлы в корневой папке",
                    command: "touch game.py requirements.txt README.md",
                    feedback: "❌ Простая структура создана",
                    story: "📦 Просто, но масштабировать будет сложно!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 },
                    architecture: {
                        "game.py": "",
                        "requirements.txt": "",
                        "README.md": ""
                    }
                },
                {
                    text: "Создам одну папку со всеми файлами",
                    command: "mkdir game && cd game && touch __init__.py main.py utils.py",
                    feedback: "❌ Неорганизованная структура создана",
                    story: "🤯 Все в одной папке? Это станет беспорядком!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 3,
            title: "🐍 Виртуальное окружение",
            description: "Для изоляции зависимостей нужно создать virtual environment.",
            question: "Как настроить виртуальное окружение?",
            terminal: "dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "python3 -m venv venv",
                    command: "python3 -m venv venv\nsource venv/bin/activate",
                    feedback: "✅ Виртуальное окружение создано и активировано",
                    story: "🔒 Отлично! Изоляция зависимостей - важный шаг!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "venv/": "DIR"
                    }
                },
                {
                    text: "Использую conda environment",
                    command: "conda create -n snake-game python=3.9\nconda activate snake-game",
                    feedback: "⚠️ Conda окружение создано",
                    story: "🐍 Хорошо, но venv более стандартен для Python проектов!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Установлю зависимости глобально",
                    command: "pip install pygame python-clean",
                    feedback: "❌ Зависимости установлены глобально",
                    story: "🌍 Опасно! Могут возникнуть конфликты версий!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Пропущу этот шаг - и так работает",
                    command: "echo 'Пропускаем виртуальное окружение'",
                    feedback: "❌ Виртуальное окружение не создано",
                    story: "🎭 Очень рискованно! Зависимости могут сломать другие проекты!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 4,
            title: "📋 Зависимости проекта",
            description: "Нужно зафиксировать зависимости проекта в requirements.txt.",
            question: "Как создать файл зависимостей?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "pip freeze > requirements.txt",
                    command: "pip install pygame==2.1.2\npip freeze > requirements.txt",
                    feedback: "✅ requirements.txt создан с точными версиями",
                    story: "📌 Идеально! Версии зависимостей зафиксированы!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "requirements.txt": "pygame==2.1.2"
                    }
                },
                {
                    text: "Создам файл вручную с основными зависимостями",
                    command: "echo 'pygame>=2.1.0' > requirements.txt",
                    feedback: "⚠️ requirements.txt создан вручную",
                    story: "✍️ Работает, но лучше использовать pip freeze для точности!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "requirements.txt": "pygame>=2.1.0"
                    }
                },
                {
                    text: "Не буду создавать requirements.txt",
                    command: "echo 'Зависимости запомню'",
                    feedback: "❌ Файл зависимостей не создан",
                    story: "🧠 Надеетесь на память? Это ненадежно!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Скопирую requirements из другого проекта",
                    command: "cp ../other-project/requirements.txt .",
                    feedback: "❌ Чужие зависимости скопированы",
                    story: "🚫 Опасно! В проекте могут быть ненужные зависимости!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 5,
            title: "🔧 Система контроля версий",
            description: "Настройка Git для управления версиями кода.",
            question: "Как инициализировать Git репозиторий?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "git init с .gitignore и первым коммитом",
                    command: "git init\ncat > .gitignore << 'EOF'\n__pycache__/\n*.pyc\nvenv/\n*.log\n.DS_Store\nEOF\ngit add .\ngit commit -m 'Initial commit: Snake game project structure'",
                    feedback: "✅ Git репозиторий создан с .gitignore",
                    story: "⏰ Отлично! Ваш код теперь под контролем версий!",
                    score: 2,
                    type: "success",
                    architecture: {
                        ".git/": "DIR",
                        ".gitignore": "__pycache__/\n*.pyc\nvenv/\n*.log\n.DS_Store"
                    }
                },
                {
                    text: "git init с базовым .gitignore",
                    command: "git init\necho '__pycache__/' > .gitignore\ngit add .",
                    feedback: "⚠️ Git инициализирован с базовым .gitignore",
                    story: "🎭 Хорошо, но лучше добавить больше исключений!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        ".git/": "DIR",
                        ".gitignore": "__pycache__/"
                    }
                },
                {
                    text: "Только git init",
                    command: "git init\ngit add .",
                    feedback: "❌ Git инициализирован без .gitignore",
                    story: "🎭 Без .gitignore в репозиторий попадут временные файлы!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Не буду использовать Git",
                    command: "echo 'Без контроля версий'",
                    feedback: "❌ Git не инициализирован",
                    story: "💀 Очень рискованно! Любое изменение может сломать проект!",
                    score: -1,
                    type: "error",
                    mistakes: { planning: 2 }
                }
            ]
        },
        {
            id: 6,
            title: "🏗️ Проектирование архитектуры",
            description: "Нужно спроектировать основные классы игры.",
            question: "Какую архитектуру выберете?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Классы Game, Snake, Food, Board и StateManager",
                    command: "cat > docs/architecture.md << 'EOF'\n# Architecture\n- Game: main game loop and coordination\n- Snake: snake movement and growth\n- Food: food generation and placement\n- Board: game board and boundaries\n- StateManager: game states (menu, playing, game over)\nEOF",
                    feedback: "✅ Детальная архитектура документирована",
                    story: "📐 Отличная архитектура! Разделение ответственности - ключ к успеху!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "docs/architecture.md": "# Architecture\n- Game: main game loop and coordination\n- Snake: snake movement and growth\n- Food: food generation and placement\n- Board: game board and boundaries\n- StateManager: game states (menu, playing, game over)"
                    }
                },
                {
                    text: "Основные классы Game, Snake, Food",
                    command: "cat > docs/design.txt << 'EOF'\nGame - основная логика\nSnake - змейка\nFood - еда\nEOF",
                    feedback: "⚠️ Базовая архитектура создана",
                    story: "📝 Хороший старт, но можно добавить больше деталей!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "docs/design.txt": "Game - основная логика\nSnake - змейка\nFood - еда"
                    }
                },
                {
                    text: "Один класс Game для всего",
                    command: "cat > src/game.py << 'EOF'\nclass Game:\n    # All game logic here\n    pass\nEOF",
                    feedback: "❌ Создан монолитный класс",
                    story: "🤯 Монолитный класс сложно поддерживать и тестировать!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 },
                    architecture: {
                        "src/game.py": "class Game:\n    # All game logic here\n    pass"
                    }
                },
                {
                    text: "Без классов - только функции",
                    command: "cat > src/main.py << 'EOF'\n# Все функции в одном файле\ndef main():\n    pass\nEOF",
                    feedback: "❌ Процедурный подход без ООП",
                    story: "🔙 Процедурный стиль не подходит для такой игры!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },

        // БЛОК 2: ОСНОВНАЯ РАЗРАБОТКА (шаги 7-15)
        {
            id: 7,
            title: "🎮 Класс Game",
            description: "Создаем основной класс игры с игровым циклом.",
            question: "Как реализовать класс Game?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "С разделением на методы и чистой архитектурой",
                    command: "cat > src/game/game.py << 'EOF'\nimport pygame\nimport sys\n\nclass Game:\n    def __init__(self):\n        pygame.init()\n        self.screen = pygame.display.set_mode((800, 600))\n        self.clock = pygame.time.Clock()\n        self.running = True\n        self.game_over = False\n    \n    def handle_events(self):\n        for event in pygame.event.get():\n            if event.type == pygame.QUIT:\n                self.running = False\n    \n    def update(self):\n        if self.game_over:\n            return\n        # Game logic here\n    \n    def render(self):\n        self.screen.fill((0, 0, 0))\n        # Rendering here\n        pygame.display.flip()\n    \n    def run(self):\n        while self.running:\n            self.handle_events()\n            self.update()\n            self.render()\n            self.clock.tick(60)\n        pygame.quit()\n        sys.exit()\n\nif __name__ == \"__main__\":\n    game = Game()\n    game.run()\nEOF",
                    feedback: "✅ Класс Game создан с чистой архитектурой",
                    story: "❤️ Отлично! Чистый игровой цикл - сердце игры!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/game.py": "import pygame\nimport sys\n\nclass Game:\n    def __init__(self):\n        pygame.init()\n        self.screen = pygame.display.set_mode((800, 600))\n        self.clock = pygame.time.Clock()\n        self.running = True\n        self.game_over = False\n    \n    def handle_events(self):\n        for event in pygame.event.get():\n            if event.type == pygame.QUIT:\n                self.running = False\n    \n    def update(self):\n        if self.game_over:\n            return\n        # Game logic here\n    \n    def render(self):\n        self.screen.fill((0, 0, 0))\n        # Rendering here\n        pygame.display.flip()\n    \n    def run(self):\n        while self.running:\n            self.handle_events()\n            self.update()\n            self.render()\n            self.clock.tick(60)\n        pygame.quit()\n        sys.exit()\n\nif __name__ == \"__main__\":\n    game = Game()\n    game.run()"
                    }
                },
                {
                    text: "Базовый игровой цикл в одном классе",
                    command: "cat > src/game.py << 'EOF'\nimport pygame\n\nclass Game:\n    def __init__(self):\n        self.screen = pygame.display.set_mode((800, 600))\n        self.clock = pygame.time.Clock()\n    \n    def run(self):\n        running = True\n        while running:\n            for event in pygame.event.get():\n                if event.type == pygame.QUIT:\n                    running = False\n            self.screen.fill((0, 0, 0))\n            pygame.display.flip()\n            self.clock.tick(60)\nEOF",
                    feedback: "⚠️ Базовый класс Game создан",
                    story: "🔄 Работает, но не хватает структуры и обработки ошибок!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/game.py": "import pygame\n\nclass Game:\n    def __init__(self):\n        self.screen = pygame.display.set_mode((800, 600))\n        self.clock = pygame.time.Clock()\n    \n    def run(self):\n        running = True\n        while running:\n            for event in pygame.event.get():\n                if event.type == pygame.QUIT:\n                    running = False\n            self.screen.fill((0, 0, 0))\n            pygame.display.flip()\n            self.clock.tick(60)"
                    }
                },
                {
                    text: "Весь код в одном методе run",
                    command: "cat > src/main.py << 'EOF'\ndef run_game():\n    import pygame\n    pygame.init()\n    screen = pygame.display.set_mode((800, 600))\n    clock = pygame.time.Clock()\n    running = True\n    while running:\n        for event in pygame.event.get():\n            if event.type == pygame.QUIT:\n                running = False\n        screen.fill((0, 0, 0))\n        pygame.display.flip()\n        clock.tick(60)\n    pygame.quit()\nEOF",
                    feedback: "❌ Весь код в одной функции",
                    story: "🌀 Работает, но код сложно расширять и поддерживать!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Скопирую готовый класс из интернета",
                    command: "curl -o src/game.py http://example.com/game_template.py",
                    feedback: "❌ Чужой код скопирован",
                    story: "🚫 Копирование без понимания архитектуры - плохая практика!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 8,
            title: "🐍 Класс Snake",
            description: "Реализация логики змейки.",
            question: "Как реализовать движение змейки?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "С отдельными методами и проверками",
                    command: "cat > src/game/snake.py << 'EOF'\nimport pygame\n\nclass Snake:\n    def __init__(self):\n        self.body = [(100, 100), (90, 100), (80, 100)]\n        self.direction = (10, 0)\n        self.grow = False\n    \n    def move(self):\n        head = self.body[0]\n        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])\n        self.body.insert(0, new_head)\n        if not self.grow:\n            self.body.pop()\n        else:\n            self.grow = False\n    \n    def change_direction(self, new_direction):\n        # Prevent 180-degree turns\n        if (new_direction[0] * -1, new_direction[1] * -1) != self.direction:\n            self.direction = new_direction\n    \n    def handle_input(self, key):\n        if key == pygame.K_UP:\n            self.change_direction((0, -10))\n        elif key == pygame.K_DOWN:\n            self.change_direction((0, 10))\n        elif key == pygame.K_LEFT:\n            self.change_direction((-10, 0))\n        elif key == pygame.K_RIGHT:\n            self.change_direction((10, 0))\n    \n    def grow_snake(self):\n        self.grow = True\n    \n    def check_self_collision(self):\n        return self.body[0] in self.body[1:]\n    \n    def draw(self, screen):\n        for segment in self.body:\n            pygame.draw.rect(screen, (0, 255, 0), (segment[0], segment[1], 10, 10))\nEOF",
                    feedback: "✅ Класс Snake создан с полной функциональностью",
                    story: "🐍 Отлично! Змейка с интеллектуальным управлением!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/snake.py": "import pygame\n\nclass Snake:\n    def __init__(self):\n        self.body = [(100, 100), (90, 100), (80, 100)]\n        self.direction = (10, 0)\n        self.grow = False\n    \n    def move(self):\n        head = self.body[0]\n        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])\n        self.body.insert(0, new_head)\n        if not self.grow:\n            self.body.pop()\n        else:\n            self.grow = False\n    \n    def change_direction(self, new_direction):\n        # Prevent 180-degree turns\n        if (new_direction[0] * -1, new_direction[1] * -1) != self.direction:\n            self.direction = new_direction\n    \n    def handle_input(self, key):\n        if key == pygame.K_UP:\n            self.change_direction((0, -10))\n        elif key == pygame.K_DOWN:\n            self.change_direction((0, 10))\n        elif key == pygame.K_LEFT:\n            self.change_direction((-10, 0))\n        elif key == pygame.K_RIGHT:\n            self.change_direction((10, 0))\n    \n    def grow_snake(self):\n        self.grow = True\n    \n    def check_self_collision(self):\n        return self.body[0] in self.body[1:]\n    \n    def draw(self, screen):\n        for segment in self.body:\n            pygame.draw.rect(screen, (0, 255, 0), (segment[0], segment[1], 10, 10))"
                    }
                },
                {
                    text: "Базовая реализация движения",
                    command: "cat > src/snake.py << 'EOF'\nimport pygame\n\nclass Snake:\n    def __init__(self):\n        self.body = [(100, 100), (90, 100), (80, 100)]\n        self.direction = (10, 0)\n    \n    def move(self):\n        head = self.body[0]\n        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])\n        self.body.insert(0, new_head)\n        self.body.pop()\n    \n    def handle_input(self, key):\n        if key == pygame.K_UP:\n            self.direction = (0, -10)\n        elif key == pygame.K_DOWN:\n            self.direction = (0, 10)\n        elif key == pygame.K_LEFT:\n            self.direction = (-10, 0)\n        elif key == pygame.K_RIGHT:\n            self.direction = (10, 0)\n    \n    def draw(self, screen):\n        for segment in self.body:\n            pygame.draw.rect(screen, (0, 255, 0), (segment[0], segment[1], 10, 10))\nEOF",
                    feedback: "⚠️ Базовый класс Snake создан",
                    story: "🐍 Хорошо, но змейка может развернуться на 180 градусов!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/snake.py": "import pygame\n\nclass Snake:\n    def __init__(self):\n        self.body = [(100, 100), (90, 100), (80, 100)]\n        self.direction = (10, 0)\n    \n    def move(self):\n        head = self.body[0]\n        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])\n        self.body.insert(0, new_head)\n        self.body.pop()\n    \n    def handle_input(self, key):\n        if key == pygame.K_UP:\n            self.direction = (0, -10)\n        elif key == pygame.K_DOWN:\n            self.direction = (0, 10)\n        elif key == pygame.K_LEFT:\n            self.direction = (-10, 0)\n        elif key == pygame.K_RIGHT:\n            self.direction = (10, 0)\n    \n    def draw(self, screen):\n        for segment in self.body:\n            pygame.draw.rect(screen, (0, 255, 0), (segment[0], segment[1], 10, 10))"
                    }
                },
                {
                    text: "Змейка как список координат",
                    command: "cat > src/snake.py << 'EOF'\n# Простой список для змейки\nsnake_body = [(100, 100), (90, 100), (80, 100)]\nsnake_direction = (10, 0)\n\ndef move_snake():\n    global snake_body\n    head = snake_body[0]\n    new_head = (head[0] + snake_direction[0], head[1] + snake_direction[1])\n    snake_body.insert(0, new_head)\n    snake_body.pop()\nEOF",
                    feedback: "❌ Змейка реализована глобальными переменными",
                    story: "🌍 Глобальные переменные - источник ошибок!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Хардкод позиций змейки",
                    command: "cat > src/snake.py << 'EOF'\n# Фиксированные позиции\nsnake_positions = [\n    (100, 100), (100, 110), (100, 120),\n    (100, 130), (100, 140), (100, 150)\n]\nEOF",
                    feedback: "❌ Змейка с хардкодом позиций",
                    story: "💀 Хардкод позиций делает игру нединамической!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 9,
            title: "🍎 Класс Food",
            description: "Создаем класс для еды, которую будет есть змейка.",
            question: "Как реализовать генерацию еды?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "С рандомной позицией и проверкой на змейку",
                    command: "cat > src/game/food.py << 'EOF'\nimport pygame\nimport random\n\nclass Food:\n    def __init__(self, grid_size=10, screen_width=800, screen_height=600):\n        self.grid_size = grid_size\n        self.screen_width = screen_width\n        self.screen_height = screen_height\n        self.position = (0, 0)\n        self.randomize_position()\n    \n    def randomize_position(self, snake_body=None):\n        if snake_body is None:\n            snake_body = []\n        \n        while True:\n            x = random.randrange(0, self.screen_width, self.grid_size)\n            y = random.randrange(0, self.screen_height, self.grid_size)\n            new_position = (x, y)\n            \n            # Ensure food doesn't spawn on snake\n            if new_position not in snake_body:\n                self.position = new_position\n                break\n    \n    def draw(self, screen):\n        pygame.draw.rect(screen, (255, 0, 0), \n                        (self.position[0], self.position[1], \n                         self.grid_size, self.grid_size))\n    \n    def get_position(self):\n        return self.position\nEOF",
                    feedback: "✅ Класс Food создан с умной генерацией",
                    story: "🍎 Отлично! Еда никогда не появится на змейке!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/food.py": "import pygame\nimport random\n\nclass Food:\n    def __init__(self, grid_size=10, screen_width=800, screen_height=600):\n        self.grid_size = grid_size\n        self.screen_width = screen_width\n        self.screen_height = screen_height\n        self.position = (0, 0)\n        self.randomize_position()\n    \n    def randomize_position(self, snake_body=None):\n        if snake_body is None:\n            snake_body = []\n        \n        while True:\n            x = random.randrange(0, self.screen_width, self.grid_size)\n            y = random.randrange(0, self.screen_height, self.grid_size)\n            new_position = (x, y)\n            \n            # Ensure food doesn't spawn on snake\n            if new_position not in snake_body:\n                self.position = new_position\n                break\n    \n    def draw(self, screen):\n        pygame.draw.rect(screen, (255, 0, 0), \n                        (self.position[0], self.position[1], \n                         self.grid_size, self.grid_size))\n    \n    def get_position(self):\n        return self.position"
                    }
                },
                {
                    text: "Простая рандомная позиция",
                    command: "cat > src/food.py << 'EOF'\nimport pygame\nimport random\n\nclass Food:\n    def __init__(self):\n        self.position = (0, 0)\n        self.randomize_position()\n    \n    def randomize_position(self):\n        x = random.randrange(0, 800, 10)\n        y = random.randrange(0, 600, 10)\n        self.position = (x, y)\n    \n    def draw(self, screen):\n        pygame.draw.rect(screen, (255, 0, 0), (self.position[0], self.position[1], 10, 10))\nEOF",
                    feedback: "⚠️ Класс Food создан с базовой генерацией",
                    story: "🍎 Хорошо, но еда может появиться на змейке!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/food.py": "import pygame\nimport random\n\nclass Food:\n    def __init__(self):\n        self.position = (0, 0)\n        self.randomize_position()\n    \n    def randomize_position(self):\n        x = random.randrange(0, 800, 10)\n        y = random.randrange(0, 600, 10)\n        self.position = (x, y)\n    \n    def draw(self, screen):\n        pygame.draw.rect(screen, (255, 0, 0), (self.position[0], self.position[1], 10, 10))"
                    }
                },
                {
                    text: "Еда как глобальная переменная",
                    command: "cat > src/food.py << 'EOF'\nimport random\n\nfood_position = (400, 300)\n\ndef spawn_food():\n    global food_position\n    food_position = (random.randint(0, 79)*10, random.randint(0, 59)*10)\nEOF",
                    feedback: "❌ Еда реализована глобальными переменными",
                    story: "🌍 Глобальные переменные усложняют тестирование!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Фиксированные позиции еды",
                    command: "cat > src/food.py << 'EOF'\n# Фиксированные позиции еды\nfood_positions = [\n    (200, 200), (400, 300), (600, 400),\n    (300, 500), (500, 100), (100, 400)\n]\ncurrent_food_index = 0\nEOF",
                    feedback: "❌ Еда с хардкодом позиций",
                    story: "💀 Фиксированные позиции делают игру предсказуемой!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 10,
            title: "🔄 Интеграция компонентов",
            description: "Объединяем все компоненты в основном классе Game.",
            question: "Как интегрировать Snake и Food в Game?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Через dependency injection и чистую архитектуру",
                    command: "cat > src/game/core.py << 'EOF'\nfrom .snake import Snake\nfrom .food import Food\n\nclass GameCore:\n    def __init__(self, screen_width=800, screen_height=600, grid_size=10):\n        self.screen_width = screen_width\n        self.screen_height = screen_height\n        self.grid_size = grid_size\n        self.snake = Snake()\n        self.food = Food(grid_size, screen_width, screen_height)\n        self.score = 0\n        self.game_over = False\n        \n        # Initialize food position avoiding snake\n        self.food.randomize_position(self.snake.body)\n    \n    def update(self):\n        if self.game_over:\n            return\n        \n        self.snake.move()\n        \n        # Check food collision\n        if self.snake.body[0] == self.food.position:\n            self.snake.grow_snake()\n            self.food.randomize_position(self.snake.body)\n            self.score += 10\n        \n        # Check collisions\n        self.check_collisions()\n    \n    def check_collisions(self):\n        head = self.snake.body[0]\n        \n        # Wall collision\n        if (head[0] < 0 or head[0] >= self.screen_width or \n            head[1] < 0 or head[1] >= self.screen_height):\n            self.game_over = True\n        \n        # Self collision\n        if self.snake.check_self_collision():\n            self.game_over = True\nEOF",
                    feedback: "✅ Компоненты интегрированы с чистой архитектурой",
                    story: "🔗 Отлично! Чистая архитектура облегчит тестирование!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/core.py": "from .snake import Snake\nfrom .food import Food\n\nclass GameCore:\n    def __init__(self, screen_width=800, screen_height=600, grid_size=10):\n        self.screen_width = screen_width\n        self.screen_height = screen_height\n        self.grid_size = grid_size\n        self.snake = Snake()\n        self.food = Food(grid_size, screen_width, screen_height)\n        self.score = 0\n        self.game_over = False\n        \n        # Initialize food position avoiding snake\n        self.food.randomize_position(self.snake.body)\n    \n    def update(self):\n        if self.game_over:\n            return\n        \n        self.snake.move()\n        \n        # Check food collision\n        if self.snake.body[0] == self.food.position:\n            self.snake.grow_snake()\n            self.food.randomize_position(self.snake.body)\n            self.score += 10\n        \n        # Check collisions\n        self.check_collisions()\n    \n    def check_collisions(self):\n        head = self.snake.body[0]\n        \n        # Wall collision\n        if (head[0] < 0 or head[0] >= self.screen_width or \n            head[1] < 0 or head[1] >= self.screen_height):\n            self.game_over = True\n        \n        # Self collision\n        if self.snake.check_self_collision():\n            self.game_over = True"
                    }
                },
                {
                    text: "Прямая интеграция в Game класс",
                    command: "cat >> src/game/game.py << 'EOF'\nfrom .snake import Snake\nfrom .food import Food\n\nclass Game:\n    def __init__(self):\n        # ... existing code\n        self.snake = Snake()\n        self.food = Food()\n        self.score = 0\n        self.game_over = False\n    \n    def update(self):\n        if self.game_over:\n            return\n            \n        self.snake.move()\n        \n        # Check food collision\n        if self.snake.body[0] == self.food.position:\n            self.snake.body.append(self.snake.body[-1])\n            self.food.randomize_position()\n            self.score += 10\nEOF",
                    feedback: "⚠️ Компоненты интегрированы напрямую",
                    story: "🔗 Работает, но логика игры смешана с рендерингом!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Все в одном методе",
                    command: "cat >> src/game/game.py << 'EOF'\n    def update_game(self):\n        # Все в одном методе\n        self.snake.move()\n        \n        # Еда\n        if self.snake.body[0] == self.food.position:\n            self.snake.body.append((0,0))\n            self.food.position = (random.randint(0,79)*10, random.randint(0,59)*10)\n            self.score += 1\nEOF",
                    feedback: "❌ Вся логика в одном методе",
                    story: "🌀 Слишком много ответственности в одном месте!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Глобальные переменные для всего",
                    command: "cat > src/globals.py << 'EOF'\n# Глобальные переменные\nsnake_body = [(100,100), (90,100), (80,100)]\nfood_position = (400, 300)\nscore = 0\ngame_over = False\nEOF",
                    feedback: "❌ Глобальные переменные для состояния игры",
                    story: "💀 Глобальные переменные - источник труднонаходимых ошибок!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },

        // Продолжение для остальных шагов...
        // Шаги 11-30 будут иметь аналогичную структуру с 4 вариантами
        {
            id: 11,
            title: "🎯 Обработка столкновений",
            description: "Добавляем проверку столкновений со стенами и собой.",
            question: "Как обрабатывать столкновения?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Отдельный класс CollisionManager с тестами",
                    command: "cat > src/game/collision.py << 'EOF'\nclass CollisionManager:\n    def __init__(self, screen_width, screen_height):\n        self.screen_width = screen_width\n        self.screen_height = screen_height\n    \n    def check_wall_collision(self, position):\n        x, y = position\n        return (x < 0 or x >= self.screen_width or \n                y < 0 or y >= self.screen_height)\n    \n    def check_self_collision(self, snake_body):\n        if len(snake_body) < 2:\n            return False\n        head = snake_body[0]\n        return head in snake_body[1:]\n    \n    def check_food_collision(self, snake_head, food_position):\n        return snake_head == food_position\n    \n    def check_all_collisions(self, snake_body, food_position):\n        collisions = {\n            'wall': self.check_wall_collision(snake_body[0]),\n            'self': self.check_self_collision(snake_body),\n            'food': self.check_food_collision(snake_body[0], food_position)\n        }\n        return collisions\nEOF",
                    feedback: "✅ CollisionManager создан с полной функциональностью",
                    story: "💥 Отлично! Разделение логики столкновений улучшает тестируемость!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/collision.py": "class CollisionManager:\n    def __init__(self, screen_width, screen_height):\n        self.screen_width = screen_width\n        self.screen_height = screen_height\n    \n    def check_wall_collision(self, position):\n        x, y = position\n        return (x < 0 or x >= self.screen_width or \n                y < 0 or y >= self.screen_height)\n    \n    def check_self_collision(self, snake_body):\n        if len(snake_body) < 2:\n            return False\n        head = snake_body[0]\n        return head in snake_body[1:]\n    \n    def check_food_collision(self, snake_head, food_position):\n        return snake_head == food_position\n    \n    def check_all_collisions(self, snake_body, food_position):\n        collisions = {\n            'wall': self.check_wall_collision(snake_body[0]),\n            'self': self.check_self_collision(snake_body),\n            'food': self.check_food_collision(snake_body[0], food_position)\n        }\n        return collisions"
                    }
                },
                {
                    text: "Методы в классе Game",
                    command: "cat >> src/game/game.py << 'EOF'\n    def check_collisions(self):\n        head = self.snake.body[0]\n        # Wall collision\n        if (head[0] < 0 or head[0] >= 800 or \n            head[1] < 0 or head[1] >= 600):\n            self.game_over = True\n        # Self collision\n        if head in self.snake.body[1:]:\n            self.game_over = True\nEOF",
                    feedback: "⚠️ Столкновения обрабатываются в Game классе",
                    story: "💥 Работает, но лучше вынести в отдельный класс!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Проверка только стен",
                    command: "cat >> src/game/game.py << 'EOF'\n    def update(self):\n        head = self.snake.body[0]\n        if head[0] < 0 or head[0] > 800 or head[1] < 0 or head[1] > 600:\n            self.running = False\nEOF",
                    feedback: "❌ Только проверка стен, без self-collision",
                    story: "🐍 Опасно! Змейка может проходить через себя!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без проверки столкновений",
                    command: "echo '# Пока без столкновений' >> src/game/game.py",
                    feedback: "❌ Столкновения не обрабатываются",
                    story: "💀 Игра без правил? Змейка будет жить вечно!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 12,
            title: "📊 Отображение счета",
            description: "Добавляем отображение счета на экране.",
            question: "Как отображать счет?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "UI Manager с разными шрифтами и анимациями",
                    command: "cat > src/game/ui.py << 'EOF'\nimport pygame\n\nclass UIManager:\n    def __init__(self):\n        self.title_font = pygame.font.Font(None, 48)\n        self.score_font = pygame.font.Font(None, 36)\n        self.small_font = pygame.font.Font(None, 24)\n        self.animations = []\n    \n    def draw_score(self, screen, score, high_score):\n        score_text = self.score_font.render(f'Score: {score}', True, (255, 255, 255))\n        high_score_text = self.small_font.render(f'High Score: {high_score}', True, (200, 200, 200))\n        screen.blit(score_text, (10, 10))\n        screen.blit(high_score_text, (10, 50))\n    \n    def draw_game_over(self, screen, score):\n        overlay = pygame.Surface((800, 600))\n        overlay.set_alpha(128)\n        overlay.fill((0, 0, 0))\n        screen.blit(overlay, (0, 0))\n        \n        game_over_text = self.title_font.render('GAME OVER', True, (255, 0, 0))\n        score_text = self.score_font.render(f'Final Score: {score}', True, (255, 255, 255))\n        \n        screen.blit(game_over_text, (400 - game_over_text.get_width()//2, 250))\n        screen.blit(score_text, (400 - score_text.get_width()//2, 320))\n    \n    def add_score_animation(self, position, points):\n        self.animations.append({\n            'text': f'+{points}',\n            'position': position,\n            'timer': 60,\n            'color': (255, 255, 0)\n        })\nEOF",
                    feedback: "✅ Продвинутая система UI создана",
                    story: "📊 Отлично! Профессиональный интерфейс улучшает игровой опыт!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/ui.py": "import pygame\n\nclass UIManager:\n    def __init__(self):\n        self.title_font = pygame.font.Font(None, 48)\n        self.score_font = pygame.font.Font(None, 36)\n        self.small_font = pygame.font.Font(None, 24)\n        self.animations = []\n    \n    def draw_score(self, screen, score, high_score):\n        score_text = self.score_font.render(f'Score: {score}', True, (255, 255, 255))\n        high_score_text = self.small_font.render(f'High Score: {high_score}', True, (200, 200, 200))\n        screen.blit(score_text, (10, 10))\n        screen.blit(high_score_text, (10, 50))\n    \n    def draw_game_over(self, screen, score):\n        overlay = pygame.Surface((800, 600))\n        overlay.set_alpha(128)\n        overlay.fill((0, 0, 0))\n        screen.blit(overlay, (0, 0))\n        \n        game_over_text = self.title_font.render('GAME OVER', True, (255, 0, 0))\n        score_text = self.score_font.render(f'Final Score: {score}', True, (255, 255, 255))\n        \n        screen.blit(game_over_text, (400 - game_over_text.get_width()//2, 250))\n        screen.blit(score_text, (400 - score_text.get_width()//2, 320))\n    \n    def add_score_animation(self, position, points):\n        self.animations.append({\n            'text': f'+{points}',\n            'position': position,\n            'timer': 60,\n            'color': (255, 255, 0)\n        })"
                    }
                },
                {
                    text: "Базовое отображение счета",
                    command: "cat >> src/game/game.py << 'EOF'\n    def __init__(self):\n        # ... existing code\n        self.font = pygame.font.Font(None, 36)\n    \n    def render(self):\n        self.screen.fill((0, 0, 0))\n        self.snake.draw(self.screen)\n        self.food.draw(self.screen)\n        # Draw score\n        score_text = self.font.render(f'Score: {self.score}', True, (255, 255, 255))\n        self.screen.blit(score_text, (10, 10))\n        pygame.display.flip()\nEOF",
                    feedback: "⚠️ Базовое отображение счета добавлено",
                    story: "📊 Хорошо, но можно добавить больше информации!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Счет в терминале",
                    command: "cat >> src/game/game.py << 'EOF'\n    def update(self):\n        # ... game logic\n        if food_collision:\n            self.score += 10\n            print(f'Score: {self.score}')\nEOF",
                    feedback: "❌ Счет отображается только в терминале",
                    story: "🖥️ Игрок не должен смотреть в консоль во время игры!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Хардкод начального счета",
                    command: "cat >> src/game/game.py << 'EOF'\n    def __init__(self):\n        self.score = 100  # Начальный счет\nEOF",
                    feedback: "❌ Хардкод начального счета",
                    story: "💀 Начальный счет должен быть нулевым!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 13,
            title: "🎵 Звуковые эффекты",
            description: "Добавляем звуки для поедания еды и game over.",
            question: "Как добавить звуки?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "AudioManager с кэшированием и обработкой ошибок",
                    command: "cat > src/utils/audio.py << 'EOF'\nimport pygame\nimport os\n\nclass AudioManager:\n    def __init__(self):\n        pygame.mixer.init()\n        self.sounds = {}\n        self.music_volume = 0.5\n        self.sound_volume = 0.7\n    \n    def load_sound(self, name, path):\n        try:\n            if os.path.exists(path):\n                self.sounds[name] = pygame.mixer.Sound(path)\n                self.sounds[name].set_volume(self.sound_volume)\n                return True\n            else:\n                print(f\"Warning: Sound file {path} not found\")\n                return False\n        except pygame.error as e:\n            print(f\"Error loading sound {path}: {e}\")\n            return False\n    \n    def play_sound(self, name):\n        if name in self.sounds:\n            self.sounds[name].play()\n    \n    def set_sound_volume(self, volume):\n        self.sound_volume = max(0.0, min(1.0, volume))\n        for sound in self.sounds.values():\n            sound.set_volume(self.sound_volume)\n    \n    def preload_sounds(self, sound_list):\n        for name, path in sound_list.items():\n            self.load_sound(name, path)\n\n# Create placeholder sound files\nmkdir -p assets/sounds\necho \"# Placeholder sound file\" > assets/sounds/eat.wav\necho \"# Placeholder sound file\" > assets/sounds/game_over.wav\necho \"# Placeholder sound file\" > assets/sounds/background.mp3\nEOF",
                    feedback: "✅ Продвинутая система звуков создана",
                    story: "🎵 Отлично! Надежная система звуков с обработкой ошибок!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/utils/audio.py": "import pygame\nimport os\n\nclass AudioManager:\n    def __init__(self):\n        pygame.mixer.init()\n        self.sounds = {}\n        self.music_volume = 0.5\n        self.sound_volume = 0.7\n    \n    def load_sound(self, name, path):\n        try:\n            if os.path.exists(path):\n                self.sounds[name] = pygame.mixer.Sound(path)\n                self.sounds[name].set_volume(self.sound_volume)\n                return True\n            else:\n                print(f\"Warning: Sound file {path} not found\")\n                return False\n        except pygame.error as e:\n            print(f\"Error loading sound {path}: {e}\")\n            return False\n    \n    def play_sound(self, name):\n        if name in self.sounds:\n            self.sounds[name].play()\n    \n    def set_sound_volume(self, volume):\n        self.sound_volume = max(0.0, min(1.0, volume))\n        for sound in self.sounds.values():\n            sound.set_volume(self.sound_volume)\n    \n    def preload_sounds(self, sound_list):\n        for name, path in sound_list.items():\n            self.load_sound(name, path)",
                        "assets/sounds/": "DIR"
                    }
                },
                {
                    text: "Базовые звуковые эффекты",
                    command: "cat > src/audio.py << 'EOF'\nimport pygame\n\nclass SimpleAudio:\n    def __init__(self):\n        pygame.mixer.init()\n        self.eat_sound = None\n        self.game_over_sound = None\n    \n    def play_eat(self):\n        if self.eat_sound:\n            self.eat_sound.play()\n    \n    def play_game_over(self):\n        if self.game_over_sound:\n            self.game_over_sound.play()\nEOF",
                    feedback: "⚠️ Базовая система звуков создана",
                    story: "🎵 Хорошо, но нет обработки ошибок и загрузки файлов!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/audio.py": "import pygame\n\nclass SimpleAudio:\n    def __init__(self):\n        pygame.mixer.init()\n        self.eat_sound = None\n        self.game_over_sound = None\n    \n    def play_eat(self):\n        if self.eat_sound:\n            self.eat_sound.play()\n    \n    def play_game_over(self):\n        if self.game_over_sound:\n            self.game_over_sound.play()"
                    }
                },
                {
                    text: "Звуки через системные вызовы",
                    command: "cat >> src/game/game.py << 'EOF'\nimport os\n\ndef play_sound(sound_name):\n    if sound_name == 'eat':\n        os.system('play -q assets/sounds/eat.wav &')\n    elif sound_name == 'game_over':\n        os.system('play -q assets/sounds/game_over.wav &')\nEOF",
                    feedback: "❌ Звуки через системные вызовы",
                    story: "⚙️ Ненадежно! Зависит от системных утилит!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без звуков - и так сойдет",
                    command: "echo '# Звуки пока не добавляем' >> src/game/game.py",
                    feedback: "❌ Звуки не добавлены",
                    story: "🔇 Игра без звуков - как фильм без музыки!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 14,
            title: "💾 Сохранение рекордов",
            description: "Добавляем сохранение лучших результатов в файл.",
            question: "Как сохранять рекорды?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "ScoreManager с JSON и валидацией",
                    command: "cat > src/utils/scores.py << 'EOF'\nimport json\nimport os\nfrom datetime import datetime\n\nclass ScoreManager:\n    def __init__(self, filename='scores.json'):\n        self.filename = filename\n        self.scores = self.load_scores()\n        self.max_scores = 10\n    \n    def load_scores(self):\n        try:\n            if os.path.exists(self.filename):\n                with open(self.filename, 'r') as f:\n                    data = json.load(f)\n                    # Validate data structure\n                    if isinstance(data, list) and all(\n                        isinstance(score, dict) and \n                        'player' in score and 'score' in score and 'date' in score\n                        for score in data\n                    ):\n                        return data\n            return []\n        except (json.JSONDecodeError, IOError) as e:\n            print(f\"Error loading scores: {e}\")\n            return []\n    \n    def save_score(self, player_name, score):\n        if not player_name or not isinstance(score, (int, float)) or score < 0:\n            return False\n        \n        new_score = {\n            'player': player_name[:20],  # Limit name length\n            'score': int(score),\n            'date': datetime.now().isoformat()\n        }\n        \n        self.scores.append(new_score)\n        self.scores.sort(key=lambda x: x['score'], reverse=True)\n        self.scores = self.scores[:self.max_scores]\n        \n        try:\n            with open(self.filename, 'w') as f:\n                json.dump(self.scores, f, indent=2)\n            return True\n        except IOError as e:\n            print(f\"Error saving scores: {e}\")\n            return False\n    \n    def get_high_scores(self, limit=5):\n        return self.scores[:limit]\n    \n    def get_player_high_score(self, player_name):\n        player_scores = [s for s in self.scores if s['player'] == player_name]\n        return max([s['score'] for s in player_scores]) if player_scores else 0\nEOF",
                    feedback: "✅ Продвинутая система рекордов создана",
                    story: "💾 Отлично! Надежное сохранение с валидацией данных!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/utils/scores.py": "import json\nimport os\nfrom datetime import datetime\n\nclass ScoreManager:\n    def __init__(self, filename='scores.json'):\n        self.filename = filename\n        self.scores = self.load_scores()\n        self.max_scores = 10\n    \n    def load_scores(self):\n        try:\n            if os.path.exists(self.filename):\n                with open(self.filename, 'r') as f:\n                    data = json.load(f)\n                    # Validate data structure\n                    if isinstance(data, list) and all(\n                        isinstance(score, dict) and \n                        'player' in score and 'score' in score and 'date' in score\n                        for score in data\n                    ):\n                        return data\n            return []\n        except (json.JSONDecodeError, IOError) as e:\n            print(f\"Error loading scores: {e}\")\n            return []\n    \n    def save_score(self, player_name, score):\n        if not player_name or not isinstance(score, (int, float)) or score < 0:\n            return False\n        \n        new_score = {\n            'player': player_name[:20],  # Limit name length\n            'score': int(score),\n            'date': datetime.now().isoformat()\n        }\n        \n        self.scores.append(new_score)\n        self.scores.sort(key=lambda x: x['score'], reverse=True)\n        self.scores = self.scores[:self.max_scores]\n        \n        try:\n            with open(self.filename, 'w') as f:\n                json.dump(self.scores, f, indent=2)\n            return True\n        except IOError as e:\n            print(f\"Error saving scores: {e}\")\n            return False\n    \n    def get_high_scores(self, limit=5):\n        return self.scores[:limit]\n    \n    def get_player_high_score(self, player_name):\n        player_scores = [s for s in self.scores if s['player'] == player_name]\n        return max([s['score'] for s in player_scores]) if player_scores else 0"
                    }
                },
                {
                    text: "Простое сохранение в JSON",
                    command: "cat > src/scores.py << 'EOF'\nimport json\n\nclass SimpleScoreManager:\n    def __init__(self):\n        self.filename = 'scores.json'\n        self.scores = []\n    \n    def save_score(self, player, score):\n        self.scores.append({'player': player, 'score': score})\n        self.scores.sort(key=lambda x: x['score'], reverse=True)\n        self.scores = self.scores[:10]\n        with open(self.filename, 'w') as f:\n            json.dump(self.scores, f)\nEOF",
                    feedback: "⚠️ Базовая система рекордов создана",
                    story: "💾 Хорошо, но нет обработки ошибок!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/scores.py": "import json\n\nclass SimpleScoreManager:\n    def __init__(self):\n        self.filename = 'scores.json'\n        self.scores = []\n    \n    def save_score(self, player, score):\n        self.scores.append({'player': player, 'score': score})\n        self.scores.sort(key=lambda x: x['score'], reverse=True)\n        self.scores = self.scores[:10]\n        with open(self.filename, 'w') as f:\n            json.dump(self.scores, f)"
                    }
                },
                {
                    text: "Сохранение в текстовый файл",
                    command: "cat > src/scores.py << 'EOF'\ndef save_score(score):\n    with open('highscores.txt', 'a') as f:\n        f.write(f'{score}\\n')\nEOF",
                    feedback: "❌ Простое сохранение в текстовый файл",
                    story: "📝 Слишком просто! Нет структуры данных!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без сохранения рекордов",
                    command: "echo '# Рекорды не сохраняем' >> src/game/game.py",
                    feedback: "❌ Система рекордов не реализована",
                    story: "💀 Игрокам важно видеть свои достижения!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 15,
            title: "🏠 Главное меню",
            description: "Создаем главное меню для игры.",
            question: "Как реализовать меню?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "State-based меню с анимациями",
                    command: "cat > src/game/menu.py << 'EOF'\nimport pygame\n\nclass Menu:\n    def __init__(self, game):\n        self.game = game\n        self.title_font = pygame.font.Font(None, 72)\n        self.option_font = pygame.font.Font(None, 48)\n        self.options = [\"Start Game\", \"High Scores\", \"Settings\", \"Quit\"]\n        self.selected = 0\n        self.animation_offset = 0\n    \n    def handle_events(self, event):\n        if event.type == pygame.KEYDOWN:\n            if event.key == pygame.K_UP:\n                self.selected = (self.selected - 1) % len(self.options)\n                self.game.audio.play_sound('menu_select')\n            elif event.key == pygame.K_DOWN:\n                self.selected = (self.selected + 1) % len(self.options)\n                self.game.audio.play_sound('menu_select')\n            elif event.key == pygame.K_RETURN:\n                self.game.audio.play_sound('menu_confirm')\n                self.execute_option()\n    \n    def execute_option(self):\n        option = self.options[self.selected]\n        if option == \"Start Game\":\n            self.game.start_game()\n        elif option == \"High Scores\":\n            self.game.show_high_scores()\n        elif option == \"Settings\":\n            self.game.show_settings()\n        elif option == \"Quit\":\n            self.game.running = False\n    \n    def update(self):\n        self.animation_offset = (self.animation_offset + 1) % 60\n    \n    def render(self):\n        self.game.screen.fill((0, 0, 0))\n        \n        # Animated title\n        title_y = 100 + (5 * pygame.math.Vector2(0, 1).rotate(self.animation_offset * 6).y)\n        title = self.title_font.render(\"SNAKE GAME\", True, (0, 255, 0))\n        self.game.screen.blit(title, (400 - title.get_width()//2, title_y))\n        \n        # Menu options\n        for i, option in enumerate(self.options):\n            color = (255, 255, 0) if i == self.selected else (255, 255, 255)\n            \n            # Selection indicator\n            if i == self.selected:\n                indicator = \">> \"\n                end_indicator = \" <<\"\n            else:\n                indicator = \"   \"\n                end_indicator = \"   \"\n            \n            text = self.option_font.render(f\"{indicator}{option}{end_indicator}\", True, color)\n            self.game.screen.blit(text, (400 - text.get_width()//2, 250 + i * 60))\n        \n        # Footer\n        footer_font = pygame.font.Font(None, 24)\n        footer = footer_font.render(\"Use UP/DOWN arrows to navigate, ENTER to select\", True, (150, 150, 150))\n        self.game.screen.blit(footer, (400 - footer.get_width()//2, 550))\n        \n        pygame.display.flip()\nEOF",
                    feedback: "✅ Продвинутое меню с анимациями создано",
                    story: "🏠 Отлично! Профессиональное меню улучшает пользовательский опыт!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/menu.py": "import pygame\n\nclass Menu:\n    def __init__(self, game):\n        self.game = game\n        self.title_font = pygame.font.Font(None, 72)\n        self.option_font = pygame.font.Font(None, 48)\n        self.options = [\"Start Game\", \"High Scores\", \"Settings\", \"Quit\"]\n        self.selected = 0\n        self.animation_offset = 0\n    \n    def handle_events(self, event):\n        if event.type == pygame.KEYDOWN:\n            if event.key == pygame.K_UP:\n                self.selected = (self.selected - 1) % len(self.options)\n                self.game.audio.play_sound('menu_select')\n            elif event.key == pygame.K_DOWN:\n                self.selected = (self.selected + 1) % len(self.options)\n                self.game.audio.play_sound('menu_select')\n            elif event.key == pygame.K_RETURN:\n                self.game.audio.play_sound('menu_confirm')\n                self.execute_option()\n    \n    def execute_option(self):\n        option = self.options[self.selected]\n        if option == \"Start Game\":\n            self.game.start_game()\n        elif option == \"High Scores\":\n            self.game.show_high_scores()\n        elif option == \"Settings\":\n            self.game.show_settings()\n        elif option == \"Quit\":\n            self.game.running = False\n    \n    def update(self):\n        self.animation_offset = (self.animation_offset + 1) % 60\n    \n    def render(self):\n        self.game.screen.fill((0, 0, 0))\n        \n        # Animated title\n        title_y = 100 + (5 * pygame.math.Vector2(0, 1).rotate(self.animation_offset * 6).y)\n        title = self.title_font.render(\"SNAKE GAME\", True, (0, 255, 0))\n        self.game.screen.blit(title, (400 - title.get_width()//2, title_y))\n        \n        # Menu options\n        for i, option in enumerate(self.options):\n            color = (255, 255, 0) if i == self.selected else (255, 255, 255)\n            \n            # Selection indicator\n            if i == self.selected:\n                indicator = \">> \"\n                end_indicator = \" <<\"\n            else:\n                indicator = \"   \"\n                end_indicator = \"   \"\n            \n            text = self.option_font.render(f\"{indicator}{option}{end_indicator}\", True, color)\n            self.game.screen.blit(text, (400 - text.get_width()//2, 250 + i * 60))\n        \n        # Footer\n        footer_font = pygame.font.Font(None, 24)\n        footer = footer_font.render(\"Use UP/DOWN arrows to navigate, ENTER to select\", True, (150, 150, 150))\n        self.game.screen.blit(footer, (400 - footer.get_width()//2, 550))\n        \n        pygame.display.flip()"
                    }
                },
                {
                    text: "Простое текстовое меню",
                    command: "cat > src/menu.py << 'EOF'\nimport pygame\n\nclass SimpleMenu:\n    def __init__(self, game):\n        self.game = game\n        self.font = pygame.font.Font(None, 48)\n        self.options = [\"Start Game\", \"High Scores\", \"Quit\"]\n        self.selected = 0\n    \n    def handle_events(self, event):\n        if event.type == pygame.KEYDOWN:\n            if event.key == pygame.K_UP:\n                self.selected = (self.selected - 1) % len(self.options)\n            elif event.key == pygame.K_DOWN:\n                self.selected = (self.selected + 1) % len(self.options)\n            elif event.key == pygame.K_RETURN:\n                if self.selected == 0:\n                    self.game.start_game()\n                elif self.selected == 1:\n                    self.game.show_scores()\n                elif self.selected == 2:\n                    self.game.running = False\n    \n    def render(self):\n        self.game.screen.fill((0, 0, 0))\n        title = self.font.render(\"SNAKE GAME\", True, (0, 255, 0))\n        self.game.screen.blit(title, (300, 100))\n        \n        for i, option in enumerate(self.options):\n            color = (255, 255, 0) if i == self.selected else (255, 255, 255)\n            text = self.font.render(option, True, color)\n            self.game.screen.blit(text, (350, 200 + i * 60))\n        \n        pygame.display.flip()\nEOF",
                    feedback: "⚠️ Простое меню создано",
                    story: "🏠 Хорошо, но можно добавить анимации и звуки!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/menu.py": "import pygame\n\nclass SimpleMenu:\n    def __init__(self, game):\n        self.game = game\n        self.font = pygame.font.Font(None, 48)\n        self.options = [\"Start Game\", \"High Scores\", \"Quit\"]\n        self.selected = 0\n    \n    def handle_events(self, event):\n        if event.type == pygame.KEYDOWN:\n            if event.key == pygame.K_UP:\n                self.selected = (self.selected - 1) % len(self.options)\n            elif event.key == pygame.K_DOWN:\n                self.selected = (self.selected + 1) % len(self.options)\n            elif event.key == pygame.K_RETURN:\n                if self.selected == 0:\n                    self.game.start_game()\n                elif self.selected == 1:\n                    self.game.show_scores()\n                elif self.selected == 2:\n                    self.game.running = False\n    \n    def render(self):\n        self.game.screen.fill((0, 0, 0))\n        title = self.font.render(\"SNAKE GAME\", True, (0, 255, 0))\n        self.game.screen.blit(title, (300, 100))\n        \n        for i, option in enumerate(self.options):\n            color = (255, 255, 0) if i == self.selected else (255, 255, 255)\n            text = self.font.render(option, True, color)\n            self.game.screen.blit(text, (350, 200 + i * 60))\n        \n        pygame.display.flip()"
                    }
                },
                {
                    text: "Меню через консольный ввод",
                    command: "cat > src/menu.py << 'EOF'\ndef show_menu():\n    print(\"1. Start Game\")\n    print(\"2. High Scores\")\n    print(\"3. Quit\")\n    choice = input(\"Select: \")\n    return choice\nEOF",
                    feedback: "❌ Консольное меню вместо графического",
                    story: "🖥️ Игроки ожидают графическое меню в игре!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без меню - сразу начинать игру",
                    command: "echo '# Начинаем сразу без меню' >> src/game/game.py",
                    feedback: "❌ Меню не реализовано",
                    story: "💀 Игра без меню выглядит незавершенной!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        // Продолжение для шагов 16-30...
        {
            id: 16,
            title: "🧪 Unit тесты",
            description: "Пишем тесты для основных компонентов игры.",
            question: "Какие тесты создать?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Полный набор тестов с pytest и моками",
                    command: "cat > tests/test_snake.py << 'EOF'\nimport pytest\nimport sys\nimport os\nsys.path.append('src')\n\nfrom game.snake import Snake\nfrom game.food import Food\n\nclass TestSnake:\n    def setup_method(self):\n        self.snake = Snake()\n    \n    def test_initial_length(self):\n        assert len(self.snake.body) == 3\n    \n    def test_initial_position(self):\n        assert self.snake.body[0] == (100, 100)\n    \n    def test_move_forward(self):\n        initial_head = self.snake.body[0]\n        self.snake.move()\n        new_head = self.snake.body[0]\n        assert new_head[0] == initial_head[0] + 10\n        assert new_head[1] == initial_head[1]\n    \n    def test_grow_snake(self):\n        initial_length = len(self.snake.body)\n        self.snake.grow_snake()\n        self.snake.move()\n        assert len(self.snake.body) == initial_length + 1\n    \n    def test_change_direction(self):\n        self.snake.change_direction((0, -10))\n        assert self.snake.direction == (0, -10)\n    \n    def test_prevent_180_turn(self):\n        self.snake.direction = (10, 0)\n        self.snake.change_direction((-10, 0))\n        assert self.snake.direction == (10, 0)  # Should not change\n\nclass TestFood:\n    def test_food_initialization(self):\n        food = Food()\n        assert food.position != (0, 0)\n    \n    def test_food_randomize(self):\n        food = Food()\n        initial_pos = food.position\n        food.randomize_position()\n        assert food.position != initial_pos\n\nif __name__ == '__main__':\n    pytest.main([__file__, '-v'])\nEOF\nmkdir -p tests",
                    feedback: "✅ Полный набор unit тестов создан",
                    story: "🧪 Отлично! Тесты обеспечат надежность и помогут при рефакторинге!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "tests/": "DIR",
                        "tests/test_snake.py": "import pytest\nimport sys\nimport os\nsys.path.append('src')\n\nfrom game.snake import Snake\nfrom game.food import Food\n\nclass TestSnake:\n    def setup_method(self):\n        self.snake = Snake()\n    \n    def test_initial_length(self):\n        assert len(self.snake.body) == 3\n    \n    def test_initial_position(self):\n        assert self.snake.body[0] == (100, 100)\n    \n    def test_move_forward(self):\n        initial_head = self.snake.body[0]\n        self.snake.move()\n        new_head = self.snake.body[0]\n        assert new_head[0] == initial_head[0] + 10\n        assert new_head[1] == initial_head[1]\n    \n    def test_grow_snake(self):\n        initial_length = len(self.snake.body)\n        self.snake.grow_snake()\n        self.snake.move()\n        assert len(self.snake.body) == initial_length + 1\n    \n    def test_change_direction(self):\n        self.snake.change_direction((0, -10))\n        assert self.snake.direction == (0, -10)\n    \n    def test_prevent_180_turn(self):\n        self.snake.direction = (10, 0)\n        self.snake.change_direction((-10, 0))\n        assert self.snake.direction == (10, 0)  # Should not change\n\nclass TestFood:\n    def test_food_initialization(self):\n        food = Food()\n        assert food.position != (0, 0)\n    \n    def test_food_randomize(self):\n        food = Food()\n        initial_pos = food.position\n        food.randomize_position()\n        assert food.position != initial_pos\n\nif __name__ == '__main__':\n    pytest.main([__file__, '-v'])"
                    }
                },
                {
                    text: "Базовые тесты с unittest",
                    command: "cat > tests/test_basic.py << 'EOF'\nimport unittest\nimport sys\nsys.path.append('src')\n\nfrom game.snake import Snake\n\nclass TestSnakeBasic(unittest.TestCase):\n    def setUp(self):\n        self.snake = Snake()\n    \n    def test_length(self):\n        self.assertEqual(len(self.snake.body), 3)\n    \n    def test_move(self):\n        head = self.snake.body[0]\n        self.snake.move()\n        self.assertNotEqual(self.snake.body[0], head)\n\nif __name__ == '__main__':\n    unittest.main()\nEOF",
                    feedback: "⚠️ Базовые тесты созданы",
                    story: "🧪 Хорошо, но можно покрыть больше кейсов!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "tests/test_basic.py": "import unittest\nimport sys\nsys.path.append('src')\n\nfrom game.snake import Snake\n\nclass TestSnakeBasic(unittest.TestCase):\n    def setUp(self):\n        self.snake = Snake()\n    \n    def test_length(self):\n        self.assertEqual(len(self.snake.body), 3)\n    \n    def test_move(self):\n        head = self.snake.body[0]\n        self.snake.move()\n        self.assertNotEqual(self.snake.body[0], head)\n\nif __name__ == '__main__':\n    unittest.main()"
                    }
                },
                {
                    text: "Один простой тест",
                    command: "cat > test_snake.py << 'EOF'\n# Простой тест\nfrom src.game.snake import Snake\n\nsnake = Snake()\nprint(f\"Initial length: {len(snake.body)}\")\nsnake.move()\nprint(f\"After move: {snake.body[0]}\")\nEOF",
                    feedback: "❌ Простой скрипт вместо тестов",
                    story: "📝 Это не тесты, а просто проверка!",
                    score: 0,
                    type: "error",
                    mistakes: { testing: 1 }
                },
                {
                    text: "Без тестов - и так работает",
                    command: "echo '# Тесты пока не пишем' > tests/placeholder.txt",
                    feedback: "❌ Тесты не написаны",
                    story: "💀 Без тестов любой рефакторинг рискован!",
                    score: -1,
                    type: "error",
                    mistakes: { testing: 2 }
                }
            ]
        },
        {
            id: 17,
            title: "⚡ Профилирование",
            description: "Анализируем производительность игры.",
            question: "Как профилировать игру?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Декоратор для профилирования с статистикой",
                    command: "cat > src/utils/profiler.py << 'EOF'\nimport time\nimport functools\nfrom collections import defaultdict\n\nclass Profiler:\n    def __init__(self):\n        self.timings = defaultdict(list)\n        self.call_counts = defaultdict(int)\n    \n    def time_method(self, method_name=None):\n        def decorator(func):\n            name = method_name or func.__name__\n            \n            @functools.wraps(func)\n            def wrapper(*args, **kwargs):\n                start = time.perf_counter()\n                result = func(*args, **kwargs)\n                end = time.perf_counter()\n                \n                self.timings[name].append(end - start)\n                self.call_counts[name] += 1\n                return result\n            return wrapper\n        return decorator\n    \n    def get_statistics(self):\n        stats = {}\n        for method, times in self.timings.items():\n            if times:\n                stats[method] = {\n                    'calls': self.call_counts[method],\n                    'total_time': sum(times),\n                    'avg_time': sum(times) / len(times),\n                    'max_time': max(times),\n                    'min_time': min(times)\n                }\n        return stats\n    \n    def print_report(self):\n        stats = self.get_statistics()\n        print(\"\\n=== Performance Report ===\")\n        for method, data in sorted(stats.items(), key=lambda x: x[1]['total_time'], reverse=True):\n            print(f\"{method}:\")\n            print(f\"  Calls: {data['calls']}\")\n            print(f\"  Total: {data['total_time']:.6f}s\")\n            print(f\"  Avg:   {data['avg_time']:.6f}s\")\n            print(f\"  Max:   {data['max_time']:.6f}s\")\n            print(f\"  Min:   {data['min_time']:.6f}s\")\n        print(\"========================\\n\")\n\nprofiler = Profiler()\n\n# Пример использования:\n# @profiler.time_method('Game.update')\n# def update(self):\n#     ...\nEOF",
                    feedback: "✅ Продвинутый профилировщик создан",
                    story: "⚡ Отлично! Теперь можно найти и оптимизировать узкие места!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/utils/profiler.py": "import time\nimport functools\nfrom collections import defaultdict\n\nclass Profiler:\n    def __init__(self):\n        self.timings = defaultdict(list)\n        self.call_counts = defaultdict(int)\n    \n    def time_method(self, method_name=None):\n        def decorator(func):\n            name = method_name or func.__name__\n            \n            @functools.wraps(func)\n            def wrapper(*args, **kwargs):\n                start = time.perf_counter()\n                result = func(*args, **kwargs)\n                end = time.perf_counter()\n                \n                self.timings[name].append(end - start)\n                self.call_counts[name] += 1\n                return result\n            return wrapper\n        return decorator\n    \n    def get_statistics(self):\n        stats = {}\n        for method, times in self.timings.items():\n            if times:\n                stats[method] = {\n                    'calls': self.call_counts[method],\n                    'total_time': sum(times),\n                    'avg_time': sum(times) / len(times),\n                    'max_time': max(times),\n                    'min_time': min(times)\n                }\n        return stats\n    \n    def print_report(self):\n        stats = self.get_statistics()\n        print(\"\\n=== Performance Report ===\")\n        for method, data in sorted(stats.items(), key=lambda x: x[1]['total_time'], reverse=True):\n            print(f\"{method}:\")\n            print(f\"  Calls: {data['calls']}\")\n            print(f\"  Total: {data['total_time']:.6f}s\")\n            print(f\"  Avg:   {data['avg_time']:.6f}s\")\n            print(f\"  Max:   {data['max_time']:.6f}s\")\n            print(f\"  Min:   {data['min_time']:.6f}s\")\n        print(\"========================\\n\")\n\nprofiler = Profiler()"
                    }
                },
                {
                    text: "Простое измерение времени",
                    command: "cat > src/profiler.py << 'EOF'\nimport time\n\nclass SimpleProfiler:\n    def __init__(self):\n        self.timings = {}\n    \n    def time_method(self, method_name):\n        def decorator(func):\n            def wrapper(*args, **kwargs):\n                start = time.time()\n                result = func(*args, **kwargs)\n                end = time.time()\n                self.timings[method_name] = self.timings.get(method_name, 0) + (end - start)\n                return result\n            return wrapper\n        return decorator\n    \n    def get_report(self):\n        return self.timings\nEOF",
                    feedback: "⚠️ Базовый профилировщик создан",
                    story: "⚡ Хорошо, но нет детальной статистики!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/profiler.py": "import time\n\nclass SimpleProfiler:\n    def __init__(self):\n        self.timings = {}\n    \n    def time_method(self, method_name):\n        def decorator(func):\n            def wrapper(*args, **kwargs):\n                start = time.time()\n                result = func(*args, **kwargs)\n                end = time.time()\n                self.timings[method_name] = self.timings.get(method_name, 0) + (end - start)\n                return result\n            return wrapper\n        return decorator\n    \n    def get_report(self):\n        return self.timings"
                    }
                },
                {
                    text: "Ручное измерение времени",
                    command: "cat > debug_performance.py << 'EOF'\n# Ручное профилирование\nimport time\n\nstart = time.time()\n# Код для измерения\nend = time.time()\nprint(f\"Time: {end - start}\")\nEOF",
                    feedback: "❌ Ручное профилирование",
                    story: "⏱️ Неэффективно! Нужна автоматизация!",
                    score: 0,
                    type: "error",
                    mistakes: { performance: 1 }
                },
                {
                    text: "Без профилирования - и так быстро",
                    command: "echo '# Профилирование не нужно' >> src/game/game.py",
                    feedback: "❌ Профилирование не реализовано",
                    story: "🐌 Без профилирования можно пропустить серьезные проблемы с производительностью!",
                    score: -1,
                    type: "error",
                    mistakes: { performance: 2 }
                }
            ]
        },
        {
            id: 18,
            title: "🐳 Docker контейнеризация",
            description: "Создаем Dockerfile для упаковки игры.",
            question: "Как создать Dockerfile?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Multi-stage Dockerfile с оптимизацией",
                    command: "cat > Dockerfile << 'EOF'\n# Build stage\nFROM python:3.9-slim as builder\n\nWORKDIR /app\n\n# Install dependencies\nCOPY requirements.txt .\nRUN pip install --user --no-cache-dir -r requirements.txt\n\n# Runtime stage\nFROM python:3.9-slim\n\nWORKDIR /app\n\n# Install runtime dependencies\nRUN apt-get update && apt-get install -y \\\n    libsdl2-2.0-0 \\\n    libsdl2-image-2.0-0 \\\n    libsdl2-mixer-2.0-0 \\\n    libsdl2-ttf-2.0-0 \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy Python dependencies from builder\nCOPY --from=builder /root/.local /root/.local\n\n# Copy application code\nCOPY src/ ./src/\nCOPY assets/ ./assets/\n\n# Make sure scripts in .local are usable\nENV PATH=/root/.local/bin:$PATH\n\n# Create non-root user for security\nRUN useradd --create-home --shell /bin/bash app\nUSER app\n\n# Expose volume for scores\nVOLUME [\"/app/data\"]\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n    CMD python -c \"import pygame; pygame.init(); pygame.quit()\" || exit 1\n\nCMD [\"python\", \"-m\", \"src.game.game\"]\nEOF\n\n# Create .dockerignore\ncat > .dockerignore << 'DOCKERIGNOREEOF'\n__pycache__/\n*.pyc\n*.pyo\n*.pyd\n.Python\nenv/\nvenv/\n.venv\n.git/\n.gitignore\nREADME.md\nDockerfile\n.dockerignore\n tests/\n.DS_Store\nDOCKERIGNOREEOF",
                    feedback: "✅ Оптимизированный multi-stage Dockerfile создан",
                    story: "🐳 Отлично! Безопасный и оптимизированный контейнер!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "Dockerfile": "FROM python:3.9-slim as builder\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --user --no-cache-dir -r requirements.txt\n\nFROM python:3.9-slim\n\nWORKDIR /app\n\nRUN apt-get update && apt-get install -y \\\n    libsdl2-2.0-0 \\\n    libsdl2-image-2.0-0 \\\n    libsdl2-mixer-2.0-0 \\\n    libsdl2-ttf-2.0-0 \\\n    && rm -rf /var/lib/apt/lists/*\n\nCOPY --from=builder /root/.local /root/.local\nCOPY src/ ./src/\nCOPY assets/ ./assets/\n\nENV PATH=/root/.local/bin:$PATH\n\nRUN useradd --create-home --shell /bin/bash app\nUSER app\n\nVOLUME [\"/app/data\"]\n\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n    CMD python -c \"import pygame; pygame.init(); pygame.quit()\" || exit 1\n\nCMD [\"python\", \"-m\", \"src.game.game\"]",
                        ".dockerignore": "__pycache__/\n*.pyc\n*.pyo\n*.pyd\n.Python\nenv/\nvenv/\n.venv\n.git/\n.gitignore\nREADME.md\nDockerfile\n.dockerignore\n tests/\n.DS_Store"
                    }
                },
                {
                    text: "Базовый Dockerfile",
                    command: "cat > Dockerfile << 'EOF'\nFROM python:3.9-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\nCOPY src/ ./src/\nCOPY assets/ ./assets/\n\nCMD [\"python\", \"-m\", \"src.game.game\"]\nEOF",
                    feedback: "⚠️ Базовый Dockerfile создан",
                    story: "🐳 Хорошо, но можно улучшить безопасность и размер!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "Dockerfile": "FROM python:3.9-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\nCOPY src/ ./src/\nCOPY assets/ ./assets/\n\nCMD [\"python\", \"-m\", \"src.game.game\"]"
                    }
                },
                {
                    text: "Dockerfile без зависимостей",
                    command: "cat > Dockerfile << 'EOF'\nFROM python:3.9\n\nWORKDIR /app\nCOPY . .\nCMD [\"python\", \"game.py\"]\nEOF",
                    feedback: "❌ Dockerfile без установки зависимостей",
                    story: "📦 Контейнер не будет работать без зависимостей!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без Docker - и так работает",
                    command: "echo '# Docker не используем' > docker_notes.txt",
                    feedback: "❌ Docker не настроен",
                    story: "🏃‍♂️ Без контейнеризации сложно обеспечить одинаковое окружение!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 19,
            title: "🚀 CI/CD настройка",
            description: "Настраиваем автоматическую сборку и тестирование.",
            question: "Как настроить GitHub Actions?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Полный CI/CD pipeline с тестами и сборкой",
                    command: "mkdir -p .github/workflows\ncat > .github/workflows/ci-cd.yml << 'EOF'\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        python-version: [3.8, 3.9, 3.10]\n    \n    steps:\n    - uses: actions/checkout@v3\n    \n    - name: Set up Python ${{ matrix.python-version }}\n      uses: actions/setup-python@v4\n      with:\n        python-version: ${{ matrix.python-version }}\n    \n    - name: Install system dependencies\n      run: |\n        sudo apt-get update\n        sudo apt-get install -y libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev\n    \n    - name: Install Python dependencies\n      run: |\n        python -m pip install --upgrade pip\n        pip install -r requirements.txt\n        pip install pytest pytest-cov flake8 bandit\n    \n    - name: Lint with flake8\n      run: |\n        flake8 src/ --count --max-line-length=120 --show-source --statistics\n    \n    - name: Security scan with bandit\n      run: |\n        bandit -r src/ -f html -o bandit_report.html || true\n    \n    - name: Run tests with coverage\n      run: |\n        pytest tests/ -v --cov=src --cov-report=xml --cov-report=html\n    \n    - name: Upload coverage reports\n      uses: codecov/codecov-action@v3\n      with:\n        file: ./coverage.xml\n\n  build:\n    runs-on: ubuntu-latest\n    needs: test\n    if: github.ref == 'refs/heads/main'\n    \n    steps:\n    - uses: actions/checkout@v3\n    \n    - name: Build Docker image\n      run: |\n        docker build -t snake-game:latest .\n    \n    - name: Test Docker image\n      run: |\n        docker run --rm snake-game:latest python -c \"import pygame; print('Pygame works!')\"\n    \n    - name: Upload Docker image\n      uses: actions/upload-artifact@v3\n      with:\n        name: snake-game-docker\n        path: .\n        retention-days: 30\nEOF",
                    feedback: "✅ Полный CI/CD pipeline создан",
                    story: "🚀 Отлично! Автоматизированное тестирование и сборка на каждом коммите!",
                    score: 2,
                    type: "success",
                    architecture: {
                        ".github/workflows/ci-cd.yml": "name: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        python-version: [3.8, 3.9, 3.10]\n    \n    steps:\n    - uses: actions/checkout@v3\n    \n    - name: Set up Python ${{ matrix.python-version }}\n      uses: actions/setup-python@v4\n      with:\n        python-version: ${{ matrix.python-version }}\n    \n    - name: Install system dependencies\n      run: |\n        sudo apt-get update\n        sudo apt-get install -y libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev\n    \n    - name: Install Python dependencies\n      run: |\n        python -m pip install --upgrade pip\n        pip install -r requirements.txt\n        pip install pytest pytest-cov flake8 bandit\n    \n    - name: Lint with flake8\n      run: |\n        flake8 src/ --count --max-line-length=120 --show-source --statistics\n    \n    - name: Security scan with bandit\n      run: |\n        bandit -r src/ -f html -o bandit_report.html || true\n    \n    - name: Run tests with coverage\n      run: |\n        pytest tests/ -v --cov=src --cov-report=xml --cov-report=html\n    \n    - name: Upload coverage reports\n      uses: codecov/codecov-action@v3\n      with:\n        file: ./coverage.xml\n\n  build:\n    runs-on: ubuntu-latest\n    needs: test\n    if: github.ref == 'refs/heads/main'\n    \n    steps:\n    - uses: actions/checkout@v3\n    \n    - name: Build Docker image\n      run: |\n        docker build -t snake-game:latest .\n    \n    - name: Test Docker image\n      run: |\n        docker run --rm snake-game:latest python -c \"import pygame; print('Pygame works!')\"\n    \n    - name: Upload Docker image\n      uses: actions/upload-artifact@v3\n      with:\n        name: snake-game-docker\n        path: .\n        retention-days: 30"
                    }
                },
                {
                    text: "Базовый CI с тестами",
                    command: "mkdir -p .github/workflows\ncat > .github/workflows/ci.yml << 'EOF'\nname: CI\n\non: [push, pull_request]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Set up Python\n      uses: actions/setup-python@v4\n      with:\n        python-version: '3.9'\n    - name: Install dependencies\n      run: pip install -r requirements.txt\n    - name: Run tests\n      run: python -m pytest tests/\nEOF",
                    feedback: "⚠️ Базовый CI pipeline создан",
                    story: "🚀 Хорошо, но можно добавить больше проверок!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        ".github/workflows/ci.yml": "name: CI\n\non: [push, pull_request]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Set up Python\n      uses: actions/setup-python@v4\n      with:\n        python-version: '3.9'\n    - name: Install dependencies\n      run: pip install -r requirements.txt\n    - name: Run tests\n      run: python -m pytest tests/"
                    }
                },
                {
                    text: "Ручной запуск тестов",
                    command: "cat > test_manual.sh << 'EOF'\n#!/bin/bash\necho \"Running tests manually...\"\npython -m pytest tests/\nEOF\nchmod +x test_manual.sh",
                    feedback: "❌ Ручной скрипт вместо CI/CD",
                    story: "👐 Ручной запуск тестов легко забыть!",
                    score: 0,
                    type: "error",
                    mistakes: { testing: 1 }
                },
                {
                    text: "Без CI/CD - тестирую локально",
                    command: "echo '# CI/CD пока не настраиваем' > ci_notes.txt",
                    feedback: "❌ CI/CD не настроен",
                    story: "💀 Без CI/CD качество кода может снижаться со временем!",
                    score: -1,
                    type: "error",
                    mistakes: { testing: 2 }
                }
            ]
        },
        {
            id: 20,
            title: "📚 Документация",
            description: "Создаем документацию для проекта.",
            question: "Какую документацию создать?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Полная документация с API reference",
                    command: "cat > README.md << 'EOF'\n# Snake Game\n\nA classic Snake game built with Python and Pygame featuring modern software development practices.\n\n## 🎮 Features\n\n- Classic snake gameplay with smooth controls\n- High score tracking with persistent storage\n- Sound effects and background music\n- Responsive UI with animations\n- Cross-platform compatibility\n- Docker containerization\n- Comprehensive testing suite\n\n## 🚀 Quick Start\n\n### Prerequisites\n- Python 3.8+\n- Pygame 2.1.2+\n\n### Installation\n\n```bash\n# Clone the repository\ngit clone https://github.com/your-username/snake-game.git\ncd snake-game\n\n# Create virtual environment\npython -m venv venv\nsource venv/bin/activate  # On Windows: venv\\\\Scripts\\\\activate\n\n# Install dependencies\npip install -r requirements.txt\n\n# Run the game\npython -m src.game.game\n```\n\n### Docker\n\n```bash\n# Build and run with Docker\ndocker build -t snake-game .\ndocker run -it snake-game\n```\n\n## 🏗️ Architecture\n\n```\nsrc/\n├── game/           # Core game logic\n│   ├── game.py    # Main game class\n│   ├── snake.py   # Snake behavior\n│   ├── food.py    # Food generation\n│   └── collision.py # Collision detection\n├── utils/         # Utilities\n│   ├── audio.py   # Sound management\n│   └── scores.py  # High score handling\n└── config.py      # Configuration\n```\n\n## 🧪 Testing\n\n```bash\n# Run all tests\npytest tests/\n\n# Run with coverage\npytest --cov=src tests/\n\n# Run specific test file\npytest tests/test_snake.py -v\n```\n\n## 📝 API Reference\n\n### Game Class\nMain game controller handling the game loop and state management.\n\n```python\nclass Game:\n    def __init__(self):\n        \"\"\"Initialize game with default settings.\"\"\"\n    \n    def run(self):\n        \"\"\"Start the main game loop.\"\"\"\n    \n    def handle_events(self):\n        \"\"\"Process user input and system events.\"\"\"\n```\n\n### Snake Class\nManages snake movement, growth, and collision detection.\n\n```python\nclass Snake:\n    def move(self):\n        \"\"\"Move snake in current direction.\"\"\"\n    \n    def grow_snake(self):\n        \"\"\"Increase snake length after eating food.\"\"\"\n```\n\n## 🤝 Contributing\n\n1. Fork the repository\n2. Create a feature branch (`git checkout -b feature/amazing-feature`)\n3. Commit changes (`git commit -m 'Add amazing feature'`)\n4. Push to branch (`git push origin feature/amazing-feature`)\n5. Open a Pull Request\n\n## 📄 License\n\nThis project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.\n\n## 🐛 Bug Reports\n\nPlease create an issue with:\n- Steps to reproduce\n- Expected behavior\n- Actual behavior\n- Screenshots if applicable\n```\n\n# Create additional documentation\ncat > docs/architecture.md << 'DOCEOF'\n# Architecture Documentation\n\n## Overview\nThe Snake Game follows a modular architecture with clear separation of concerns.\n\n## Components\n\n### Core Game Loop\n- **Game**: Orchestrates the main loop and manages game states\n- **StateManager**: Handles transitions between menu, playing, and game over states\n\n### Game Entities\n- **Snake**: Responsible for movement, growth, and self-collision detection\n- **Food**: Manages food generation and positioning\n- **CollisionManager**: Handles all collision detection logic\n\n### Utilities\n- **AudioManager**: Sound effects and music playback\n- **ScoreManager**: High score persistence and retrieval\n- **UIManager**: User interface rendering and input handling\n\n## Data Flow\n1. User input → Game.handle_events()\n2. Game state update → Game.update()\n3. Render cycle → Game.render()\n4. Repeat at 60 FPS\nDOCEOF\n\nmkdir -p docs",
                    feedback: "✅ Полная документация создана",
                    story: "📚 Отлично! Профессиональная документация поможет другим разработчикам!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "README.md": "# Snake Game\n\nA classic Snake game built with Python and Pygame featuring modern software development practices.\n\n## 🎮 Features\n\n- Classic snake gameplay with smooth controls\n- High score tracking with persistent storage\n- Sound effects and background music\n- Responsive UI with animations\n- Cross-platform compatibility\n- Docker containerization\n- Comprehensive testing suite\n\n## 🚀 Quick Start\n\n### Prerequisites\n- Python 3.8+\n- Pygame 2.1.2+\n\n### Installation\n\n```bash\n# Clone the repository\ngit clone https://github.com/your-username/snake-game.git\ncd snake-game\n\n# Create virtual environment\npython -m venv venv\nsource venv/bin/activate  # On Windows: venv\\\\Scripts\\\\activate\n\n# Install dependencies\npip install -r requirements.txt\n\n# Run the game\npython -m src.game.game\n```\n\n### Docker\n\n```bash\n# Build and run with Docker\ndocker build -t snake-game .\ndocker run -it snake-game\n```\n\n## 🏗️ Architecture\n\n```\nsrc/\n├── game/           # Core game logic\n│   ├── game.py    # Main game class\n│   ├── snake.py   # Snake behavior\n│   ├── food.py    # Food generation\n│   └── collision.py # Collision detection\n├── utils/         # Utilities\n│   ├── audio.py   # Sound management\n│   └── scores.py  # High score handling\n└── config.py      # Configuration\n```\n\n## 🧪 Testing\n\n```bash\n# Run all tests\npytest tests/\n\n# Run with coverage\npytest --cov=src tests/\n\n# Run specific test file\npytest tests/test_snake.py -v\n```\n\n## 📝 API Reference\n\n### Game Class\nMain game controller handling the game loop and state management.\n\n```python\nclass Game:\n    def __init__(self):\n        \"\"\"Initialize game with default settings.\"\"\"\n    \n    def run(self):\n        \"\"\"Start the main game loop.\"\"\"\n    \n    def handle_events(self):\n        \"\"\"Process user input and system events.\"\"\"\n```\n\n### Snake Class\nManages snake movement, growth, and collision detection.\n\n```python\nclass Snake:\n    def move(self):\n        \"\"\"Move snake in current direction.\"\"\"\n    \n    def grow_snake(self):\n        \"\"\"Increase snake length after eating food.\"\"\"\n```\n\n## 🤝 Contributing\n\n1. Fork the repository\n2. Create a feature branch (`git checkout -b feature/amazing-feature`)\n3. Commit changes (`git commit -m 'Add amazing feature'`)\n4. Push to branch (`git push origin feature/amazing-feature`)\n5. Open a Pull Request\n\n## 📄 License\n\nThis project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.\n\n## 🐛 Bug Reports\n\nPlease create an issue with:\n- Steps to reproduce\n- Expected behavior\n- Actual behavior\n- Screenshots if applicable",
                        "docs/architecture.md": "# Architecture Documentation\n\n## Overview\nThe Snake Game follows a modular architecture with clear separation of concerns.\n\n## Components\n\n### Core Game Loop\n- **Game**: Orchestrates the main loop and manages game states\n- **StateManager**: Handles transitions between menu, playing, and game over states\n\n### Game Entities\n- **Snake**: Responsible for movement, growth, and self-collision detection\n- **Food**: Manages food generation and positioning\n- **CollisionManager**: Handles all collision detection logic\n\n### Utilities\n- **AudioManager**: Sound effects and music playback\n- **ScoreManager**: High score persistence and retrieval\n- **UIManager**: User interface rendering and input handling\n\n## Data Flow\n1. User input → Game.handle_events()\n2. Game state update → Game.update()\n3. Render cycle → Game.render()\n4. Repeat at 60 FPS"
                    }
                },
                {
                    text: "Базовый README",
                    command: "cat > README.md << 'EOF'\n# Snake Game\n\nClassic snake game built with Python and Pygame.\n\n## Installation\n```bash\npip install -r requirements.txt\npython -m src.game.game\n```\n\n## Features\n- Snake movement\n- Food collection\n- Score tracking\nEOF",
                    feedback: "⚠️ Базовый README создан",
                    story: "📚 Хорошо, но можно добавить больше деталей!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "README.md": "# Snake Game\n\nClassic snake game built with Python and Pygame.\n\n## Installation\n```bash\npip install -r requirements.txt\npython -m src.game.game\n```\n\n## Features\n- Snake movement\n- Food collection\n- Score tracking"
                    }
                },
                {
                    text: "Минимальная документация",
                    command: "echo 'Snake Game - use python game.py' > README.txt",
                    feedback: "❌ Минимальная документация",
                    story: "📝 Слишком мало информации для других разработчиков!",
                    score: 0,
                    type: "error",
                    mistakes: { planning: 1 }
                },
                {
                    text: "Без документации - код самодокументирован",
                    command: "echo '# Документация не нужна' > notes.txt",
                    feedback: "❌ Документация не создана",
                    story: "💀 Без документации проект сложно поддерживать!",
                    score: -1,
                    type: "error",
                    mistakes: { planning: 2 }
                }
            ]
        },
        // Продолжение для шагов 21-30...
        {
            id: 21,
            title: "🔧 Конфигурация",
            description: "Добавляем систему конфигурации для настроек игры.",
            question: "Как настроить конфигурацию?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Иерархическая конфигурация с env переменными",
                    command: "cat > src/config.py << 'EOF'\nimport os\nimport json\nfrom typing import Dict, Any\n\nclass Config:\n    def __init__(self):\n        self.default_config = {\n            'game': {\n                'width': 800,\n                'height': 600,\n                'grid_size': 20,\n                'fps': 60,\n                'difficulty': 'normal'\n            },\n            'colors': {\n                'background': (0, 0, 0),\n                'snake': (0, 255, 0),\n                'food': (255, 0, 0),\n                'ui': (255, 255, 255)\n            },\n            'audio': {\n                'enabled': True,\n                'volume': 0.7,\n                'music_volume': 0.5\n            },\n            'controls': {\n                'up': 'K_UP',\n                'down': 'K_DOWN', \n                'left': 'K_LEFT',\n                'right': 'K_RIGHT',\n                'pause': 'K_p'\n            }\n        }\n        self.user_config = {}\n        self.load_config()\n    \n    def load_config(self):\n        # Load from environment variables\n        env_config = {\n            'game': {\n                'width': int(os.getenv('GAME_WIDTH', self.default_config['game']['width'])),\n                'height': int(os.getenv('GAME_HEIGHT', self.default_config['game']['height'])),\n                'fps': int(os.getenv('GAME_FPS', self.default_config['game']['fps']))\n            },\n            'audio': {\n                'enabled': os.getenv('AUDIO_ENABLED', 'true').lower() == 'true',\n                'volume': float(os.getenv('AUDIO_VOLUME', self.default_config['audio']['volume']))\n            }\n        }\n        \n        # Load from config file\n        config_file = os.getenv('CONFIG_FILE', 'config.json')\n        if os.path.exists(config_file):\n            try:\n                with open(config_file, 'r') as f:\n                    file_config = json.load(f)\n                    self.merge_configs(self.user_config, file_config)\n            except (json.JSONDecodeError, IOError):\n                pass\n        \n        self.merge_configs(self.user_config, env_config)\n    \n    def merge_configs(self, target: Dict, source: Dict):\n        for key, value in source.items():\n            if key in target and isinstance(target[key], dict) and isinstance(value, dict):\n                self.merge_configs(target[key], value)\n            else:\n                target[key] = value\n    \n    def get(self, key_path: str, default=None):\n        keys = key_path.split('.')\n        value = self.user_config\n        \n        for key in keys:\n            if isinstance(value, dict) and key in value:\n                value = value[key]\n            else:\n                # Fallback to default config\n                value = self.default_config\n                for k in keys:\n                    if isinstance(value, dict) and k in value:\n                        value = value[k]\n                    else:\n                        return default\n                break\n        \n        return value if value is not None else default\n    \n    def set(self, key_path: str, value: Any):\n        keys = key_path.split('.')\n        config = self.user_config\n        \n        for key in keys[:-1]:\n            if key not in config:\n                config[key] = {}\n            config = config[key]\n        \n        config[keys[-1]] = value\n    \n    def save_to_file(self, filename='config.json'):\n        try:\n            with open(filename, 'w') as f:\n                json.dump(self.user_config, f, indent=2)\n            return True\n        except IOError:\n            return False\n\n# Global config instance\nconfig = Config()\nEOF\n\n# Create example config file\ncat > config.example.json << 'EOF'\n{\n  \"game\": {\n    \"width\": 800,\n    \"height\": 600,\n    \"fps\": 60\n  },\n  \"audio\": {\n    \"enabled\": true,\n    \"volume\": 0.7\n  }\n}\nEOF",
                    feedback: "✅ Продвинутая система конфигурации создана",
                    story: "🔧 Отлично! Гибкая конфигурация с поддержкой env переменных и файлов!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/config.py": "import os\nimport json\nfrom typing import Dict, Any\n\nclass Config:\n    def __init__(self):\n        self.default_config = {\n            'game': {\n                'width': 800,\n                'height': 600,\n                'grid_size': 20,\n                'fps': 60,\n                'difficulty': 'normal'\n            },\n            'colors': {\n                'background': (0, 0, 0),\n                'snake': (0, 255, 0),\n                'food': (255, 0, 0),\n                'ui': (255, 255, 255)\n            },\n            'audio': {\n                'enabled': True,\n                'volume': 0.7,\n                'music_volume': 0.5\n            },\n            'controls': {\n                'up': 'K_UP',\n                'down': 'K_DOWN', \n                'left': 'K_LEFT',\n                'right': 'K_RIGHT',\n                'pause': 'K_p'\n            }\n        }\n        self.user_config = {}\n        self.load_config()\n    \n    def load_config(self):\n        # Load from environment variables\n        env_config = {\n            'game': {\n                'width': int(os.getenv('GAME_WIDTH', self.default_config['game']['width'])),\n                'height': int(os.getenv('GAME_HEIGHT', self.default_config['game']['height'])),\n                'fps': int(os.getenv('GAME_FPS', self.default_config['game']['fps']))\n            },\n            'audio': {\n                'enabled': os.getenv('AUDIO_ENABLED', 'true').lower() == 'true',\n                'volume': float(os.getenv('AUDIO_VOLUME', self.default_config['audio']['volume']))\n            }\n        }\n        \n        # Load from config file\n        config_file = os.getenv('CONFIG_FILE', 'config.json')\n        if os.path.exists(config_file):\n            try:\n                with open(config_file, 'r') as f:\n                    file_config = json.load(f)\n                    self.merge_configs(self.user_config, file_config)\n            except (json.JSONDecodeError, IOError):\n                pass\n        \n        self.merge_configs(self.user_config, env_config)\n    \n    def merge_configs(self, target: Dict, source: Dict):\n        for key, value in source.items():\n            if key in target and isinstance(target[key], dict) and isinstance(value, dict):\n                self.merge_configs(target[key], value)\n            else:\n                target[key] = value\n    \n    def get(self, key_path: str, default=None):\n        keys = key_path.split('.')\n        value = self.user_config\n        \n        for key in keys:\n            if isinstance(value, dict) and key in value:\n                value = value[key]\n            else:\n                # Fallback to default config\n                value = self.default_config\n                for k in keys:\n                    if isinstance(value, dict) and k in value:\n                        value = value[k]\n                    else:\n                        return default\n                break\n        \n        return value if value is not None else default\n    \n    def set(self, key_path: str, value: Any):\n        keys = key_path.split('.')\n        config = self.user_config\n        \n        for key in keys[:-1]:\n            if key not in config:\n                config[key] = {}\n            config = config[key]\n        \n        config[keys[-1]] = value\n    \n    def save_to_file(self, filename='config.json'):\n        try:\n            with open(filename, 'w') as f:\n                json.dump(self.user_config, f, indent=2)\n            return True\n        except IOError:\n            return False\n\n# Global config instance\nconfig = Config()",
                        "config.example.json": "{\n  \"game\": {\n    \"width\": 800,\n    \"height\": 600,\n    \"fps\": 60\n  },\n  \"audio\": {\n    \"enabled\": true,\n    \"volume\": 0.7\n  }\n}"
                    }
                },
                {
                    text: "Простой config.py с константами",
                    command: "cat > src/config.py << 'EOF'\n# Game configuration\nGAME_WIDTH = 800\nGAME_HEIGHT = 600\nGRID_SIZE = 20\nFPS = 60\n\n# Colors\nBACKGROUND_COLOR = (0, 0, 0)\nSNAKE_COLOR = (0, 255, 0)\nFOOD_COLOR = (255, 0, 0)\nTEXT_COLOR = (255, 255, 255)\n\n# Game settings\nINITIAL_SNAKE_LENGTH = 3\nSNAKE_SPEED = 10\nSCORE_PER_FOOD = 10\nEOF",
                    feedback: "⚠️ Простая конфигурация создана",
                    story: "🔧 Хорошо, но нет возможности менять настройки без изменения кода!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/config.py": "# Game configuration\nGAME_WIDTH = 800\nGAME_HEIGHT = 600\nGRID_SIZE = 20\nFPS = 60\n\n# Colors\nBACKGROUND_COLOR = (0, 0, 0)\nSNAKE_COLOR = (0, 255, 0)\nFOOD_COLOR = (255, 0, 0)\nTEXT_COLOR = (255, 255, 255)\n\n# Game settings\nINITIAL_SNAKE_LENGTH = 3\nSNAKE_SPEED = 10\nSCORE_PER_FOOD = 10"
                    }
                },
                {
                    text: "Хардкод настроек в основном классе",
                    command: "cat >> src/game/game.py << 'EOF'\n# Hardcoded settings\nSCREEN_WIDTH = 800\nSCREEN_HEIGHT = 600\nSNAKE_SIZE = 20\nGAME_FPS = 60\nEOF",
                    feedback: "❌ Настройки захардкожены в коде",
                    story: "💀 Хардкод усложняет изменение настроек!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без конфигурации - все константы в коде",
                    command: "echo '# Используем значения по умолчанию в коде' >> src/game/game.py",
                    feedback: "❌ Система конфигурации не создана",
                    story: "🔧 Без конфигурации невозможно адаптировать игру под разные нужды!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 22,
            title: "🎨 Улучшение графики",
            description: "Добавляем улучшенную графику и анимации.",
            question: "Как улучшить графику?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Система спрайтов с анимациями и эффектами",
                    command: "cat > src/graphics/sprite_manager.py << 'EOF'\nimport pygame\nimport os\nfrom typing import Dict, List\n\nclass Sprite:\n    def __init__(self, images: List[pygame.Surface], animation_speed: float = 0.1):\n        self.images = images\n        self.current_frame = 0\n        self.animation_speed = animation_speed\n        self.animation_timer = 0.0\n        self.loop = True\n    \n    def update(self, dt: float):\n        if len(self.images) > 1:\n            self.animation_timer += dt\n            if self.animation_timer >= self.animation_speed:\n                self.animation_timer = 0\n                self.current_frame += 1\n                if self.current_frame >= len(self.images):\n                    if self.loop:\n                        self.current_frame = 0\n                    else:\n                        self.current_frame = len(self.images) - 1\n    \n    def get_current_image(self) -> pygame.Surface:\n        return self.images[self.current_frame]\n    \n    def reset(self):\n        self.current_frame = 0\n        self.animation_timer = 0.0\n\nclass SpriteManager:\n    def __init__(self):\n        self.sprites: Dict[str, Sprite] = {}\n        self.particle_systems: List = []\n    \n    def load_sprite_sheet(self, name: str, filename: str, frame_size: tuple, frames: int = 1) -> bool:\n        try:\n            if not os.path.exists(filename):\n                return False\n            \n            sheet = pygame.image.load(filename).convert_alpha()\n            sprite_frames = []\n            \n            for i in range(frames):\n                frame = pygame.Surface(frame_size, pygame.SRCALPHA)\n                frame.blit(sheet, (0, 0), (i * frame_size[0], 0, frame_size[0], frame_size[1]))\n                sprite_frames.append(frame)\n            \n            self.sprites[name] = Sprite(sprite_frames)\n            return True\n        except pygame.error:\n            return False\n    \n    def get_sprite(self, name: str) -> Sprite:\n        return self.sprites.get(name)\n    \n    def create_particle_effect(self, position: tuple, color: tuple, count: int = 10):\n        particles = []\n        for _ in range(count):\n            particle = {\n                'pos': list(position),\n                'vel': [pygame.math.Vector2(1, 0).rotate(i * 360/count) * 3 for i in range(count)],\n                'color': color,\n                'size': pygame.math.Vector2(2, 2),\n                'life': 1.0\n            }\n            particles.append(particle)\n        self.particle_systems.append(particles)\n    \n    def update_particles(self, dt: float):\n        for system in self.particle_systems[:]:\n            for particle in system[:]:\n                particle['life'] -= dt * 2\n                particle['pos'][0] += particle['vel'][0]\n                particle['pos'][1] += particle['vel'][1]\n                particle['size'][0] -= dt\n                particle['size'][1] -= dt\n                \n                if particle['life'] <= 0:\n                    system.remove(particle)\n            \n            if not system:\n                self.particle_systems.remove(system)\n    \n    def draw_particles(self, screen: pygame.Surface):\n        for system in self.particle_systems:\n            for particle in system:\n                alpha = int(255 * particle['life'])\n                color = (*particle['color'][:3], alpha)\n                size = max(1, int(particle['size'][0]))\n                pygame.draw.circle(screen, color, (int(particle['pos'][0]), int(particle['pos'][1])), size)\n\n# Create placeholder graphics\nmkdir -p assets/graphics\necho \"# Snake head sprite sheet\" > assets/graphics/snake_head.png\necho \"# Food sprite\" > assets/graphics/food.png\necho \"# Background texture\" > assets/graphics/background.jpg\nEOF",
                    feedback: "✅ Продвинутая система графики создана",
                    story: "🎨 Отлично! Профессиональная графика с анимациями и эффектами!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/graphics/sprite_manager.py": "import pygame\nimport os\nfrom typing import Dict, List\n\nclass Sprite:\n    def __init__(self, images: List[pygame.Surface], animation_speed: float = 0.1):\n        self.images = images\n        self.current_frame = 0\n        self.animation_speed = animation_speed\n        self.animation_timer = 0.0\n        self.loop = True\n    \n    def update(self, dt: float):\n        if len(self.images) > 1:\n            self.animation_timer += dt\n            if self.animation_timer >= self.animation_speed:\n                self.animation_timer = 0\n                self.current_frame += 1\n                if self.current_frame >= len(self.images):\n                    if self.loop:\n                        self.current_frame = 0\n                    else:\n                        self.current_frame = len(self.images) - 1\n    \n    def get_current_image(self) -> pygame.Surface:\n        return self.images[self.current_frame]\n    \n    def reset(self):\n        self.current_frame = 0\n        self.animation_timer = 0.0\n\nclass SpriteManager:\n    def __init__(self):\n        self.sprites: Dict[str, Sprite] = {}\n        self.particle_systems: List = []\n    \n    def load_sprite_sheet(self, name: str, filename: str, frame_size: tuple, frames: int = 1) -> bool:\n        try:\n            if not os.path.exists(filename):\n                return False\n            \n            sheet = pygame.image.load(filename).convert_alpha()\n            sprite_frames = []\n            \n            for i in range(frames):\n                frame = pygame.Surface(frame_size, pygame.SRCALPHA)\n                frame.blit(sheet, (0, 0), (i * frame_size[0], 0, frame_size[0], frame_size[1]))\n                sprite_frames.append(frame)\n            \n            self.sprites[name] = Sprite(sprite_frames)\n            return True\n        except pygame.error:\n            return False\n    \n    def get_sprite(self, name: str) -> Sprite:\n        return self.sprites.get(name)\n    \n    def create_particle_effect(self, position: tuple, color: tuple, count: int = 10):\n        particles = []\n        for _ in range(count):\n            particle = {\n                'pos': list(position),\n                'vel': [pygame.math.Vector2(1, 0).rotate(i * 360/count) * 3 for i in range(count)],\n                'color': color,\n                'size': pygame.math.Vector2(2, 2),\n                'life': 1.0\n            }\n            particles.append(particle)\n        self.particle_systems.append(particles)\n    \n    def update_particles(self, dt: float):\n        for system in self.particle_systems[:]:\n            for particle in system[:]:\n                particle['life'] -= dt * 2\n                particle['pos'][0] += particle['vel'][0]\n                particle['pos'][1] += particle['vel'][1]\n                particle['size'][0] -= dt\n                particle['size'][1] -= dt\n                \n                if particle['life'] <= 0:\n                    system.remove(particle)\n            \n            if not system:\n                self.particle_systems.remove(system)\n    \n    def draw_particles(self, screen: pygame.Surface):\n        for system in self.particle_systems:\n            for particle in system:\n                alpha = int(255 * particle['life'])\n                color = (*particle['color'][:3], alpha)\n                size = max(1, int(particle['size'][0]))\n                pygame.draw.circle(screen, color, (int(particle['pos'][0]), int(particle['pos'][1])), size)",
                        "assets/graphics/": "DIR"
                    }
                },
                {
                    text: "Базовые спрайты вместо примитивов",
                    command: "cat > src/graphics.py << 'EOF'\nimport pygame\n\nclass Graphics:\n    def __init__(self):\n        self.images = {}\n    \n    def load_image(self, name, path):\n        try:\n            self.images[name] = pygame.image.load(path)\n        except pygame.error:\n            print(f\"Could not load image: {path}\")\n    \n    def get_image(self, name):\n        return self.images.get(name)\nEOF\nmkdir -p assets/images",
                    feedback: "⚠️ Базовая система графики создана",
                    story: "🎨 Хорошо, но нет анимаций и эффектов!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/graphics.py": "import pygame\n\nclass Graphics:\n    def __init__(self):\n        self.images = {}\n    \n    def load_image(self, name, path):\n        try:\n            self.images[name] = pygame.image.load(path)\n        except pygame.error:\n            print(f\"Could not load image: {path}\")\n    \n    def get_image(self, name):\n        return self.images.get(name)"
                    }
                },
                {
                    text: "Использовать только геометрические фигуры",
                    command: "echo '# Оставляем простые фигуры' >> src/game/game.py",
                    feedback: "❌ Графика осталась примитивной",
                    story: "⚫ Простые фигуры выглядят скучно!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без улучшений - и так нормально",
                    command: "echo '# Графика не улучшаем' > graphics_notes.txt",
                    feedback: "❌ Графика не улучшена",
                    story: "🎨 Визуальное качество важно для игрового опыта!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 23,
            title: "🔍 Логирование",
            description: "Добавляем систему логирования для отладки.",
            question: "Как настроить логирование?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Продвинутая система логирования с ротацией",
                    command: "cat > src/utils/logger.py << 'EOF'\nimport logging\nimport os\nfrom logging.handlers import RotatingFileHandler\nfrom datetime import datetime\n\nclass GameLogger:\n    def __init__(self, name='snake_game', log_dir='logs', max_bytes=10*1024*1024, backup_count=5):\n        self.logger = logging.getLogger(name)\n        self.logger.setLevel(logging.DEBUG)\n        \n        # Create log directory\n        os.makedirs(log_dir, exist_ok=True)\n        \n        # Formatter\n        formatter = logging.Formatter(\n            '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',\n            datefmt='%Y-%m-%d %H:%M:%S'\n        )\n        \n        # File handler with rotation\n        log_file = os.path.join(log_dir, f'snake_game_{datetime.now().strftime(\"%Y%m%d\")}.log')\n        file_handler = RotatingFileHandler(\n            log_file,\n            maxBytes=max_bytes,\n            backupCount=backup_count,\n            encoding='utf-8'\n        )\n        file_handler.setLevel(logging.DEBUG)\n        file_handler.setFormatter(formatter)\n        \n        # Console handler\n        console_handler = logging.StreamHandler()\n        console_handler.setLevel(logging.INFO)\n        console_handler.setFormatter(formatter)\n        \n        # Add handlers\n        self.logger.addHandler(file_handler)\n        self.logger.addHandler(console_handler)\n        \n        # Log initialization\n        self.logger.info('Game logger initialized')\n    \n    def debug(self, message, *args, **kwargs):\n        self.logger.debug(message, *args, **kwargs)\n    \n    def info(self, message, *args, **kwargs):\n        self.logger.info(message, *args, **kwargs)\n    \n    def warning(self, message, *args, **kwargs):\n        self.logger.warning(message, *args, **kwargs)\n    \n    def error(self, message, *args, **kwargs):\n        self.logger.error(message, *args, **kwargs)\n    \n    def critical(self, message, *args, **kwargs):\n        self.logger.critical(message, *args, **kwargs)\n    \n    def log_performance(self, operation: str, duration: float):\n        if duration > 0.1:  # Log slow operations\n            self.warning(f'Slow operation: {operation} took {duration:.3f}s')\n        else:\n            self.debug(f'Operation: {operation} took {duration:.3f}s')\n    \n    def log_game_event(self, event_type: str, **details):\n        details_str = ' '.join(f'{k}={v}' for k, v in details.items())\n        self.info(f'Game event: {event_type} - {details_str}')\n\n# Global logger instance\ngame_logger = GameLogger()\n\n# Example usage:\n# game_logger.info('Game started')\n# game_logger.log_game_event('food_eaten', score=100, position=(100, 200))\nEOF",
                    feedback: "✅ Продвинутая система логирования создана",
                    story: "🔍 Отлично! Детальное логирование поможет в отладке и анализе!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/utils/logger.py": "import logging\nimport os\nfrom logging.handlers import RotatingFileHandler\nfrom datetime import datetime\n\nclass GameLogger:\n    def __init__(self, name='snake_game', log_dir='logs', max_bytes=10*1024*1024, backup_count=5):\n        self.logger = logging.getLogger(name)\n        self.logger.setLevel(logging.DEBUG)\n        \n        # Create log directory\n        os.makedirs(log_dir, exist_ok=True)\n        \n        # Formatter\n        formatter = logging.Formatter(\n            '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',\n            datefmt='%Y-%m-%d %H:%M:%S'\n        )\n        \n        # File handler with rotation\n        log_file = os.path.join(log_dir, f'snake_game_{datetime.now().strftime(\"%Y%m%d\")}.log')\n        file_handler = RotatingFileHandler(\n            log_file,\n            maxBytes=max_bytes,\n            backupCount=backup_count,\n            encoding='utf-8'\n        )\n        file_handler.setLevel(logging.DEBUG)\n        file_handler.setFormatter(formatter)\n        \n        # Console handler\n        console_handler = logging.StreamHandler()\n        console_handler.setLevel(logging.INFO)\n        console_handler.setFormatter(formatter)\n        \n        # Add handlers\n        self.logger.addHandler(file_handler)\n        self.logger.addHandler(console_handler)\n        \n        # Log initialization\n        self.logger.info('Game logger initialized')\n    \n    def debug(self, message, *args, **kwargs):\n        self.logger.debug(message, *args, **kwargs)\n    \n    def info(self, message, *args, **kwargs):\n        self.logger.info(message, *args, **kwargs)\n    \n    def warning(self, message, *args, **kwargs):\n        self.logger.warning(message, *args, **kwargs)\n    \n    def error(self, message, *args, **kwargs):\n        self.logger.error(message, *args, **kwargs)\n    \n    def critical(self, message, *args, **kwargs):\n        self.logger.critical(message, *args, **kwargs)\n    \n    def log_performance(self, operation: str, duration: float):\n        if duration > 0.1:  # Log slow operations\n            self.warning(f'Slow operation: {operation} took {duration:.3f}s')\n        else:\n            self.debug(f'Operation: {operation} took {duration:.3f}s')\n    \n    def log_game_event(self, event_type: str, **details):\n        details_str = ' '.join(f'{k}={v}' for k, v in details.items())\n        self.info(f'Game event: {event_type} - {details_str}')\n\n# Global logger instance\ngame_logger = GameLogger()"
                    }
                },
                {
                    text: "Базовое логирование в файл",
                    command: "cat > src/logger.py << 'EOF'\nimport logging\nimport os\n\nclass SimpleLogger:\n    def __init__(self):\n        os.makedirs('logs', exist_ok=True)\n        logging.basicConfig(\n            level=logging.INFO,\n            format='%(asctime)s - %(levelname)s - %(message)s',\n            handlers=[\n                logging.FileHandler('logs/game.log'),\n                logging.StreamHandler()\n            ]\n        )\n        self.logger = logging.getLogger('snake_game')\n    \n    def info(self, message):\n        self.logger.info(message)\n    \n    def error(self, message):\n        self.logger.error(message)\nEOF",
                    feedback: "⚠️ Базовая система логирования создана",
                    story: "🔍 Хорошо, но нет ротации и детальных форматов!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/logger.py": "import logging\nimport os\n\nclass SimpleLogger:\n    def __init__(self):\n        os.makedirs('logs', exist_ok=True)\n        logging.basicConfig(\n            level=logging.INFO,\n            format='%(asctime)s - %(levelname)s - %(message)s',\n            handlers=[\n                logging.FileHandler('logs/game.log'),\n                logging.StreamHandler()\n            ]\n        )\n        self.logger = logging.getLogger('snake_game')\n    \n    def info(self, message):\n        self.logger.info(message)\n    \n    def error(self, message):\n        self.logger.error(message)"
                    }
                },
                {
                    text: "Логирование через print",
                    command: "cat > src/debug.py << 'EOF'\n# Simple debug logging\ndef log(message):\n    print(f\"[LOG] {message}\")\n\ndef error(message):\n    print(f\"[ERROR] {message}\")\nEOF",
                    feedback: "❌ Примитивное логирование через print",
                    story: "🖨️ Print statements не подходят для production!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без логирования - отлаживать через вывод",
                    command: "echo '# Логирование не нужно' > debug_notes.txt",
                    feedback: "❌ Система логирования не создана",
                    story: "🔍 Без логирования сложно находить ошибки в production!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 24,
            title: "🎮 Управление состоянием",
            description: "Рефакторим код для управления состояниями игры.",
            question: "Как улучшить архитектуру состояний?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "State Machine с событиями и переходами",
                    command: "cat > src/game/states.py << 'EOF'\nfrom enum import Enum\nfrom typing import Callable, Dict, Any\nimport pygame\n\nclass GameState(Enum):\n    BOOT = \"boot\"\n    MENU = \"menu\"\n    PLAYING = \"playing\"\n    PAUSED = \"paused\"\n    GAME_OVER = \"game_over\"\n    HIGH_SCORES = \"high_scores\"\n    SETTINGS = \"settings\"\n    EXIT = \"exit\"\n\nclass StateTransition:\n    def __init__(self, from_state: GameState, to_state: GameState, condition: Callable[[], bool] = None):\n        self.from_state = from_state\n        self.to_state = to_state\n        self.condition = condition or (lambda: True)\n\nclass StateMachine:\n    def __init__(self):\n        self.state = GameState.BOOT\n        self.previous_state = None\n        self.transitions: Dict[GameState, list] = {}\n        self.state_handlers: Dict[GameState, Callable] = {}\n        self.enter_handlers: Dict[GameState, Callable] = {}\n        self.exit_handlers: Dict[GameState, Callable] = {}\n    \n    def add_transition(self, transition: StateTransition):\n        if transition.from_state not in self.transitions:\n            self.transitions[transition.from_state] = []\n        self.transitions[transition.from_state].append(transition)\n    \n    def set_state_handler(self, state: GameState, handler: Callable):\n        self.state_handlers[state] = handler\n    \n    def set_enter_handler(self, state: GameState, handler: Callable):\n        self.enter_handlers[state] = handler\n    \n    def set_exit_handler(self, state: GameState, handler: Callable):\n        self.exit_handlers[state] = handler\n    \n    def change_state(self, new_state: GameState):\n        if new_state != self.state:\n            # Call exit handler for current state\n            if self.state in self.exit_handlers:\n                self.exit_handlers[self.state]()\n            \n            self.previous_state = self.state\n            self.state = new_state\n            \n            # Call enter handler for new state\n            if new_state in self.enter_handlers:\n                self.enter_handlers[new_state]()\n    \n    def update(self):\n        # Check for automatic transitions\n        if self.state in self.transitions:\n            for transition in self.transitions[self.state]:\n                if transition.condition():\n                    self.change_state(transition.to_state)\n                    break\n        \n        # Call state handler\n        if self.state in self.state_handlers:\n            self.state_handlers[self.state]()\n    \n    def handle_event(self, event: pygame.event.Event):\n        # State-specific event handling can be implemented here\n        pass\n    \n    def can_transition_to(self, state: GameState) -> bool:\n        if self.state in self.transitions:\n            return any(transition.to_state == state and transition.condition() \n                      for transition in self.transitions[self.state])\n        return False\n\n# Example usage:\n# state_machine = StateMachine()\n# \n# # Add transition from MENU to PLAYING when start game is selected\n# state_machine.add_transition(StateTransition(\n#     GameState.MENU, \n#     GameState.PLAYING,\n#     lambda: start_game_selected\n# ))\n# \n# # Set state handlers\n# state_machine.set_state_handler(GameState.PLAYING, game_playing_update)\n# state_machine.set_enter_handler(GameState.PLAYING, game_playing_enter)\n# state_machine.set_exit_handler(GameState.PLAYING, game_playing_exit)\nEOF",
                    feedback: "✅ Продвинутая State Machine создана",
                    story: "🎮 Отлично! Чистая архитектура состояний облегчит добавление новых фич!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "src/game/states.py": "from enum import Enum\nfrom typing import Callable, Dict, Any\nimport pygame\n\nclass GameState(Enum):\n    BOOT = \"boot\"\n    MENU = \"menu\"\n    PLAYING = \"playing\"\n    PAUSED = \"paused\"\n    GAME_OVER = \"game_over\"\n    HIGH_SCORES = \"high_scores\"\n    SETTINGS = \"settings\"\n    EXIT = \"exit\"\n\nclass StateTransition:\n    def __init__(self, from_state: GameState, to_state: GameState, condition: Callable[[], bool] = None):\n        self.from_state = from_state\n        self.to_state = to_state\n        self.condition = condition or (lambda: True)\n\nclass StateMachine:\n    def __init__(self):\n        self.state = GameState.BOOT\n        self.previous_state = None\n        self.transitions: Dict[GameState, list] = {}\n        self.state_handlers: Dict[GameState, Callable] = {}\n        self.enter_handlers: Dict[GameState, Callable] = {}\n        self.exit_handlers: Dict[GameState, Callable] = {}\n    \n    def add_transition(self, transition: StateTransition):\n        if transition.from_state not in self.transitions:\n            self.transitions[transition.from_state] = []\n        self.transitions[transition.from_state].append(transition)\n    \n    def set_state_handler(self, state: GameState, handler: Callable):\n        self.state_handlers[state] = handler\n    \n    def set_enter_handler(self, state: GameState, handler: Callable):\n        self.enter_handlers[state] = handler\n    \n    def set_exit_handler(self, state: GameState, handler: Callable):\n        self.exit_handlers[state] = handler\n    \n    def change_state(self, new_state: GameState):\n        if new_state != self.state:\n            # Call exit handler for current state\n            if self.state in self.exit_handlers:\n                self.exit_handlers[self.state]()\n            \n            self.previous_state = self.state\n            self.state = new_state\n            \n            # Call enter handler for new state\n            if new_state in self.enter_handlers:\n                self.enter_handlers[new_state]()\n    \n    def update(self):\n        # Check for automatic transitions\n        if self.state in self.transitions:\n            for transition in self.transitions[self.state]:\n                if transition.condition():\n                    self.change_state(transition.to_state)\n                    break\n        \n        # Call state handler\n        if self.state in self.state_handlers:\n            self.state_handlers[self.state]()\n    \n    def handle_event(self, event: pygame.event.Event):\n        # State-specific event handling can be implemented here\n        pass\n    \n    def can_transition_to(self, state: GameState) -> bool:\n        if self.state in self.transitions:\n            return any(transition.to_state == state and transition.condition() \n                      for transition in self.transitions[self.state])\n        return False"
                    }
                },
                {
                    text: "Простая State Machine",
                    command: "cat > src/states.py << 'EOF'\nfrom enum import Enum\n\nclass GameState(Enum):\n    MENU = \"menu\"\n    PLAYING = \"playing\"\n    GAME_OVER = \"game_over\"\n    HIGH_SCORES = \"high_scores\"\n\nclass StateManager:\n    def __init__(self):\n        self.state = GameState.MENU\n    \n    def change_state(self, new_state):\n        self.state = new_state\n    \n    def get_state(self):\n        return self.state\nEOF",
                    feedback: "⚠️ Простая State Machine создана",
                    story: "🎮 Хорошо, но нет обработки переходов и событий!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "src/states.py": "from enum import Enum\n\nclass GameState(Enum):\n    MENU = \"menu\"\n    PLAYING = \"playing\"\n    GAME_OVER = \"game_over\"\n    HIGH_SCORES = \"high_scores\"\n\nclass StateManager:\n    def __init__(self):\n        self.state = GameState.MENU\n    \n    def change_state(self, new_state):\n        self.state = new_state\n    \n    def get_state(self):\n        return self.state"
                    }
                },
                {
                    text: "Флаги вместо состояний",
                    command: "cat >> src/game/game.py << 'EOF'\n# Use flags instead of state machine\nself.in_menu = True\nself.playing = False\nself.game_over = False\nEOF",
                    feedback: "❌ Флаги вместо State Machine",
                    story: "🚩 Флаги могут привести к противоречивым состояниям!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без управления состояниями",
                    command: "echo '# Без state machine' >> src/game/game.py",
                    feedback: "❌ Управление состояниями не реализовано",
                    story: "💀 Без State Machine код становится спагетти!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 25,
            title: "📦 Сборка релиза",
            description: "Создаем скрипт для сборки релизной версии.",
            question: "Как собрать релиз?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Автоматизированная система сборки с версионированием",
                    command: "cat > scripts/build_release.py << 'EOF'\n#!/usr/bin/env python3\nimport os\nimport shutil\nimport subprocess\nimport json\nfrom datetime import datetime\nfrom pathlib import Path\n\nclass ReleaseBuilder:\n    def __init__(self, version=None):\n        self.version = version or self.get_version()\n        self.build_dir = Path(f\"build/snake-game-{self.version}\")\n        self.dist_dir = Path(\"dist\")\n        \n    def get_version(self):\n        try:\n            with open(\"pyproject.toml\", \"r\") as f:\n                for line in f:\n                    if \"version\" in line:\n                        return line.split(\"=\")[1].strip().strip('\"')\n        except:\n            pass\n        return f\"1.0.0-{datetime.now().strftime('%Y%m%d')}\"\n    \n    def clean_build(self):\n        if self.build_dir.exists():\n            shutil.rmtree(self.build_dir)\n        if self.dist_dir.exists():\n            shutil.rmtree(self.dist_dir)\n        self.build_dir.mkdir(parents=True)\n        self.dist_dir.mkdir(parents=True)\n    \n    def copy_source_files(self):\n        # Copy source code\n        shutil.copytree(\"src\", self.build_dir / \"src\")\n        \n        # Copy assets\n        if Path(\"assets\").exists():\n            shutil.copytree(\"assets\", self.build_dir / \"assets\")\n        \n        # Copy required files\n        for file in [\"requirements.txt\", \"README.md\", \"LICENSE\", \"config.example.json\"]:\n            if Path(file).exists():\n                shutil.copy2(file, self.build_dir / file)\n    \n    def generate_metadata(self):\n        metadata = {\n            \"name\": \"snake-game\",\n            \"version\": self.version,\n            \"build_date\": datetime.now().isoformat(),\n            \"python_version\": \"3.8+\",\n            \"dependencies\": []\n        }\n        \n        # Read dependencies\n        if Path(\"requirements.txt\").exists():\n            with open(\"requirements.txt\", \"r\") as f:\n                metadata[\"dependencies\"] = [line.strip() for line in f if line.strip()]\n        \n        with open(self.build_dir / \"build_info.json\", \"w\") as f:\n            json.dump(metadata, f, indent=2)\n    \n    def create_launch_scripts(self):\n        # Windows batch script\n        with open(self.build_dir / \"run.bat\", \"w\") as f:\n            f.write(\"\"\"@echo off\npython -m src.game.game\npause\n\"\"\")\n        \n        # Unix shell script\n        with open(self.build_dir / \"run.sh\", \"w\") as f:\n            f.write(\"\"\"#!/bin/bash\ncd \"$(dirname \"$0\")\"\npython -m src.game.game\n\"\"\")\n        os.chmod(self.build_dir / \"run.sh\", 0o755)\n    \n    def run_tests(self):\n        print(\"Running tests...\")\n        try:\n            subprocess.run([\"pytest\", \"tests/\"], check=True, capture_output=True)\n            print(\"✓ All tests passed\")\n            return True\n        except subprocess.CalledProcessError:\n            print(\"✗ Tests failed!\")\n            return False\n    \n    def create_archives(self):\n        print(\"Creating distribution archives...\")\n        \n        # Create ZIP archive\n        zip_path = self.dist_dir / f\"snake-game-{self.version}.zip\"\n        shutil.make_archive(\n            str(self.dist_dir / f\"snake-game-{self.version}\"),\n            'zip',\n            self.build_dir.parent,\n            self.build_dir.name\n        )\n        \n        # Create tar.gz archive\n        tar_path = self.dist_dir / f\"snake-game-{self.version}.tar.gz\"\n        shutil.make_archive(\n            str(self.dist_dir / f\"snake-game-{self.version}\"),\n            'gztar',\n            self.build_dir.parent,\n            self.build_dir.name\n        )\n        \n        print(f\"✓ Created {zip_path}\")\n        print(f\"✓ Created {tar_path}\")\n    \n    def build(self):\n        print(f\"Building Snake Game v{self.version}...\")\n        \n        if not self.run_tests():\n            return False\n        \n        self.clean_build()\n        self.copy_source_files()\n        self.generate_metadata()\n        self.create_launch_scripts()\n        self.create_archives()\n        \n        print(f\"✓ Build completed successfully!\")\n        print(f\"✓ Distribution files in: {self.dist_dir}\")\n        return True\n\nif __name__ == \"__main__\":\n    import sys\n    version = sys.argv[1] if len(sys.argv) > 1 else None\n    builder = ReleaseBuilder(version)\n    success = builder.build()\n    exit(0 if success else 1)\nEOF\n\n# Create pyproject.toml for versioning\ncat > pyproject.toml << 'EOF'\n[build-system]\nrequires = [\"setuptools\", \"wheel\"]\nbuild-backend = \"setuptools.build_meta\"\n\n[project]\nname = \"snake-game\"\nversion = \"1.0.0\"\ndescription = \"A classic Snake game built with Python and Pygame\"\nauthors = [{name = \"Game Developer\", email = \"dev@example.com\"}]\nlicense = {text = \"MIT\"}\nreadme = \"README.md\"\nrequires-python = \">=3.8\"\n\n[project.scripts]\nsnake-game = \"src.game.game:main\"\n\n[tool.setuptools.packages.find]\nwhere = [\".\"]\ninclude = [\"src*\"]\nEOF\n\nmkdir -p scripts",
                    feedback: "✅ Продвинутая система сборки создана",
                    story: "📦 Отлично! Автоматизированная сборка с версионированием!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "scripts/build_release.py": "#!/usr/bin/env python3\nimport os\nimport shutil\nimport subprocess\nimport json\nfrom datetime import datetime\nfrom pathlib import Path\n\nclass ReleaseBuilder:\n    def __init__(self, version=None):\n        self.version = version or self.get_version()\n        self.build_dir = Path(f\"build/snake-game-{self.version}\")\n        self.dist_dir = Path(\"dist\")\n        \n    def get_version(self):\n        try:\n            with open(\"pyproject.toml\", \"r\") as f:\n                for line in f:\n                    if \"version\" in line:\n                        return line.split(\"=\")[1].strip().strip('\"')\n        except:\n            pass\n        return f\"1.0.0-{datetime.now().strftime('%Y%m%d')}\"\n    \n    def clean_build(self):\n        if self.build_dir.exists():\n            shutil.rmtree(self.build_dir)\n        if self.dist_dir.exists():\n            shutil.rmtree(self.dist_dir)\n        self.build_dir.mkdir(parents=True)\n        self.dist_dir.mkdir(parents=True)\n    \n    def copy_source_files(self):\n        # Copy source code\n        shutil.copytree(\"src\", self.build_dir / \"src\")\n        \n        # Copy assets\n        if Path(\"assets\").exists():\n            shutil.copytree(\"assets\", self.build_dir / \"assets\")\n        \n        # Copy required files\n        for file in [\"requirements.txt\", \"README.md\", \"LICENSE\", \"config.example.json\"]:\n            if Path(file).exists():\n                shutil.copy2(file, self.build_dir / file)\n    \n    def generate_metadata(self):\n        metadata = {\n            \"name\": \"snake-game\",\n            \"version\": self.version,\n            \"build_date\": datetime.now().isoformat(),\n            \"python_version\": \"3.8+\",\n            \"dependencies\": []\n        }\n        \n        # Read dependencies\n        if Path(\"requirements.txt\").exists():\n            with open(\"requirements.txt\", \"r\") as f:\n                metadata[\"dependencies\"] = [line.strip() for line in f if line.strip()]\n        \n        with open(self.build_dir / \"build_info.json\", \"w\") as f:\n            json.dump(metadata, f, indent=2)\n    \n    def create_launch_scripts(self):\n        # Windows batch script\n        with open(self.build_dir / \"run.bat\", \"w\") as f:\n            f.write(\"\"\"@echo off\npython -m src.game.game\npause\n\"\"\")\n        \n        # Unix shell script\n        with open(self.build_dir / \"run.sh\", \"w\") as f:\n            f.write(\"\"\"#!/bin/bash\ncd \"$(dirname \"$0\")\"\npython -m src.game.game\n\"\"\")\n        os.chmod(self.build_dir / \"run.sh\", 0o755)\n    \n    def run_tests(self):\n        print(\"Running tests...\")\n        try:\n            subprocess.run([\"pytest\", \"tests/\"], check=True, capture_output=True)\n            print(\"✓ All tests passed\")\n            return True\n        except subprocess.CalledProcessError:\n            print(\"✗ Tests failed!\")\n            return False\n    \n    def create_archives(self):\n        print(\"Creating distribution archives...\")\n        \n        # Create ZIP archive\n        zip_path = self.dist_dir / f\"snake-game-{self.version}.zip\"\n        shutil.make_archive(\n            str(self.dist_dir / f\"snake-game-{self.version}\"),\n            'zip',\n            self.build_dir.parent,\n            self.build_dir.name\n        )\n        \n        # Create tar.gz archive\n        tar_path = self.dist_dir / f\"snake-game-{self.version}.tar.gz\"\n        shutil.make_archive(\n            str(self.dist_dir / f\"snake-game-{self.version}\"),\n            'gztar',\n            self.build_dir.parent,\n            self.build_dir.name\n        )\n        \n        print(f\"✓ Created {zip_path}\")\n        print(f\"✓ Created {tar_path}\")\n    \n    def build(self):\n        print(f\"Building Snake Game v{self.version}...\")\n        \n        if not self.run_tests():\n            return False\n        \n        self.clean_build()\n        self.copy_source_files()\n        self.generate_metadata()\n        self.create_launch_scripts()\n        self.create_archives()\n        \n        print(f\"✓ Build completed successfully!\")\n        print(f\"✓ Distribution files in: {self.dist_dir}\")\n        return True\n\nif __name__ == \"__main__\":\n    import sys\n    version = sys.argv[1] if len(sys.argv) > 1 else None\n    builder = ReleaseBuilder(version)\n    success = builder.build()\n    exit(0 if success else 1)",
                        "pyproject.toml": "[build-system]\nrequires = [\"setuptools\", \"wheel\"]\nbuild-backend = \"setuptools.build_meta\"\n\n[project]\nname = \"snake-game\"\nversion = \"1.0.0\"\ndescription = \"A classic Snake game built with Python and Pygame\"\nauthors = [{name = \"Game Developer\", email = \"dev@example.com\"}]\nlicense = {text = \"MIT\"}\nreadme = \"README.md\"\nrequires-python = \">=3.8\"\n\n[project.scripts]\nsnake-game = \"src.game.game:main\"\n\n[tool.setuptools.packages.find]\nwhere = [\".\"]\ninclude = [\"src*\"]"
                    }
                },
                {
                    text: "Простой bash скрипт для сборки",
                    command: "cat > build.sh << 'EOF'\n#!/bin/bash\n\necho \"Building Snake Game...\"\n\n# Clean build directory\nrm -rf build\nmkdir build\n\n# Copy necessary files\ncp -r src/ build/\ncp -r assets/ build/\ncp requirements.txt build/\ncp README.md build/\n\n# Create run script\ncat > build/run.sh << 'SCRIPTEOF'\n#!/bin/bash\ncd \"$(dirname \"$0\")\"\npip install -r requirements.txt\npython -m src.game.game\nSCRIPTEOF\n\nchmod +x build/run.sh\n\necho \"Build complete!\"\nEOF\nchmod +x build.sh",
                    feedback: "⚠️ Простой скрипт сборки создан",
                    story: "📦 Хорошо, но нет версионирования и автоматического тестирования!",
                    score: 1,
                    type: "warning",
                    architecture: {
                        "build.sh": "#!/bin/bash\n\necho \"Building Snake Game...\"\n\n# Clean build directory\nrm -rf build\nmkdir build\n\n# Copy necessary files\ncp -r src/ build/\ncp -r assets/ build/\ncp requirements.txt build/\ncp README.md build/\n\n# Create run script\ncat > build/run.sh << 'SCRIPTEOF'\n#!/bin/bash\ncd \"$(dirname \"$0\")\"\npip install -r requirements.txt\npython -m src.game.game\nSCRIPTEOF\n\nchmod +x build/run.sh\n\necho \"Build complete!\""
                    }
                },
                {
                    text: "Ручное копирование файлов",
                    command: "mkdir release\ncp -r src/ release/\ncp requirements.txt release/\necho \"Manual build created\"",
                    feedback: "❌ Ручная сборка создана",
                    story: "👐 Ручная сборка подвержена ошибкам!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без сборки - исходники как есть",
                    command: "echo '# Сборка не нужна' > build_notes.txt",
                    feedback: "❌ Система сборки не создана",
                    story: "📦 Без системы сборки сложно распространять игру!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        // Шаги 26-30 и итоговое окно...
        {
            id: 26,
            title: "🧪 Финальное тестирование",
            description: "Проводим comprehensive тестирование игры.",
            question: "Как протестировать игру?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Полный тестовый прогон с разными сценариями",
                    command: "cat > tests/integration_test.py << 'EOF'\nimport pytest\nimport pygame\nimport sys\nimport os\nsys.path.append('src')\n\nfrom game.game import Game\nfrom game.snake import Snake\nfrom game.food import Food\nfrom utils.scores import ScoreManager\n\nclass TestIntegration:\n    def test_game_initialization(self):\n        \"\"\"Test that game initializes correctly\"\"\"\n        game = Game()\n        assert game.screen is not None\n        assert game.clock is not None\n        assert game.running == True\n    \n    def test_snake_movement(self):\n        \"\"\"Test snake movement and growth\"\"\"\n        snake = Snake()\n        initial_length = len(snake.body)\n        \n        # Test movement\n        initial_head = snake.body[0]\n        snake.move()\n        new_head = snake.body[0]\n        assert new_head != initial_head\n        \n        # Test growth\n        snake.grow_snake()\n        snake.move()\n        assert len(snake.body) == initial_length + 1\n    \n    def test_food_generation(self):\n        \"\"\"Test food generation and collision\"\"\"\n        food = Food()\n        initial_position = food.position\n        \n        # Test randomization\n        food.randomize_position()\n        assert food.position != initial_position\n    \n    def test_score_system(self):\n        \"\"\"Test score saving and retrieval\"\"\"\n        score_manager = ScoreManager()\n        test_player = \"TestPlayer\"\n        test_score = 100\n        \n        # Save score\n        assert score_manager.save_score(test_player, test_score) == True\n        \n        # Check if score is in high scores\n        high_scores = score_manager.get_high_scores()\n        assert any(score['player'] == test_player and score['score'] == test_score \n                  for score in high_scores)\n    \n    def test_collision_detection(self):\n        \"\"\"Test wall and self collision\"\"\"\n        from game.collision import CollisionManager\n        \n        collision_mgr = CollisionManager(800, 600)\n        \n        # Test wall collision\n        assert collision_mgr.check_wall_collision((-10, 100)) == True\n        assert collision_mgr.check_wall_collision((100, -10)) == True\n        assert collision_mgr.check_wall_collision((810, 100)) == True\n        assert collision_mgr.check_wall_collision((100, 610)) == True\n        assert collision_mgr.check_wall_collision((400, 300)) == False\n        \n        # Test self collision\n        snake_body = [(100, 100), (90, 100), (100, 100)]  # Head touches body\n        assert collision_mgr.check_self_collision(snake_body) == True\n        \n        snake_body = [(100, 100), (90, 100), (80, 100)]  # No collision\n        assert collision_mgr.check_self_collision(snake_body) == False\n\nclass TestPerformance:\n    def test_game_performance(self):\n        \"\"\"Test that game maintains good performance\"\"\"\n        import time\n        \n        game = Game()\n        \n        # Test update performance\n        start_time = time.time()\n        for _ in range(1000):\n            game.update()\n        end_time = time.time()\n        \n        update_time = end_time - start_time\n        assert update_time < 1.0, f\"Update too slow: {update_time}s\"\n    \n    def test_memory_usage(self):\n        \"\"\"Test that game doesn't have memory leaks\"\"\"\n        import psutil\n        import os\n        \n        process = psutil.Process(os.getpid())\n        initial_memory = process.memory_info().rss\n        \n        # Create and destroy multiple game instances\n        for _ in range(100):\n            game = Game()\n            del game\n        \n        final_memory = process.memory_info().rss\n        memory_increase = final_memory - initial_memory\n        \n        # Allow some increase but not massive leaks\n        assert memory_increase < 10 * 1024 * 1024, f\"Memory leak: {memory_increase} bytes\"\n\nif __name__ == \"__main__\":\n    pytest.main([__file__, '-v', '--tb=short'])\nEOF\n\n# Run comprehensive tests\npython -m pytest tests/ -v --cov=src --cov-report=html\npython tests/integration_test.py",
                    feedback: "✅ Полное интеграционное тестирование выполнено",
                    story: "🧪 Отлично! Игра тщательно протестирована на всех уровнях!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "tests/integration_test.py": "import pytest\nimport pygame\nimport sys\nimport os\nsys.path.append('src')\n\nfrom game.game import Game\nfrom game.snake import Snake\nfrom game.food import Food\nfrom utils.scores import ScoreManager\n\nclass TestIntegration:\n    def test_game_initialization(self):\n        \"\"\"Test that game initializes correctly\"\"\"\n        game = Game()\n        assert game.screen is not None\n        assert game.clock is not None\n        assert game.running == True\n    \n    def test_snake_movement(self):\n        \"\"\"Test snake movement and growth\"\"\"\n        snake = Snake()\n        initial_length = len(snake.body)\n        \n        # Test movement\n        initial_head = snake.body[0]\n        snake.move()\n        new_head = snake.body[0]\n        assert new_head != initial_head\n        \n        # Test growth\n        snake.grow_snake()\n        snake.move()\n        assert len(snake.body) == initial_length + 1\n    \n    def test_food_generation(self):\n        \"\"\"Test food generation and collision\"\"\"\n        food = Food()\n        initial_position = food.position\n        \n        # Test randomization\n        food.randomize_position()\n        assert food.position != initial_position\n    \n    def test_score_system(self):\n        \"\"\"Test score saving and retrieval\"\"\"\n        score_manager = ScoreManager()\n        test_player = \"TestPlayer\"\n        test_score = 100\n        \n        # Save score\n        assert score_manager.save_score(test_player, test_score) == True\n        \n        # Check if score is in high scores\n        high_scores = score_manager.get_high_scores()\n        assert any(score['player'] == test_player and score['score'] == test_score \n                  for score in high_scores)\n    \n    def test_collision_detection(self):\n        \"\"\"Test wall and self collision\"\"\"\n        from game.collision import CollisionManager\n        \n        collision_mgr = CollisionManager(800, 600)\n        \n        # Test wall collision\n        assert collision_mgr.check_wall_collision((-10, 100)) == True\n        assert collision_mgr.check_wall_collision((100, -10)) == True\n        assert collision_mgr.check_wall_collision((810, 100)) == True\n        assert collision_mgr.check_wall_collision((100, 610)) == True\n        assert collision_mgr.check_wall_collision((400, 300)) == False\n        \n        # Test self collision\n        snake_body = [(100, 100), (90, 100), (100, 100)]  # Head touches body\n        assert collision_mgr.check_self_collision(snake_body) == True\n        \n        snake_body = [(100, 100), (90, 100), (80, 100)]  # No collision\n        assert collision_mgr.check_self_collision(snake_body) == False\n\nclass TestPerformance:\n    def test_game_performance(self):\n        \"\"\"Test that game maintains good performance\"\"\"\n        import time\n        \n        game = Game()\n        \n        # Test update performance\n        start_time = time.time()\n        for _ in range(1000):\n            game.update()\n        end_time = time.time()\n        \n        update_time = end_time - start_time\n        assert update_time < 1.0, f\"Update too slow: {update_time}s\"\n    \n    def test_memory_usage(self):\n        \"\"\"Test that game doesn't have memory leaks\"\"\"\n        import psutil\n        import os\n        \n        process = psutil.Process(os.getpid())\n        initial_memory = process.memory_info().rss\n        \n        # Create and destroy multiple game instances\n        for _ in range(100):\n            game = Game()\n            del game\n        \n        final_memory = process.memory_info().rss\n        memory_increase = final_memory - initial_memory\n        \n        # Allow some increase but not massive leaks\n        assert memory_increase < 10 * 1024 * 1024, f\"Memory leak: {memory_increase} bytes\"\n\nif __name__ == \"__main__\":\n    pytest.main([__file__, '-v', '--tb=short'])"
                    }
                },
                {
                    text: "Базовое функциональное тестирование",
                    command: "python -m pytest tests/ -v\npython -c \"from src.game.game import Game; g = Game(); print('Game initialized successfully')\"",
                    feedback: "⚠️ Базовое тестирование выполнено",
                    story: "🧪 Хорошо, но можно проверить больше сценариев!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Только запуск игры для проверки",
                    command: "python -m src.game.game --test 5",
                    feedback: "❌ Только поверхностная проверка",
                    story: "🎮 Мало тестов - могут остаться скрытые баги!",
                    score: 0,
                    type: "error",
                    mistakes: { testing: 1 }
                },
                {
                    text: "Без тестирования - и так работает",
                    command: "echo '# Финальное тестирование пропускаем' > test_notes.txt",
                    feedback: "❌ Финальное тестирование не проведено",
                    story: "💀 Выпуск без тестирования - игра в русскую рулетку!",
                    score: -1,
                    type: "error",
                    mistakes: { testing: 2 }
                }
            ]
        },
        {
            id: 27,
            title: "📊 Анализ кода",
            description: "Проверяем качество кода с помощью линтеров.",
            question: "Как проверить качество кода?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Комплексный анализ кода с метриками качества",
                    command: "cat > scripts/code_analysis.py << 'EOF'\n#!/usr/bin/env python3\nimport subprocess\nimport sys\nimport os\nfrom pathlib import Path\n\nclass CodeAnalyzer:\n    def __init__(self):\n        self.src_path = \"src\"\n        self.reports_dir = \"reports\"\n        Path(self.reports_dir).mkdir(exist_ok=True)\n    \n    def run_flake8(self):\n        \"\"\"Run flake8 for code style checking\"\"\"\n        print(\"Running flake8...\")\n        result = subprocess.run([\n            \"flake8\", self.src_path, \n            \"--max-line-length=120\",\n            \"--extend-ignore=E203,W503\",\n            \"--format=html\", \"--htmldir\", f\"{self.reports_dir}/flake8\"\n        ], capture_output=True, text=True)\n        \n        if result.returncode == 0:\n            print(\"✓ Flake8 passed - no style issues\")\n        else:\n            print(f\"✗ Flake8 found issues: {result.stdout}\")\n        return result.returncode == 0\n    \n    def run_pylint(self):\n        \"\"\"Run pylint for code quality analysis\"\"\"\n        print(\"Running pylint...\")\n        result = subprocess.run([\n            \"pylint\", self.src_path,\n            \"--output-format=json\",\n            f\"--output={self.reports_dir}/pylint_report.json\"\n        ], capture_output=True, text=True)\n        \n        # Parse JSON output to get score\n        try:\n            import json\n            with open(f\"{self.reports_dir}/pylint_report.json\", 'r') as f:\n                data = json.load(f)\n            score = data.get('score', 0) if isinstance(data, dict) else 0\n            print(f\"✓ Pylint score: {score:.2f}/10\")\n            return score >= 7.0\n        except:\n            print(\"✗ Could not parse pylint output\")\n            return False\n    \n    def run_bandit(self):\n        \"\"\"Run bandit for security analysis\"\"\"\n        print(\"Running bandit...\")\n        result = subprocess.run([\n            \"bandit\", \"-r\", self.src_path,\n            \"-f\", \"html\",\n            \"-o\", f\"{self.reports_dir}/bandit_report.html\"\n        ], capture_output=True, text=True)\n        \n        if \"No security issues found\" in result.stdout:\n            print(\"✓ Bandit passed - no security issues\")\n            return True\n        else:\n            print(\"✗ Bandit found security issues\")\n            return False\n    \n    def run_radon(self):\n        \"\"\"Run radon for complexity analysis\"\"\"\n        print(\"Running radon...\")\n        \n        # Cyclomatic complexity\n        result = subprocess.run([\n            \"radon\", \"cc\", self.src_path, \"-a\"\n        ], capture_output=True, text=True)\n        \n        # Check for high complexity\n        high_complexity = any(\n            \"C\" in line or \"F\" in line \n            for line in result.stdout.split('\\n') \n            if any(word in line for word in [\"C \", \"F \"])\n        )\n        \n        if not high_complexity:\n            print(\"✓ Radon passed - good code complexity\")\n        else:\n            print(\"✗ Radon found high complexity methods\")\n            print(result.stdout)\n        \n        return not high_complexity\n    \n    def run_mypy(self):\n        \"\"\"Run mypy for type checking\"\"\"\n        print(\"Running mypy...\")\n        result = subprocess.run([\n            \"mypy\", self.src_path,\n            \"--ignore-missing-imports\",\n            \"--html-report\", f\"{self.reports_dir}/mypy\"\n        ], capture_output=True, text=True)\n        \n        if result.returncode == 0:\n            print(\"✓ Mypy passed - no type issues\")\n        else:\n            print(f\"✗ Mypy found type issues: {result.stdout}\")\n        return result.returncode == 0\n    \n    def generate_report(self):\n        \"\"\"Generate comprehensive code quality report\"\"\"\n        print(\"\\n\" + \"=\"*50)\n        print(\"CODE QUALITY ANALYSIS REPORT\")\n        print(\"=\"*50)\n        \n        checks = [\n            (\"Flake8 (Style)\", self.run_flake8),\n            (\"Pylint (Quality)\", self.run_pylint),\n            (\"Bandit (Security)\", self.run_bandit),\n            (\"Radon (Complexity)\", self.run_radon),\n            (\"Mypy (Types)\", self.run_mypy)\n        ]\n        \n        results = []\n        for name, check_func in checks:\n            try:\n                passed = check_func()\n                results.append((name, passed))\n            except Exception as e:\n                print(f\"✗ {name} failed: {e}\")\n                results.append((name, False))\n        \n        print(\"\\n\" + \"=\"*50)\n        print(\"SUMMARY:\")\n        for name, passed in results:\n            status = \"✓ PASS\" if passed else \"✗ FAIL\"\n            print(f\"  {name}: {status}\")\n        \n        all_passed = all(passed for _, passed in results)\n        print(f\"\\nOverall: {'✓ ALL CHECKS PASSED' if all_passed else '✗ SOME CHECKS FAILED'}\")\n        print(f\"Reports saved to: {self.reports_dir}/\")\n        \n        return all_passed\n\nif __name__ == \"__main__\":\n    analyzer = CodeAnalyzer()\n    success = analyzer.generate_report()\n    sys.exit(0 if success else 1)\nEOF\n\n# Install analysis tools\npip install flake8 pylint bandit radon mypy\n\n# Run comprehensive analysis\npython scripts/code_analysis.py",
                    feedback: "✅ Комплексный анализ кода выполнен",
                    story: "📊 Отлично! Код соответствует высоким стандартам качества!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "scripts/code_analysis.py": "#!/usr/bin/env python3\nimport subprocess\nimport sys\nimport os\nfrom pathlib import Path\n\nclass CodeAnalyzer:\n    def __init__(self):\n        self.src_path = \"src\"\n        self.reports_dir = \"reports\"\n        Path(self.reports_dir).mkdir(exist_ok=True)\n    \n    def run_flake8(self):\n        \"\"\"Run flake8 for code style checking\"\"\"\n        print(\"Running flake8...\")\n        result = subprocess.run([\n            \"flake8\", self.src_path, \n            \"--max-line-length=120\",\n            \"--extend-ignore=E203,W503\",\n            \"--format=html\", \"--htmldir\", f\"{self.reports_dir}/flake8\"\n        ], capture_output=True, text=True)\n        \n        if result.returncode == 0:\n            print(\"✓ Flake8 passed - no style issues\")\n        else:\n            print(f\"✗ Flake8 found issues: {result.stdout}\")\n        return result.returncode == 0\n    \n    def run_pylint(self):\n        \"\"\"Run pylint for code quality analysis\"\"\"\n        print(\"Running pylint...\")\n        result = subprocess.run([\n            \"pylint\", self.src_path,\n            \"--output-format=json\",\n            f\"--output={self.reports_dir}/pylint_report.json\"\n        ], capture_output=True, text=True)\n        \n        # Parse JSON output to get score\n        try:\n            import json\n            with open(f\"{self.reports_dir}/pylint_report.json\", 'r') as f:\n                data = json.load(f)\n            score = data.get('score', 0) if isinstance(data, dict) else 0\n            print(f\"✓ Pylint score: {score:.2f}/10\")\n            return score >= 7.0\n        except:\n            print(\"✗ Could not parse pylint output\")\n            return False\n    \n    def run_bandit(self):\n        \"\"\"Run bandit for security analysis\"\"\"\n        print(\"Running bandit...\")\n        result = subprocess.run([\n            \"bandit\", \"-r\", self.src_path,\n            \"-f\", \"html\",\n            \"-o\", f\"{self.reports_dir}/bandit_report.html\"\n        ], capture_output=True, text=True)\n        \n        if \"No security issues found\" in result.stdout:\n            print(\"✓ Bandit passed - no security issues\")\n            return True\n        else:\n            print(\"✗ Bandit found security issues\")\n            return False\n    \n    def run_radon(self):\n        \"\"\"Run radon for complexity analysis\"\"\"\n        print(\"Running radon...\")\n        \n        # Cyclomatic complexity\n        result = subprocess.run([\n            \"radon\", \"cc\", self.src_path, \"-a\"\n        ], capture_output=True, text=True)\n        \n        # Check for high complexity\n        high_complexity = any(\n            \"C\" in line or \"F\" in line \n            for line in result.stdout.split('\\n') \n            if any(word in line for word in [\"C \", \"F \"])\n        )\n        \n        if not high_complexity:\n            print(\"✓ Radon passed - good code complexity\")\n        else:\n            print(\"✗ Radon found high complexity methods\")\n            print(result.stdout)\n        \n        return not high_complexity\n    \n    def run_mypy(self):\n        \"\"\"Run mypy for type checking\"\"\"\n        print(\"Running mypy...\")\n        result = subprocess.run([\n            \"mypy\", self.src_path,\n            \"--ignore-missing-imports\",\n            \"--html-report\", f\"{self.reports_dir}/mypy\"\n        ], capture_output=True, text=True)\n        \n        if result.returncode == 0:\n            print(\"✓ Mypy passed - no type issues\")\n        else:\n            print(f\"✗ Mypy found type issues: {result.stdout}\")\n        return result.returncode == 0\n    \n    def generate_report(self):\n        \"\"\"Generate comprehensive code quality report\"\"\"\n        print(\"\\n\" + \"=\"*50)\n        print(\"CODE QUALITY ANALYSIS REPORT\")\n        print(\"=\"*50)\n        \n        checks = [\n            (\"Flake8 (Style)\", self.run_flake8),\n            (\"Pylint (Quality)\", self.run_pylint),\n            (\"Bandit (Security)\", self.run_bandit),\n            (\"Radon (Complexity)\", self.run_radon),\n            (\"Mypy (Types)\", self.run_mypy)\n        ]\n        \n        results = []\n        for name, check_func in checks:\n            try:\n                passed = check_func()\n                results.append((name, passed))\n            except Exception as e:\n                print(f\"✗ {name} failed: {e}\")\n                results.append((name, False))\n        \n        print(\"\\n\" + \"=\"*50)\n        print(\"SUMMARY:\")\n        for name, passed in results:\n            status = \"✓ PASS\" if passed else \"✗ FAIL\"\n            print(f\"  {name}: {status}\")\n        \n        all_passed = all(passed for _, passed in results)\n        print(f\"\\nOverall: {'✓ ALL CHECKS PASSED' if all_passed else '✗ SOME CHECKS FAILED'}\")\n        print(f\"Reports saved to: {self.reports_dir}/\")\n        \n        return all_passed\n\nif __name__ == \"__main__\":\n    analyzer = CodeAnalyzer()\n    success = analyzer.generate_report()\n    sys.exit(0 if success else 1)"
                    }
                },
                {
                    text: "Базовый линтинг с flake8",
                    command: "pip install flake8\nflake8 src/ --max-line-length=120",
                    feedback: "⚠️ Базовый анализ стиля выполнен",
                    story: "📊 Хорошо, но можно проверить больше аспектов качества!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Ручной просмотр кода",
                    command: "echo '# Анализируем код вручную'\nfind src/ -name '*.py' | head -5 | xargs wc -l",
                    feedback: "❌ Ручной анализ кода",
                    story: "👀 Ручной анализ ненадежен и неполон!",
                    score: 0,
                    type: "error",
                    mistakes: { testing: 1 }
                },
                {
                    text: "Без анализа - код и так хороший",
                    command: "echo '# Анализ кода не нужен' > analysis_notes.txt",
                    feedback: "❌ Анализ кода не выполнен",
                    story: "💀 Без анализа кода могут остаться скрытые проблемы!",
                    score: -1,
                    type: "error",
                    mistakes: { testing: 2 }
                }
            ]
        },
        {
            id: 28,
            title: "🔒 Безопасность",
            description: "Проверяем безопасность кода.",
            question: "Как проверить безопасность?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Комплексная проверка безопасности",
                    command: "cat > scripts/security_scan.py << 'EOF'\n#!/usr/bin/env python3\nimport subprocess\nimport json\nimport sys\nfrom pathlib import Path\n\nclass SecurityScanner:\n    def __init__(self):\n        self.src_path = \"src\"\n        self.reports_dir = \"security_reports\"\n        Path(self.reports_dir).mkdir(exist_ok=True)\n    \n    def run_bandit_detailed(self):\n        \"\"\"Run bandit with detailed security analysis\"\"\"\n        print(\"Running Bandit security scan...\")\n        \n        result = subprocess.run([\n            \"bandit\", \"-r\", self.src_path,\n            \"-f\", \"json\",\n            \"-o\", f\"{self.reports_dir}/bandit_detailed.json\",\n            \"-ll\"  # Low confidence level to catch more issues\n        ], capture_output=True, text=True)\n        \n        try:\n            with open(f\"{self.reports_dir}/bandit_detailed.json\", 'r') as f:\n                report = json.load(f)\n            \n            metrics = report.get('metrics', {})\n            total_issues = sum(metrics.get('_totals', {}).get(severity, 0) \n                             for severity in ['HIGH', 'MEDIUM', 'LOW'])\n            \n            if total_issues == 0:\n                print(\"✓ Bandit: No security issues found\")\n                return True\n            else:\n                print(f\"✗ Bandit: Found {total_issues} security issues\")\n                # Print summary\n                for severity in ['HIGH', 'MEDIUM', 'LOW']:\n                    count = metrics.get('_totals', {}).get(severity, 0)\n                    if count > 0:\n                        print(f\"  {severity}: {count} issues\")\n                return False\n        except Exception as e:\n            print(f\"✗ Bandit analysis failed: {e}\")\n            return False\n    \n    def check_dependencies(self):\n        \"\"\"Check for vulnerable dependencies\"\"\"\n        print(\"Checking dependencies for vulnerabilities...\")\n        \n        try:\n            result = subprocess.run([\n                \"safety\", \"check\",\n                \"--json\",\n                \"--output\", f\"{self.reports_dir}/safety_report.json\"\n            ], capture_output=True, text=True)\n            \n            if result.returncode == 0:\n                print(\"✓ Safety: No vulnerable dependencies\")\n                return True\n            else:\n                print(\"✗ Safety: Found vulnerable dependencies\")\n                print(result.stdout)\n                return False\n        except FileNotFoundError:\n            print(\"⚠ Safety not installed, skipping dependency check\")\n            return True\n    \n    def check_file_permissions(self):\n        \"\"\"Check for insecure file permissions\"\"\"\n        print(\"Checking file permissions...\")\n        \n        insecure_files = []\n        for py_file in Path(self.src_path).rglob(\"*.py\"):\n            stat = py_file.stat()\n            # Check if file is writable by others\n            if stat.st_mode & 0o002:\n                insecure_files.append(str(py_file))\n        \n        if not insecure_files:\n            print(\"✓ File permissions: Secure\")\n            return True\n        else:\n            print(f\"✗ File permissions: {len(insecure_files)} files with insecure permissions\")\n            for file in insecure_files[:3]:  # Show first 3\n                print(f\"  {file}\")\n            return False\n    \n    def check_hardcoded_secrets(self):\n        \"\"\"Check for hardcoded secrets\"\"\"\n        print(\"Checking for hardcoded secrets...\")\n        \n        # Patterns that might indicate secrets\n        secret_patterns = [\n            r'password\\s*=',\n            r'api_key\\s*=',\n            r'secret\\s*=',\n            r'token\\s*=',\n            r'[A-Za-z0-9]{32}',  # 32 char hex string\n            r'sk_live_[A-Za-z0-9]',  # Stripe live key\n        ]\n        \n        import re\n        potential_secrets = []\n        \n        for py_file in Path(self.src_path).rglob(\"*.py\"):\n            try:\n                content = py_file.read_text()\n                for pattern in secret_patterns:\n                    if re.search(pattern, content, re.IGNORECASE):\n                        potential_secrets.append((str(py_file), pattern))\n                        break\n            except Exception:\n                continue\n        \n        if not potential_secrets:\n            print(\"✓ Secrets: No hardcoded secrets found\")\n            return True\n        else:\n            print(f\"✗ Secrets: {len(potential_secrets)} potential secrets found\")\n            for file, pattern in potential_secrets[:3]:\n                print(f\"  {file}: pattern '{pattern}'\")\n            return False\n    \n    def generate_security_report(self):\n        \"\"\"Generate comprehensive security report\"\"\"\n        print(\"\\n\" + \"=\"*50)\n        print(\"SECURITY ANALYSIS REPORT\")\n        print(\"=\"*50)\n        \n        checks = [\n            (\"Code Security (Bandit)\", self.run_bandit_detailed),\n            (\"Dependencies (Safety)\", self.check_dependencies),\n            (\"File Permissions\", self.check_file_permissions),\n            (\"Hardcoded Secrets\", self.check_hardcoded_secrets)\n        ]\n        \n        results = []\n        for name, check_func in checks:\n            try:\n                passed = check_func()\n                results.append((name, passed))\n            except Exception as e:\n                print(f\"✗ {name} failed: {e}\")\n                results.append((name, False))\n        \n        print(\"\\n\" + \"=\"*50)\n        print(\"SECURITY SUMMARY:\")\n        for name, passed in results:\n            status = \"✓ SECURE\" if passed else \"✗ VULNERABLE\"\n            print(f\"  {name}: {status}\")\n        \n        all_secure = all(passed for _, passed in results)\n        security_level = \"HIGH\" if all_secure else \"MEDIUM\" if sum(passed for _, passed in results) >= 2 else \"LOW\"\n        \n        print(f\"\\nOverall Security Level: {security_level}\")\n        print(f\"Security reports saved to: {self.reports_dir}/\")\n        \n        return all_secure\n\nif __name__ == \"__main__\":\n    scanner = SecurityScanner()\n    secure = scanner.generate_security_report()\n    sys.exit(0 if secure else 1)\nEOF\n\n# Install security tools\npip install bandit safety\n\n# Run security scan\npython scripts/security_scan.py",
                    feedback: "✅ Комплексная проверка безопасности выполнена",
                    story: "🔒 Отлично! Код прошел все проверки безопасности!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "scripts/security_scan.py": "#!/usr/bin/env python3\nimport subprocess\nimport json\nimport sys\nfrom pathlib import Path\n\nclass SecurityScanner:\n    def __init__(self):\n        self.src_path = \"src\"\n        self.reports_dir = \"security_reports\"\n        Path(self.reports_dir).mkdir(exist_ok=True)\n    \n    def run_bandit_detailed(self):\n        \"\"\"Run bandit with detailed security analysis\"\"\"\n        print(\"Running Bandit security scan...\")\n        \n        result = subprocess.run([\n            \"bandit\", \"-r\", self.src_path,\n            \"-f\", \"json\",\n            \"-o\", f\"{self.reports_dir}/bandit_detailed.json\",\n            \"-ll\"  # Low confidence level to catch more issues\n        ], capture_output=True, text=True)\n        \n        try:\n            with open(f\"{self.reports_dir}/bandit_detailed.json\", 'r') as f:\n                report = json.load(f)\n            \n            metrics = report.get('metrics', {})\n            total_issues = sum(metrics.get('_totals', {}).get(severity, 0) \n                             for severity in ['HIGH', 'MEDIUM', 'LOW'])\n            \n            if total_issues == 0:\n                print(\"✓ Bandit: No security issues found\")\n                return True\n            else:\n                print(f\"✗ Bandit: Found {total_issues} security issues\")\n                # Print summary\n                for severity in ['HIGH', 'MEDIUM', 'LOW']:\n                    count = metrics.get('_totals', {}).get(severity, 0)\n                    if count > 0:\n                        print(f\"  {severity}: {count} issues\")\n                return False\n        except Exception as e:\n            print(f\"✗ Bandit analysis failed: {e}\")\n            return False\n    \n    def check_dependencies(self):\n        \"\"\"Check for vulnerable dependencies\"\"\"\n        print(\"Checking dependencies for vulnerabilities...\")\n        \n        try:\n            result = subprocess.run([\n                \"safety\", \"check\",\n                \"--json\",\n                \"--output\", f\"{self.reports_dir}/safety_report.json\"\n            ], capture_output=True, text=True)\n            \n            if result.returncode == 0:\n                print(\"✓ Safety: No vulnerable dependencies\")\n                return True\n            else:\n                print(\"✗ Safety: Found vulnerable dependencies\")\n                print(result.stdout)\n                return False\n        except FileNotFoundError:\n            print(\"⚠ Safety not installed, skipping dependency check\")\n            return True\n    \n    def check_file_permissions(self):\n        \"\"\"Check for insecure file permissions\"\"\"\n        print(\"Checking file permissions...\")\n        \n        insecure_files = []\n        for py_file in Path(self.src_path).rglob(\"*.py\"):\n            stat = py_file.stat()\n            # Check if file is writable by others\n            if stat.st_mode & 0o002:\n                insecure_files.append(str(py_file))\n        \n        if not insecure_files:\n            print(\"✓ File permissions: Secure\")\n            return True\n        else:\n            print(f\"✗ File permissions: {len(insecure_files)} files with insecure permissions\")\n            for file in insecure_files[:3]:  # Show first 3\n                print(f\"  {file}\")\n            return False\n    \n    def check_hardcoded_secrets(self):\n        \"\"\"Check for hardcoded secrets\"\"\"\n        print(\"Checking for hardcoded secrets...\")\n        \n        # Patterns that might indicate secrets\n        secret_patterns = [\n            r'password\\s*=',\n            r'api_key\\s*=',\n            r'secret\\s*=',\n            r'token\\s*=',\n            r'[A-Za-z0-9]{32}',  # 32 char hex string\n            r'sk_live_[A-Za-z0-9]',  # Stripe live key\n        ]\n        \n        import re\n        potential_secrets = []\n        \n        for py_file in Path(self.src_path).rglob(\"*.py\"):\n            try:\n                content = py_file.read_text()\n                for pattern in secret_patterns:\n                    if re.search(pattern, content, re.IGNORECASE):\n                        potential_secrets.append((str(py_file), pattern))\n                        break\n            except Exception:\n                continue\n        \n        if not potential_secrets:\n            print(\"✓ Secrets: No hardcoded secrets found\")\n            return True\n        else:\n            print(f\"✗ Secrets: {len(potential_secrets)} potential secrets found\")\n            for file, pattern in potential_secrets[:3]:\n                print(f\"  {file}: pattern '{pattern}'\")\n            return False\n    \n    def generate_security_report(self):\n        \"\"\"Generate comprehensive security report\"\"\"\n        print(\"\\n\" + \"=\"*50)\n        print(\"SECURITY ANALYSIS REPORT\")\n        print(\"=\"*50)\n        \n        checks = [\n            (\"Code Security (Bandit)\", self.run_bandit_detailed),\n            (\"Dependencies (Safety)\", self.check_dependencies),\n            (\"File Permissions\", self.check_file_permissions),\n            (\"Hardcoded Secrets\", self.check_hardcoded_secrets)\n        ]\n        \n        results = []\n        for name, check_func in checks:\n            try:\n                passed = check_func()\n                results.append((name, passed))\n            except Exception as e:\n                print(f\"✗ {name} failed: {e}\")\n                results.append((name, False))\n        \n        print(\"\\n\" + \"=\"*50)\n        print(\"SECURITY SUMMARY:\")\n        for name, passed in results:\n            status = \"✓ SECURE\" if passed else \"✗ VULNERABLE\"\n            print(f\"  {name}: {status}\")\n        \n        all_secure = all(passed for _, passed in results)\n        security_level = \"HIGH\" if all_secure else \"MEDIUM\" if sum(passed for _, passed in results) >= 2 else \"LOW\"\n        \n        print(f\"\\nOverall Security Level: {security_level}\")\n        print(f\"Security reports saved to: {self.reports_dir}/\")\n        \n        return all_secure\n\nif __name__ == \"__main__\":\n    scanner = SecurityScanner()\n    secure = scanner.generate_security_report()\n    sys.exit(0 if secure else 1)"
                    }
                },
                {
                    text: "Базовая проверка bandit",
                    command: "pip install bandit\nbandit -r src/",
                    feedback: "⚠️ Базовая проверка безопасности выполнена",
                    story: "🔒 Хорошо, но можно проверить больше аспектов!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Ручная проверка кода",
                    command: "grep -r 'password\\|secret\\|key' src/ || echo 'No obvious secrets found'",
                    feedback: "❌ Ручная проверка безопасности",
                    story: "👀 Ручная проверка ненадежна для безопасности!",
                    score: 0,
                    type: "error",
                    mistakes: { security: 1 }
                },
                {
                    text: "Без проверки безопасности",
                    command: "echo '# Проверка безопасности не нужна' > security_notes.txt",
                    feedback: "❌ Проверка безопасности не выполнена",
                    story: "💀 Без проверки безопасности игра может быть уязвима!",
                    score: -1,
                    type: "error",
                    mistakes: { security: 2 }
                }
            ]
        },
        {
            id: 29,
            title: "🚀 Деплой",
            description: "Подготавливаем игру к деплою.",
            question: "Как подготовить деплой?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Автоматизированный деплой с мониторингом",
                    command: "cat > scripts/deploy.py << 'EOF'\n#!/usr/bin/env python3\nimport os\nimport shutil\nimport subprocess\nimport sys\nfrom pathlib import Path\nfrom datetime import datetime\n\nclass DeploymentManager:\n    def __init__(self, environment='production'):\n        self.environment = environment\n        self.deploy_dir = Path(f\"deploy/{environment}\")\n        self.backup_dir = Path(\"deploy/backups\")\n        self.timestamp = datetime.now().strftime(\"%Y%m%d_%H%M%S\")\n    \n    def create_backup(self):\n        \"\"\"Create backup of previous deployment\"\"\"\n        if self.deploy_dir.exists():\n            backup_path = self.backup_dir / f\"backup_{self.timestamp}\"\n            self.backup_dir.mkdir(parents=True, exist_ok=True)\n            shutil.copytree(self.deploy_dir, backup_path)\n            print(f\"✓ Backup created: {backup_path}\")\n    \n    def build_application(self):\n        \"\"\"Build the application for deployment\"\"\"\n        print(\"Building application...\")\n        \n        # Clean deploy directory\n        if self.deploy_dir.exists():\n            shutil.rmtree(self.deploy_dir)\n        self.deploy_dir.mkdir(parents=True)\n        \n        # Copy application files\n        shutil.copytree(\"src\", self.deploy_dir / \"src\")\n        shutil.copytree(\"assets\", self.deploy_dir / \"assets\")\n        \n        # Copy configuration\n        for config_file in [\"requirements.txt\", \"config.example.json\", \"README.md\"]:\n            if Path(config_file).exists():\n                shutil.copy2(config_file, self.deploy_dir / config_file)\n        \n        # Create environment-specific config\n        config_content = \"\"\"\n# Deployment Configuration\nENVIRONMENT={environment}\nBUILD_DATE={timestamp}\nGAME_TITLE=\"Snake Game ({environment})\"\n\"\"\".format(environment=self.environment, timestamp=self.timestamp)\n        \n        with open(self.deploy_dir / \".env\", \"w\") as f:\n            f.write(config_content)\n    \n    def generate_deployment_scripts(self):\n        \"\"\"Generate deployment and startup scripts\"\"\"\n        \n        # Startup script for Linux/Mac\n        startup_script = \"\"\"#!/bin/bash\n# Snake Game Startup Script\n\necho \"Starting Snake Game...\"\n\n# Set environment variables\nif [ -f \".env\" ]; then\n    export $(cat .env | grep -v '^#' | xargs)\nfi\n\n# Create necessary directories\nmkdir -p logs\nmkdir -p data\n\n# Install dependencies if needed\nif [ ! -d \"venv\" ]; then\n    echo \"Setting up virtual environment...\"\n    python3 -m venv venv\n    source venv/bin/activate\n    pip install -r requirements.txt\nelse\n    source venv/bin/activate\nfi\n\n# Start the game\necho \"Launching Snake Game in $ENVIRONMENT mode...\"\npython -m src.game.game\n\n# If game exits, show message\necho \"Game ended. Press Enter to close...\"\nread\n\"\"\"\n        \n        with open(self.deploy_dir / \"start.sh\", \"w\") as f:\n            f.write(startup_script)\n        os.chmod(self.deploy_dir / \"start.sh\", 0o755)\n        \n        # Windows batch file\n        batch_script = \"\"\"@echo off\nREM Snake Game Startup Script for Windows\n\necho Starting Snake Game...\n\nREM Create necessary directories\nif not exist logs mkdir logs\nif not exist data mkdir data\n\nREM Install dependencies if needed\nif not exist venv (\n    echo Setting up virtual environment...\n    python -m venv venv\n    call venv\\\\Scripts\\\\activate.bat\n    pip install -r requirements.txt\n) else (\n    call venv\\\\Scripts\\\\activate.bat\n)\n\nREM Start the game\necho Launching Snake Game...\npython -m src.game.game\n\nREM If game exits, show message\necho Game ended. Press any key to close...\npause > nul\n\"\"\"\n        \n        with open(self.deploy_dir / \"start.bat\", \"w\") as f:\n            f.write(batch_script)\n    \n    def create_docker_deployment(self):\n        \"\"\"Create Docker-based deployment\"\"\"\n        print(\"Creating Docker deployment...\")\n        \n        dockerfile_content = \"\"\"FROM python:3.9-slim\n\nWORKDIR /app\n\n# Install system dependencies for pygame\nRUN apt-get update && apt-get install -y \\\\\n    libsdl2-2.0-0 \\\\\n    libsdl2-image-2.0-0 \\\\\n    libsdl2-mixer-2.0-0 \\\\\n    libsdl2-ttf-2.0-0 \\\\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy application\nCOPY . .\n\n# Install Python dependencies\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Create non-root user\nRUN useradd --create-home --shell /bin/bash app\nUSER app\n\n# Create data volume\nVOLUME [\"/app/data\"]\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\\\n    CMD python -c \"import pygame; pygame.init(); pygame.quit()\" || exit 1\n\n# Start the game\nCMD [\"python\", \"-m\", \"src.game.game\"]\n\"\"\"\n        \n        with open(self.deploy_dir / \"Dockerfile\", \"w\") as f:\n            f.write(dockerfile_content)\n        \n        # Docker compose for easy deployment\n        compose_content = \"\"\"version: '3.8'\n\nservices:\n  snake-game:\n    build: .\n    container_name: snake-game\n    volumes:\n      - game_data:/app/data\n    ports:\n      - \"8080:8080\"\n    environment:\n      - ENVIRONMENT=production\n    restart: unless-stopped\n\nvolumes:\n  game_data:\n\"\"\"\n        \n        with open(self.deploy_dir / \"docker-compose.yml\", \"w\") as f:\n            f.write(compose_content)\n    \n    def run_smoke_tests(self):\n        \"\"\"Run smoke tests on deployed application\"\"\"\n        print(\"Running smoke tests...\")\n        \n        # Test Python imports\n        test_script = \"\"\"\nimport sys\nimport os\nsys.path.append('src')\n\ntry:\n    import pygame\n    from game.game import Game\n    from game.snake import Snake\n    print(\"✓ All imports successful\")\n    \n    # Test basic initialization\n    pygame.init()\n    pygame.quit()\n    print(\"✓ Pygame initialized successfully\")\n    \n    # Test game components\n    snake = Snake()\n    print(f\"✓ Snake initialized with {len(snake.body)} segments\")\n    \n    print(\"✓ Smoke tests passed\")\n    sys.exit(0)\nexcept Exception as e:\n    print(f\"✗ Smoke test failed: {e}\")\n    sys.exit(1)\n\"\"\"\n        \n        test_file = self.deploy_dir / \"smoke_test.py\"\n        with open(test_file, \"w\") as f:\n            f.write(test_script)\n        \n        result = subprocess.run(\n            [\"python\", str(test_file)],\n            cwd=self.deploy_dir,\n            capture_output=True,\n            text=True\n        )\n        \n        test_file.unlink()  # Clean up\n        \n        if result.returncode == 0:\n            print(\"✓ Smoke tests passed\")\n            return True\n        else:\n            print(f\"✗ Smoke tests failed: {result.stdout}\")\n            return False\n    \n    def create_deployment_package(self):\n        \"\"\"Create deployment package\"\"\"\n        print(\"Creating deployment package...\")\n        \n        package_name = f\"snake-game-{self.environment}-{self.timestamp}\"\n        package_path = Path(\"dist\") / package_name\n        \n        shutil.make_archive(\n            str(package_path),\n            'zip',\n            self.deploy_dir.parent,\n            self.deploy_dir.name\n        )\n        \n        print(f\"✓ Deployment package created: {package_path}.zip\")\n        return package_path\n    \n    def deploy(self):\n        \"\"\"Execute full deployment process\"\"\"\n        print(f\"Starting deployment to {self.environment}...\")\n        \n        try:\n            self.create_backup()\n            self.build_application()\n            self.generate_deployment_scripts()\n            self.create_docker_deployment()\n            \n            if not self.run_smoke_tests():\n                print(\"✗ Deployment failed: Smoke tests did not pass\")\n                return False\n            \n            package_path = self.create_deployment_package()\n            \n            print(\"\\n\" + \"=\"*50)\n            print(\"DEPLOYMENT SUCCESSFUL!\")\n            print(\"=\"*50)\n            print(f\"Environment: {self.environment}\")\n            print(f\"Build: {self.timestamp}\")\n            print(f\"Package: {package_path}.zip\")\n            print(f\"Deployment directory: {self.deploy_dir}\")\n            print(\"\\nNext steps:\")\n            print(\"1. Distribute the deployment package\")\n            print(\"2. Extract and run start.sh (Linux/Mac) or start.bat (Windows)\")\n            print(\"3. Or use docker-compose up -d for container deployment\")\n            print(\"=\"*50)\n            \n            return True\n            \n        except Exception as e:\n            print(f\"✗ Deployment failed: {e}\")\n            return False\n\nif __name__ == \"__main__\":\n    import argparse\n    \n    parser = argparse.ArgumentParser(description='Deploy Snake Game')\n    parser.add_argument('--environment', default='production', \n                       choices=['development', 'staging', 'production'],\n                       help='Deployment environment')\n    \n    args = parser.parse_args()\n    \n    deployer = DeploymentManager(args.environment)\n    success = deployer.deploy()\n    sys.exit(0 if success else 1)\nEOF\n\n# Run deployment\npython scripts/deploy.py --environment production",
                    feedback: "✅ Полная система деплоя создана",
                    story: "🚀 Отлично! Игра готова к распространению и deployment!",
                    score: 2,
                    type: "success",
                    architecture: {
                        "scripts/deploy.py": "#!/usr/bin/env python3\nimport os\nimport shutil\nimport subprocess\nimport sys\nfrom pathlib import Path\nfrom datetime import datetime\n\nclass DeploymentManager:\n    def __init__(self, environment='production'):\n        self.environment = environment\n        self.deploy_dir = Path(f\"deploy/{environment}\")\n        self.backup_dir = Path(\"deploy/backups\")\n        self.timestamp = datetime.now().strftime(\"%Y%m%d_%H%M%S\")\n    \n    def create_backup(self):\n        \"\"\"Create backup of previous deployment\"\"\"\n        if self.deploy_dir.exists():\n            backup_path = self.backup_dir / f\"backup_{self.timestamp}\"\n            self.backup_dir.mkdir(parents=True, exist_ok=True)\n            shutil.copytree(self.deploy_dir, backup_path)\n            print(f\"✓ Backup created: {backup_path}\")\n    \n    def build_application(self):\n        \"\"\"Build the application for deployment\"\"\"\n        print(\"Building application...\")\n        \n        # Clean deploy directory\n        if self.deploy_dir.exists():\n            shutil.rmtree(self.deploy_dir)\n        self.deploy_dir.mkdir(parents=True)\n        \n        # Copy application files\n        shutil.copytree(\"src\", self.deploy_dir / \"src\")\n        shutil.copytree(\"assets\", self.deploy_dir / \"assets\")\n        \n        # Copy configuration\n        for config_file in [\"requirements.txt\", \"config.example.json\", \"README.md\"]:\n            if Path(config_file).exists():\n                shutil.copy2(config_file, self.deploy_dir / config_file)\n        \n        # Create environment-specific config\n        config_content = \"\"\"\n# Deployment Configuration\nENVIRONMENT={environment}\nBUILD_DATE={timestamp}\nGAME_TITLE=\"Snake Game ({environment})\"\n\"\"\".format(environment=self.environment, timestamp=self.timestamp)\n        \n        with open(self.deploy_dir / \".env\", \"w\") as f:\n            f.write(config_content)\n    \n    def generate_deployment_scripts(self):\n        \"\"\"Generate deployment and startup scripts\"\"\"\n        \n        # Startup script for Linux/Mac\n        startup_script = \"\"\"#!/bin/bash\n# Snake Game Startup Script\n\necho \"Starting Snake Game...\"\n\n# Set environment variables\nif [ -f \".env\" ]; then\n    export $(cat .env | grep -v '^#' | xargs)\nfi\n\n# Create necessary directories\nmkdir -p logs\nmkdir -p data\n\n# Install dependencies if needed\nif [ ! -d \"venv\" ]; then\n    echo \"Setting up virtual environment...\"\n    python3 -m venv venv\n    source venv/bin/activate\n    pip install -r requirements.txt\nelse\n    source venv/bin/activate\nfi\n\n# Start the game\necho \"Launching Snake Game in $ENVIRONMENT mode...\"\npython -m src.game.game\n\n# If game exits, show message\necho \"Game ended. Press Enter to close...\"\nread\n\"\"\"\n        \n        with open(self.deploy_dir / \"start.sh\", \"w\") as f:\n            f.write(startup_script)\n        os.chmod(self.deploy_dir / \"start.sh\", 0o755)\n        \n        # Windows batch file\n        batch_script = \"\"\"@echo off\nREM Snake Game Startup Script for Windows\n\necho Starting Snake Game...\n\nREM Create necessary directories\nif not exist logs mkdir logs\nif not exist data mkdir data\n\nREM Install dependencies if needed\nif not exist venv (\n    echo Setting up virtual environment...\n    python -m venv venv\n    call venv\\\\Scripts\\\\activate.bat\n    pip install -r requirements.txt\n) else (\n    call venv\\\\Scripts\\\\activate.bat\n)\n\nREM Start the game\necho Launching Snake Game...\npython -m src.game.game\n\nREM If game exits, show message\necho Game ended. Press any key to close...\npause > nul\n\"\"\"\n        \n        with open(self.deploy_dir / \"start.bat\", \"w\") as f:\n            f.write(batch_script)\n    \n    def create_docker_deployment(self):\n        \"\"\"Create Docker-based deployment\"\"\"\n        print(\"Creating Docker deployment...\")\n        \n        dockerfile_content = \"\"\"FROM python:3.9-slim\n\nWORKDIR /app\n\n# Install system dependencies for pygame\nRUN apt-get update && apt-get install -y \\\\\n    libsdl2-2.0-0 \\\\\n    libsdl2-image-2.0-0 \\\\\n    libsdl2-mixer-2.0-0 \\\\\n    libsdl2-ttf-2.0-0 \\\\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy application\nCOPY . .\n\n# Install Python dependencies\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Create non-root user\nRUN useradd --create-home --shell /bin/bash app\nUSER app\n\n# Create data volume\nVOLUME [\"/app/data\"]\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\\\n    CMD python -c \"import pygame; pygame.init(); pygame.quit()\" || exit 1\n\n# Start the game\nCMD [\"python\", \"-m\", \"src.game.game\"]\n\"\"\"\n        \n        with open(self.deploy_dir / \"Dockerfile\", \"w\") as f:\n            f.write(dockerfile_content)\n        \n        # Docker compose for easy deployment\n        compose_content = \"\"\"version: '3.8'\n\nservices:\n  snake-game:\n    build: .\n    container_name: snake-game\n    volumes:\n      - game_data:/app/data\n    ports:\n      - \"8080:8080\"\n    environment:\n      - ENVIRONMENT=production\n    restart: unless-stopped\n\nvolumes:\n  game_data:\n\"\"\"\n        \n        with open(self.deploy_dir / \"docker-compose.yml\", \"w\") as f:\n            f.write(compose_content)\n    \n    def run_smoke_tests(self):\n        \"\"\"Run smoke tests on deployed application\"\"\"\n        print(\"Running smoke tests...\")\n        \n        # Test Python imports\n        test_script = \"\"\"\nimport sys\nimport os\nsys.path.append('src')\n\ntry:\n    import pygame\n    from game.game import Game\n    from game.snake import Snake\n    print(\"✓ All imports successful\")\n    \n    # Test basic initialization\n    pygame.init()\n    pygame.quit()\n    print(\"✓ Pygame initialized successfully\")\n    \n    # Test game components\n    snake = Snake()\n    print(f\"✓ Snake initialized with {len(snake.body)} segments\")\n    \n    print(\"✓ Smoke tests passed\")\n    sys.exit(0)\nexcept Exception as e:\n    print(f\"✗ Smoke test failed: {e}\")\n    sys.exit(1)\n\"\"\"\n        \n        test_file = self.deploy_dir / \"smoke_test.py\"\n        with open(test_file, \"w\") as f:\n            f.write(test_script)\n        \n        result = subprocess.run(\n            [\"python\", str(test_file)],\n            cwd=self.deploy_dir,\n            capture_output=True,\n            text=True\n        )\n        \n        test_file.unlink()  # Clean up\n        \n        if result.returncode == 0:\n            print(\"✓ Smoke tests passed\")\n            return True\n        else:\n            print(f\"✗ Smoke tests failed: {result.stdout}\")\n            return False\n    \n    def create_deployment_package(self):\n        \"\"\"Create deployment package\"\"\"\n        print(\"Creating deployment package...\")\n        \n        package_name = f\"snake-game-{self.environment}-{self.timestamp}\"\n        package_path = Path(\"dist\") / package_name\n        \n        shutil.make_archive(\n            str(package_path),\n            'zip',\n            self.deploy_dir.parent,\n            self.deploy_dir.name\n        )\n        \n        print(f\"✓ Deployment package created: {package_path}.zip\")\n        return package_path\n    \n    def deploy(self):\n        \"\"\"Execute full deployment process\"\"\"\n        print(f\"Starting deployment to {self.environment}...\")\n        \n        try:\n            self.create_backup()\n            self.build_application()\n            self.generate_deployment_scripts()\n            self.create_docker_deployment()\n            \n            if not self.run_smoke_tests():\n                print(\"✗ Deployment failed: Smoke tests did not pass\")\n                return False\n            \n            package_path = self.create_deployment_package()\n            \n            print(\"\\n\" + \"=\"*50)\n            print(\"DEPLOYMENT SUCCESSFUL!\")\n            print(\"=\"*50)\n            print(f\"Environment: {self.environment}\")\n            print(f\"Build: {self.timestamp}\")\n            print(f\"Package: {package_path}.zip\")\n            print(f\"Deployment directory: {self.deploy_dir}\")\n            print(\"\\nNext steps:\")\n            print(\"1. Distribute the deployment package\")\n            print(\"2. Extract and run start.sh (Linux/Mac) or start.bat (Windows)\")\n            print(\"3. Or use docker-compose up -d for container deployment\")\n            print(\"=\"*50)\n            \n            return True\n            \n        except Exception as e:\n            print(f\"✗ Deployment failed: {e}\")\n            return False\n\nif __name__ == \"__main__\":\n    import argparse\n    \n    parser = argparse.ArgumentParser(description='Deploy Snake Game')\n    parser.add_argument('--environment', default='production', \n                       choices=['development', 'staging', 'production'],\n                       help='Deployment environment')\n    \n    args = parser.parse_args()\n    \n    deployer = DeploymentManager(args.environment)\n    success = deployer.deploy()\n    sys.exit(0 if success else 1)"
                    }
                },
                {
                    text: "Простой деплой пакет",
                    command: "./build.sh\necho \"Game ready for distribution!\"\nls -la build/",
                    feedback: "⚠️ Простой деплой пакет создан",
                    story: "🚀 Хорошо, но нет автоматизации и мониторинга!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Ручное копирование файлов",
                    command: "mkdir -p deploy\ncp -r src/ deploy/\ncp -r assets/ deploy/\ncp requirements.txt deploy/",
                    feedback: "❌ Ручной деплой подготовлен",
                    story: "👐 Ручной деплой подвержен ошибкам!",
                    score: 0,
                    type: "error",
                    mistakes: { architecture: 1 }
                },
                {
                    text: "Без деплоя - исходники как есть",
                    command: "echo '# Деплой не нужен' > deploy_notes.txt",
                    feedback: "❌ Деплой не подготовлен",
                    story: "💀 Без деплоя сложно распространять игру!",
                    score: -1,
                    type: "error",
                    mistakes: { architecture: 2 }
                }
            ]
        },
        {
            id: 30,
            title: "🏆 Завершение проекта",
            description: "Финальный шаг - ретроспектива и документация.",
            question: "Как завершить проект?",
            terminal: "(venv) dev@ubuntu:~/snake-game$ ",
            options: [
                {
                    text: "Полная документация проекта и ретроспектива",
                    command: "cat > PROJECT_COMPLETION.md << 'EOF'\n# 🎮 Snake Game - Project Completion Report\n\n## 📊 Project Summary\n\n### 🎯 Project Overview\n- **Project**: Classic Snake Game\n- **Technology Stack**: Python, Pygame, Modern Development Practices\n- **Duration**: Full development lifecycle\n- **Status**: ✅ COMPLETED SUCCESSFULLY\n\n### 🏆 Key Achievements\n\n#### 🎯 Planning & Architecture (Steps 1-6)\n- ✅ Comprehensive project planning and requirements documentation\n- ✅ Modular project structure with clear separation of concerns\n- ✅ Virtual environment and dependency management\n- ✅ Version control with Git and proper .gitignore\n- ✅ Professional architecture design with UML documentation\n\n#### 💻 Core Development (Steps 7-15)\n- ✅ Robust game engine with clean game loop architecture\n- ✅ Advanced Snake class with intelligent movement and collision prevention\n- ✅ Smart Food generation with position validation\n- ✅ Comprehensive collision detection system\n- ✅ Professional UI with score display and animations\n- ✅ Audio system with sound effects and music\n- ✅ Persistent high score system with JSON storage\n- ✅ State-based menu system with smooth transitions\n\n#### 🧪 Quality Assurance (Steps 16-24)\n- ✅ Comprehensive unit and integration testing suite\n- ✅ Performance profiling and optimization\n- ✅ Docker containerization for consistent deployment\n- ✅ CI/CD pipeline with automated testing\n- ✅ Professional documentation and API reference\n- ✅ Configuration management system\n- ✅ Advanced graphics with sprite animations\n- ✅ Detailed logging system with rotation\n- ✅ State machine for clean game state management\n\n#### 🚀 Production Ready (Steps 25-30)\n- ✅ Automated build system with versioning\n- ✅ Comprehensive final testing and validation\n- ✅ Code quality analysis with multiple tools\n- ✅ Security scanning and vulnerability assessment\n- ✅ Automated deployment system with multiple environments\n- ✅ Project completion documentation\n\n### 📈 Technical Metrics\n\n```\nCode Quality:\n- Lines of Code: ~2,500\n- Test Coverage: >90%\n- Code Quality Score: >9.0/10\n- Security Issues: 0\n- Dependencies: 5 (Pygame + testing tools)\n\nArchitecture:\n- Modules: 15+\n- Classes: 20+\n- Test Cases: 50+\n- Configuration Options: 25+\n```\n\n### 🎓 Skills Demonstrated\n\n#### Technical Skills\n- **Python Programming**: Advanced OOP, design patterns, async programming\n- **Game Development**: Game loops, collision detection, sprite management\n- **Software Architecture**: Modular design, separation of concerns, design patterns\n- **Testing**: Unit tests, integration tests, performance testing\n- **DevOps**: Docker, CI/CD, deployment automation\n- **Security**: Code scanning, vulnerability assessment\n- **Documentation**: API docs, user guides, technical specifications\n\n#### Professional Skills\n- **Project Management**: Full lifecycle development, milestone tracking\n- **Quality Assurance**: Test-driven development, code reviews\n- **Deployment**: Production deployment, environment management\n- **Collaboration**: Version control, code standards, team workflows\n\n### 🚀 Deployment Ready\n\nThe project is fully prepared for distribution with multiple deployment options:\n\n1. **Standalone Package**: ZIP archive with startup scripts\n2. **Docker Container**: Containerized deployment\n3. **Source Distribution**: Full source code with build instructions\n\n### 📚 Documentation Complete\n\n- ✅ README.md - User documentation and quick start\n- ✅ API Reference - Complete code documentation\n- ✅ Architecture Docs - System design and components\n- ✅ Deployment Guide - Production deployment instructions\n- ✅ Development Guide - Contributor documentation\n\n### 🔮 Future Enhancements\n\nPotential areas for future development:\n- Multiplayer support over network\n- Mobile version (iOS/Android)\n- Level editor and custom maps\n- Power-ups and special abilities\n- Online leaderboards\n- Theme customization\n\n### 🎉 Conclusion\n\nThis project successfully demonstrates a complete game development lifecycle from concept to production-ready deployment. The Snake Game implementation showcases professional software engineering practices, modern development workflows, and production-quality code standards.\n\n**Project Status: 🏆 COMPLETED SUCCESSFULLY**\n\n---\n*Project completed on: $(date)*\n*Total development steps: 30*\n*Final score: [Calculated based on player choices]*\nEOF\n\n# Create final project structure overview\ncat > PROJECT_STRUCTURE.md << 'EOF'\n# Project Structure Overview\n\n```\nsnake-game/\n├── 📁 src/                    # Source code\n│   ├── 📁 game/              # Core game logic\n│   │   ├── game.py          # Main game class\n│   │   ├── snake.py         # Snake behavior\n│   │   ├── food.py          # Food generation\n│   │   ├── collision.py     # Collision detection\n│   │   ├── menu.py          # Menu system\n│   │   ├── states.py        # State machine\n│   │   └── core.py          # Game core logic\n│   ├── 📁 graphics/          # Graphics system\n│   │   └── sprite_manager.py # Sprite and animation management\n│   ├── 📁 utils/             # Utilities\n│   │   ├── audio.py         # Audio management\n│   │   ├── scores.py        # High score system\n│   │   ├── logger.py        # Logging system\n│   │   └── profiler.py      # Performance profiling\n│   └── config.py            # Configuration management\n├── 📁 assets/                # Game assets\n│   ├── 📁 sounds/           # Audio files\n│   ├── 📁 images/           # Image assets\n│   └── 📁 graphics/         # Sprite sheets\n├── 📁 tests/                 # Test suite\n│   ├── test_snake.py        # Snake tests\n│   ├── test_integration.py  # Integration tests\n│   └── test_performance.py  # Performance tests\n├── 📁 scripts/               # Build and deployment scripts\n│   ├── build_release.py     # Release builder\n│   ├── deploy.py            # Deployment manager\n│   ├── code_analysis.py     # Code quality analysis\n│   └── security_scan.py     # Security scanner\n├── 📁 docs/                  # Documentation\n│   ├── architecture.md      # Architecture documentation\n│   └── api_reference.md     # API reference\n├── 📁 deploy/                # Deployment packages\n│   └── 📁 production/       # Production deployment\n├── .github/workflows/       # CI/CD pipelines\n├── Dockerfile               # Container definition\n├── docker-compose.yml       # Container orchestration\n├── requirements.txt         # Python dependencies\n├── pyproject.toml          # Project metadata\n├── README.md               # Project documentation\n└── PROJECT_COMPLETION.md   # This completion report\n```\n\n## File Count Summary\n- Source Files: 15+\n- Test Files: 10+\n- Script Files: 8+\n- Documentation Files: 10+\n- Configuration Files: 5+\n- Total Files: 50+\nEOF\n\n# Final celebration message\necho \"🎉 PROJECT COMPLETED SUCCESSFULLY!\"\necho \"🏆 You have built a professional-grade Snake Game from scratch!\"\necho \"📊 Check PROJECT_COMPLETION.md for full project summary\"\necho \"🚀 Your game is ready for distribution and production use!\"",
                    feedback: "✅ Проект завершен с полной документацией!",
                    story: "🏆 ПОТРЯСАЮЩЕ! Вы создали полноценную игру с нуля! От планирования до релиза - полный цикл разработки! 🎯🚀\n\nВаши достижения:\n✅ Профессиональная архитектура и планирование\n✅ Чистый, тестируемый код с лучшими практиками\n✅ Полная система тестирования и CI/CD\n✅ Безопасность и производительность\n✅ Готовность к production deployment\n\nВы прошли весь путь от идеи до готового продукта! 🎮",
                    score: 2,
                    type: "success",
                    architecture: {
                        "PROJECT_COMPLETION.md": "# 🎮 Snake Game - Project Completion Report\n\n## 📊 Project Summary\n\n### 🎯 Project Overview\n- **Project**: Classic Snake Game\n- **Technology Stack**: Python, Pygame, Modern Development Practices\n- **Duration**: Full development lifecycle\n- **Status**: ✅ COMPLETED SUCCESSFULLY\n\n### 🏆 Key Achievements\n\n#### 🎯 Planning & Architecture (Steps 1-6)\n- ✅ Comprehensive project planning and requirements documentation\n- ✅ Modular project structure with clear separation of concerns\n- ✅ Virtual environment and dependency management\n- ✅ Version control with Git and proper .gitignore\n- ✅ Professional architecture design with UML documentation\n\n#### 💻 Core Development (Steps 7-15)\n- ✅ Robust game engine with clean game loop architecture\n- ✅ Advanced Snake class with intelligent movement and collision prevention\n- ✅ Smart Food generation with position validation\n- ✅ Comprehensive collision detection system\n- ✅ Professional UI with score display and animations\n- ✅ Audio system with sound effects and music\n- ✅ Persistent high score system with JSON storage\n- ✅ State-based menu system with smooth transitions\n\n#### 🧪 Quality Assurance (Steps 16-24)\n- ✅ Comprehensive unit and integration testing suite\n- ✅ Performance profiling and optimization\n- ✅ Docker containerization for consistent deployment\n- ✅ CI/CD pipeline with automated testing\n- ✅ Professional documentation and API reference\n- ✅ Configuration management system\n- ✅ Advanced graphics with sprite animations\n- ✅ Detailed logging system with rotation\n- ✅ State machine for clean game state management\n\n#### 🚀 Production Ready (Steps 25-30)\n- ✅ Automated build system with versioning\n- ✅ Comprehensive final testing and validation\n- ✅ Code quality analysis with multiple tools\n- ✅ Security scanning and vulnerability assessment\n- ✅ Automated deployment system with multiple environments\n- ✅ Project completion documentation\n\n### 📈 Technical Metrics\n\n```\nCode Quality:\n- Lines of Code: ~2,500\n- Test Coverage: >90%\n- Code Quality Score: >9.0/10\n- Security Issues: 0\n- Dependencies: 5 (Pygame + testing tools)\n\nArchitecture:\n- Modules: 15+\n- Classes: 20+\n- Test Cases: 50+\n- Configuration Options: 25+\n```\n\n### 🎓 Skills Demonstrated\n\n#### Technical Skills\n- **Python Programming**: Advanced OOP, design patterns, async programming\n- **Game Development**: Game loops, collision detection, sprite management\n- **Software Architecture**: Modular design, separation of concerns, design patterns\n- **Testing**: Unit tests, integration tests, performance testing\n- **DevOps**: Docker, CI/CD, deployment automation\n- **Security**: Code scanning, vulnerability assessment\n- **Documentation**: API docs, user guides, technical specifications\n\n#### Professional Skills\n- **Project Management**: Full lifecycle development, milestone tracking\n- **Quality Assurance**: Test-driven development, code reviews\n- **Deployment**: Production deployment, environment management\n- **Collaboration**: Version control, code standards, team workflows\n\n### 🚀 Deployment Ready\n\nThe project is fully prepared for distribution with multiple deployment options:\n\n1. **Standalone Package**: ZIP archive with startup scripts\n2. **Docker Container**: Containerized deployment\n3. **Source Distribution**: Full source code with build instructions\n\n### 📚 Documentation Complete\n\n- ✅ README.md - User documentation and quick start\n- ✅ API Reference - Complete code documentation\n- ✅ Architecture Docs - System design and components\n- ✅ Deployment Guide - Production deployment instructions\n- ✅ Development Guide - Contributor documentation\n\n### 🔮 Future Enhancements\n\nPotential areas for future development:\n- Multiplayer support over network\n- Mobile version (iOS/Android)\n- Level editor and custom maps\n- Power-ups and special abilities\n- Online leaderboards\n- Theme customization\n\n### 🎉 Conclusion\n\nThis project successfully demonstrates a complete game development lifecycle from concept to production-ready deployment. The Snake Game implementation showcases professional software engineering practices, modern development workflows, and production-quality code standards.\n\n**Project Status: 🏆 COMPLETED SUCCESSFULLY**\n\n---\n*Project completed on: $(date)*\n*Total development steps: 30*\n*Final score: [Calculated based on player choices]*",
                        "PROJECT_STRUCTURE.md": "# Project Structure Overview\n\n```\nsnake-game/\n├── 📁 src/                    # Source code\n│   ├── 📁 game/              # Core game logic\n│   │   ├── game.py          # Main game class\n│   │   ├── snake.py         # Snake behavior\n│   │   ├── food.py          # Food generation\n│   │   ├── collision.py     # Collision detection\n│   │   ├── menu.py          # Menu system\n│   │   ├── states.py        # State machine\n│   │   └── core.py          # Game core logic\n│   ├── 📁 graphics/          # Graphics system\n│   │   └── sprite_manager.py # Sprite and animation management\n│   ├── 📁 utils/             # Utilities\n│   │   ├── audio.py         # Audio management\n│   │   ├── scores.py        # High score system\n│   │   ├── logger.py        # Logging system\n│   │   └── profiler.py      # Performance profiling\n│   └── config.py            # Configuration management\n├── 📁 assets/                # Game assets\n│   ├── 📁 sounds/           # Audio files\n│   ├── 📁 images/           # Image assets\n│   └── 📁 graphics/         # Sprite sheets\n├── 📁 tests/                 # Test suite\n│   ├── test_snake.py        # Snake tests\n│   ├── test_integration.py  # Integration tests\n│   └── test_performance.py  # Performance tests\n├── 📁 scripts/               # Build and deployment scripts\n│   ├── build_release.py     # Release builder\n│   ├── deploy.py            # Deployment manager\n│   ├── code_analysis.py     # Code quality analysis\n│   └── security_scan.py     # Security scanner\n├── 📁 docs/                  # Documentation\n│   ├── architecture.md      # Architecture documentation\n│   └── api_reference.md     # API reference\n├── 📁 deploy/                # Deployment packages\n│   └── 📁 production/       # Production deployment\n├── .github/workflows/       # CI/CD pipelines\n├── Dockerfile               # Container definition\n├── docker-compose.yml       # Container orchestration\n├── requirements.txt         # Python dependencies\n├── pyproject.toml          # Project metadata\n├── README.md               # Project documentation\n└── PROJECT_COMPLETION.md   # This completion report\n```\n\n## File Count Summary\n- Source Files: 15+\n- Test Files: 10+\n- Script Files: 8+\n- Documentation Files: 10+\n- Configuration Files: 5+\n- Total Files: 50+"
                    }
                },
                {
                    text: "Базовое завершение проекта",
                    command: "echo 'Project completed!' > completion.txt\nls -la",
                    feedback: "⚠️ Проект завершен базово",
                    story: "🏆 Хорошо, но можно добавить больше документации!",
                    score: 1,
                    type: "warning"
                },
                {
                    text: "Просто закончить без документации",
                    command: "echo 'Done'",
                    feedback: "❌ Проект завершен без документации",
                    story: "📝 Завершение без документации затруднит поддержку!",
                    score: 0,
                    type: "error",
                    mistakes: { planning: 1 }
                },
                {
                    text: "Бросить проект на полпути",
                    command: "echo 'Project abandoned' > abandoned.txt",
                    feedback: "❌ Проект не завершен",
                    story: "💀 Незавершенный проект - потерянные усилия!",
                    score: -1,
                    type: "error",
                    mistakes: { planning: 2 }
                }
            ]
        }
    ]
};

// Функция для показа итогового окна
function showCompletionScreen() {
    const totalScore = calculateTotalScore();
    const mistakes = calculateTotalMistakes();
    const grade = calculateGrade(totalScore, mistakes);
    
    return {
        title: "🏆 ПРОЕКТ ЗАВЕРШЕН!",
        content: `
<div class="completion-screen">
    <div class="completion-header">
        <h1>🎮 Snake Game Development Complete! 🎮</h1>
        <p>Вы прошли полный цикл разработки игры от идеи до production!</p>
    </div>
    
    <div class="completion-stats">
        <div class="stat-card">
            <h3>📊 Итоговый счет</h3>
            <div class="score">${totalScore} / 60</div>
        </div>
        
        <div class="stat-card">
            <h3>🏅 Оценка проекта</h3>
            <div class="grade">${grade}</div>
        </div>
        
        <div class="stat-card">
            <h3>⚡ Ошибок допущено</h3>
            <div class="mistakes">${mistakes}</div>
        </div>
    </div>
    
    <div class="completion-details">
        <h3>🎯 Достижения:</h3>
        <ul>
            <li>✅ Полный цикл разработки от планирования до деплоя</li>
            <li>✅ Профессиональная архитектура и лучшие практики</li>
            <li>✅ Комплексное тестирование и CI/CD</li>
            <li>✅ Безопасность и производительность</li>
            <li>✅ Production-ready deployment</li>
        </ul>
        
        <h3>🚀 Что вы построили:</h3>
        <ul>
            <li>🎮 Полнофункциональную игру Snake с продвинутыми фичами</li>
            <li>🏗️ Модульную архитектуру с 15+ компонентами</li>
            <li>🧪 Комплексную систему тестирования</li>
            <li>📦 Автоматизированную сборку и деплой</li>
            <li>📚 Полную документацию проекта</li>
        </ul>
    </div>
    
    <div class="completion-actions">
        <button onclick="restartGame()">🔄 Начать заново</button>
        <button onclick="viewProjectSummary()">📊 Детали проекта</button>
        <button onclick="shareResults()">📤 Поделиться результатами</button>
    </div>
</div>
        `
    };
}