// Основная логика игры
class GameTrainer {
    constructor() {
        this.gameData = gameData;
        this.currentStepIndex = 0;
        this.terminalHistory = [];
        this.selectedAnswer = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateTotalSteps();
        this.initArchitecture();
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('play-game-btn').addEventListener('click', () => this.playGame());
        
        document.getElementById('clear-terminal').addEventListener('click', () => this.clearTerminal());
        document.getElementById('copy-commands').addEventListener('click', () => this.copyCommands());
        
        document.getElementById('architecture-btn').addEventListener('click', () => this.showArchitecture());
        document.getElementById('close-architecture').addEventListener('click', () => this.hideArchitecture());
        
        // Закрытие модального окна по клику вне его
        document.getElementById('architecture-modal').addEventListener('click', (e) => {
            if (e.target.id === 'architecture-modal') {
                this.hideArchitecture();
            }
        });
    }

    startGame() {
        const name = document.getElementById('player-name').value.trim();
        if (!name) {
            alert('Пожалуйста, введите ваше имя');
            return;
        }

        this.gameData.playerName = name;
        this.gameData.score = 0;
        this.gameData.currentStep = 0;
        this.gameData.commandHistory = [];
        this.gameData.mistakes = {
            planning: 0,
            architecture: 0, 
            testing: 0,
            security: 0,
            performance: 0
        };

        this.showScreen('game-screen');
        document.getElementById('current-player').textContent = name;
        this.updateScore();
        this.showCurrentStep();
        this.clearTerminal();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    showCurrentStep() {
        const step = this.gameData.steps[this.gameData.currentStep];
        this.selectedAnswer = null;
        
        // Обновление информации о шаге
        document.getElementById('step-info').innerHTML = `
            <h2>${step.title}</h2>
            <p>${step.description}</p>
            <p><strong>${step.question}</strong></p>
        `;

        // Обновление прогресса (теперь для 30 шагов)
        const progress = ((this.gameData.currentStep + 1) / 30) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('current-step').textContent = this.gameData.currentStep + 1;
        document.getElementById('total-steps').textContent = '30';

        // Создание кнопок с вариантами (в случайном порядке)
        this.createOptionButtons(step.options);

        // Очистка фидбека
        document.getElementById('story-feedback').innerHTML = '';

        // Добавление информации о шаге в терминал
        this.addToTerminal('info', `🎯 Шаг ${this.gameData.currentStep + 1}/30: ${step.title}`);
        this.addToTerminal('command', step.terminal);
    }

    createOptionButtons(options) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        // Перемешиваем варианты ответов
        const shuffledOptions = this.shuffleArray([...options]);
        
        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn neutral';
            button.textContent = option.text;
            button.dataset.optionIndex = options.indexOf(option); // Сохраняем оригинальный индекс
            
            button.addEventListener('click', () => this.handleAnswer(option, button));
            container.appendChild(button);
        });
    }

    // Функция для перемешивания массива
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    handleAnswer(selectedOption, buttonElement) {
        if (this.selectedAnswer) return; // Запрещаем multiple selection
        
        this.selectedAnswer = selectedOption;
        const step = this.gameData.steps[this.gameData.currentStep];
        
        // Блокируем все кнопки
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });

        // Показываем результат выбора
        this.showAnswerResults(step.options, selectedOption);
        
        // Добавление команды в терминал
        this.addToTerminal('command', step.terminal + selectedOption.command);
        
        // Добавление обратной связи
        this.addToTerminal('output', selectedOption.feedback);
        
        // Добавление команды в историю
        this.addToCommandHistory(selectedOption.command);
        
        // Обновление счета
        this.gameData.score += selectedOption.score;
        this.updateScore();
        
        // Обновление архитектуры
        if (selectedOption.architecture) {
            this.updateArchitecture(selectedOption.architecture);
        }
        
        // Учет ошибок
        if (selectedOption.mistakes) {
            Object.keys(selectedOption.mistakes).forEach(key => {
                this.gameData.mistakes[key] += selectedOption.mistakes[key];
            });
        }

        // Показ сюжетного фидбека
        this.showStoryFeedback(selectedOption);

        setTimeout(() => {
            this.gameData.currentStep++;
            if (this.gameData.currentStep < this.gameData.steps.length) {
                this.showCurrentStep();
            } else {
                this.showResults(); // Теперь это сработает на 30 шаге
            }
        }, 4000);
    }

    showAnswerResults(allOptions, selectedOption) {
        const container = document.getElementById('options-container');
        const buttons = container.querySelectorAll('.option-btn');
        
        buttons.forEach(button => {
            const optionIndex = parseInt(button.dataset.optionIndex);
            const option = allOptions[optionIndex];
            
            // Убираем нейтральный класс
            button.classList.remove('neutral');
            
            // Добавляем соответствующий класс результата
            if (option === selectedOption) {
                // Выбранный вариант
                if (option.score === 2) {
                    button.classList.add('correct');
                } else if (option.score === 1) {
                    button.classList.add('partial');
                } else {
                    button.classList.add('incorrect');
                }
                button.style.transform = 'scale(1.02)';
                button.style.boxShadow = '0 0 15px rgba(104, 211, 145, 0.3)';
            } else {
                // Невыбранные варианты
                if (option.score === 2) {
                    button.classList.add('correct');
                } else if (option.score === 1) {
                    button.classList.add('partial');
                } else {
                    button.classList.add('incorrect');
                }
                button.style.opacity = '0.7';
            }
        });
    }

    showStoryFeedback(option) {
        const feedbackContainer = document.getElementById('story-feedback');
        const feedback = document.createElement('div');
        
        let feedbackClass = 'story-message ';
        if (option.score === 2) {
            feedbackClass += 'story-success';
        } else if (option.score === 1) {
            feedbackClass += 'story-warning';
        } else {
            feedbackClass += 'story-error';
        }
        
        feedback.className = feedbackClass;
        feedback.innerHTML = `
            <strong>💬 Комментарий ментора:</strong><br>
            ${option.story}
            ${option.score === 2 ? ' 🎉 +2 очка!' : option.score === 1 ? ' 👍 +1 очко!' : ' ❌ +0 очков'}
        `;
        feedbackContainer.appendChild(feedback);
        feedbackContainer.scrollTop = feedbackContainer.scrollHeight;
    }

    addToTerminal(type, content) {
        const terminal = document.getElementById('terminal');
        const line = document.createElement('div');
        line.className = type;
        
        if (type === 'command') {
            const promptEnd = content.indexOf('$') + 1;
            line.innerHTML = `<span class="prompt">${content.substring(0, promptEnd)}</span>${content.substring(promptEnd)}`;
        } else {
            line.textContent = content;
        }
        
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        
        // Сохраняем в историю терминала
        this.terminalHistory.push({ type, content, timestamp: new Date() });
    }

    addToCommandHistory(command) {
        this.gameData.commandHistory.push({
            command: command.split('\n')[0], // Первая строка команды
            fullCommand: command,
            step: this.gameData.currentStep + 1,
            timestamp: new Date()
        });
    }

    clearTerminal() {
        document.getElementById('terminal').innerHTML = '';
        this.terminalHistory = [];
    }

    copyCommands() {
        const commands = this.gameData.commandHistory.map(c => c.fullCommand).join('\n');
        navigator.clipboard.writeText(commands).then(() => {
            this.addToTerminal('info', '📋 Все команды скопированы в буфер обмена!');
        });
    }

    updateScore() {
        document.getElementById('score').textContent = this.gameData.score;
    }

    updateTotalSteps() {
        document.getElementById('total-steps').textContent = '30';
    }

    initArchitecture() {
        this.gameData.architecture.files = {};
        this.updateArchitectureView();
    }

    updateArchitecture(newFiles) {
        Object.assign(this.gameData.architecture.files, newFiles);
        this.updateArchitectureView();
    }

    updateArchitectureView() {
        const fileTree = document.getElementById('file-tree');
        const codePreview = document.getElementById('code-preview');
        
        if (!fileTree || !codePreview) return;
        
        // Обновление дерева файлов
        fileTree.innerHTML = '<h3>📁 Структура проекта:</h3>';
        this.renderFileTree(this.gameData.architecture.files, fileTree);
        
        // Обновление превью кода
        codePreview.innerHTML = '<h3>📄 Активные файлы:</h3>';
        this.renderCodePreview(codePreview);
    }

    renderFileTree(files, container, path = '') {
        for (const [name, content] of Object.entries(files)) {
            const item = document.createElement('div');
            item.className = content === 'DIR' ? 'file-item folder' : 'file-item file';
            item.textContent = name;
            item.addEventListener('click', () => this.showFileContent(name, content));
            container.appendChild(item);
        }
    }

    showFileContent(filename, content) {
        const codePreview = document.getElementById('code-preview');
        if (content === 'DIR') {
            codePreview.innerHTML = `<h3>📁 ${filename}</h3><p>Директория</p>`;
        } else {
            codePreview.innerHTML = `
                <h3>📄 ${filename}</h3>
                <pre class="code-content">${this.escapeHtml(content)}</pre>
            `;
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    renderCodePreview(container) {
        const activeFiles = Object.entries(this.gameData.architecture.files)
            .filter(([_, content]) => content !== 'DIR')
            .slice(-3); // Показываем последние 3 файла
        
        activeFiles.forEach(([filename, content]) => {
            const filePreview = document.createElement('div');
            filePreview.className = 'file-preview';
            filePreview.innerHTML = `
                <h4>📄 ${filename}</h4>
                <pre class="code-content">${this.escapeHtml(content.substring(0, 200))}${content.length > 200 ? '...' : ''}</pre>
            `;
            container.appendChild(filePreview);
        });
    }

    showArchitecture() {
        document.getElementById('architecture-modal').classList.add('active');
        this.updateArchitectureView();
    }

    hideArchitecture() {
        document.getElementById('architecture-modal').classList.remove('active');
    }

    showResults() {
        const totalPossibleScore = 30 * 2; // 30 шагов × 2 максимальных очка
        const percentage = (this.gameData.score / totalPossibleScore) * 100;
        
        let grade = 'A+';
        if (percentage < 50) grade = 'C';
        else if (percentage < 65) grade = 'B-';
        else if (percentage < 75) grade = 'B';
        else if (percentage < 85) grade = 'A-';
        else if (percentage < 95) grade = 'A';
        else grade = 'A+';

        document.getElementById('final-grade').textContent = grade;
        document.getElementById('final-score').textContent = this.gameData.score;
        document.getElementById('correct-choices').textContent = `${Math.round(percentage)}%`;

        // Генерация профиля разработчика
        this.generateDevProfile();
        
        // Генерация сюжетного результата
        this.generateStoryResult(percentage);
        
        // Создание превью игры
        this.createGamePreview();

        this.showScreen('results-screen');
    }

    generateDevProfile() {
        const profile = document.getElementById('dev-profile');
        const mistakes = this.gameData.mistakes;
        const totalSteps = 30;
        
        let profileHtml = '';
        
        // Планирование
        const planningScore = (mistakes.planning / totalSteps) * 100;
        if (planningScore > 20) {
            profileHtml += '<div class="profile-card"><h4>📝 Планирование</h4><p>🚧 Импульсивный разработчик. Начинает кодить без плана, что приводит к переделкам.</p></div>';
        } else if (planningScore > 10) {
            profileHtml += '<div class="profile-card"><h4>📝 Планирование</h4><p>📋 Умеренный планировщик. Иногда пропускает документацию, но в целом держит фокус.</p></div>';
        } else {
            profileHtml += '<div class="profile-card"><h4>📝 Планирование</h4><p>✅ Методичный планировщик. Четкие требования и архитектура с самого начала.</p></div>';
        }
        
        // Архитектура
        const architectureScore = (mistakes.architecture / totalSteps) * 100;
        if (architectureScore > 15) {
            profileHtml += '<div class="profile-card"><h4>🏗️ Архитектура</h4><p>🔄 Любитель монолитов. Предпочитает простые решения, но страдает масштабируемость.</p></div>';
        } else if (architectureScore > 8) {
            profileHtml += '<div class="profile-card"><h4>🏗️ Архитектура</h4><p>⚡ Балансирующий архитектор. В целом хорошая структура, но есть места для улучшений.</p></div>';
        } else {
            profileHtml += '<div class="profile-card"><h4>🏗️ Архитектура</h4><p>✅ Архитектурный гуру. Чистая модульная структура и разделение ответственности.</p></div>';
        }
        
        // Тестирование
        const testingScore = (mistakes.testing / totalSteps) * 100;
        if (testingScore > 12) {
            profileHtml += '<div class="profile-card"><h4>🧪 Тестирование</h4><p>🎲 Азартный тестер. Полагается на удачу вместо comprehensive тестов.</p></div>';
        } else if (testingScore > 6) {
            profileHtml += '<div class="profile-card"><h4>🧪 Тестирование</h4><p>🔍 Внимательный тестировщик. Основные сценарии покрыты, но есть пробелы.</p></div>';
        } else {
            profileHtml += '<div class="profile-card"><h4>🧪 Тестирование</h4><p>✅ QA эксперт. Полное тестовое покрытие и надежная валидация.</p></div>';
        }
        
        // Производительность
        const performanceScore = (mistakes.performance / totalSteps) * 100;
        if (performanceScore > 10) {
            profileHtml += '<div class="profile-card"><h4>⚡ Производительность</h4><p>🐌 Оптимизатор-любитель. Часто упускает из виду bottlenecks и кэширование.</p></div>';
        } else if (performanceScore > 5) {
            profileHtml += '<div class="profile-card"><h4>⚡ Производительность</h4><p>🚀 Сбалансированный оптимизатор. Хорошая производительность с occasional improvements.</p></div>';
        } else {
            profileHtml += '<div class="profile-card"><h4>⚡ Производительность</h4><p>✅ Перфоманс гуру. Код оптимизирован, профилирование на высоте.</p></div>';
        }

        profile.innerHTML = profileHtml;
    }

    generateStoryResult(percentage) {
        const resultsContainer = document.getElementById('final-results');
        let story = '';
        
        if (percentage >= 90) {
            story = `
                <div class="feedback success">
                    <h2>🚀 Легендарный разработчик!</h2>
                    <p>Ваша игра "Змейка" - это шедевр инженерной мысли! От идеального планирования до безупречной реализации.</p>
                    <p>🎯 Результат: Профессиональный код, отличная архитектура, полный CI/CD пайплайн.</p>
                    <p>Команда мечты готова предложить вам позицию Tech Lead!</p>
                    <p><strong>Оценка: ${Math.round(percentage)}% - Превосходно! 🏆</strong></p>
                </div>
            `;
        } else if (percentage >= 70) {
            story = `
                <div class="feedback warning">
                    <h2>👍 Солидный middle-разработчик!</h2>
                    <p>Хорошая работа! Ваша змейка работает стабильно, архитектура в целом продумана.</p>
                    <p>🎯 Результат: Рабочий проект с небольшими техническими долгами.</p>
                    <p>Есть куда расти, но вы определенно на правильном пути!</p>
                    <p><strong>Оценка: ${Math.round(percentage)}% - Хорошо! ✅</strong></p>
                </div>
            `;
        } else if (percentage >= 50) {
            story = `
                <div class="feedback warning">
                    <h2>🎓 Перспективный junior-разработчик</h2>
                    <p>Неплохой старт! Проект работает, но требует доработок в архитектуре и тестировании.</p>
                    <p>🎯 Результат: Базовый функционал реализован, нужен рефакторинг.</p>
                    <p>Продолжайте практиковаться - прогресс очевиден!</p>
                    <p><strong>Оценка: ${Math.round(percentage)}% - Удовлетворительно 📚</strong></p>
                </div>
            `;
        } else {
            story = `
                <div class="feedback error">
                    <h2>💪 Начинающий разработчик</h2>
                    <p>Первый блин комом? Не беда! Каждый эксперт когда-то начинал с нуля.</p>
                    <p>🎯 Результат: Проект требует значительного рефакторинга и лучших практик.</p>
                    <p>Рекомендуем повторить основы разработки и архитектуры.</p>
                    <p><strong>Оценка: ${Math.round(percentage)}% - Нужно подтянуть знания 📖</strong></p>
                </div>
            `;
        }
        
        resultsContainer.innerHTML = story;
    }

    createGamePreview() {
        const preview = document.getElementById('game-preview');
        const mistakes = this.gameData.mistakes;
        const percentage = (this.gameData.score / 60) * 100;
        
        let gameStyle = 'classic';
        let gameDescription = '';
        
        if (percentage >= 85) {
            gameStyle = 'premium';
            gameDescription = "💎 Премиум змейка - отполированная, оптимизированная, с полным набором функций!";
        } else if (percentage >= 70) {
            gameStyle = 'classic';
            gameDescription = "🎯 Классическая змейка - стабильная, функциональная, приятная в использовании";
        } else if (percentage >= 50) {
            gameStyle = 'basic';
            gameDescription = "📱 Базовая змейка - работает, но есть небольшие баги и неоптимальности";
        } else {
            gameStyle = 'experimental';
            gameDescription = "🔬 Экспериментальная версия - требует доработки, но ядро игры функционирует";
        }
        
        preview.innerHTML = `
            <h3>🎮 Ваша версия Snake Game:</h3>
            <div class="snake-preview" id="snake-canvas"></div>
            <p><strong>Стиль игры:</strong> ${gameDescription}</p>
            <div class="game-features">
                <h4>Реализованные функции:</h4>
                <ul>
                    <li>${percentage >= 60 ? '✅' : '❌'} Основной геймплей змейки</li>
                    <li>${percentage >= 70 ? '✅' : '❌'} Система рекордов с MongoDB</li>
                    <li>${percentage >= 80 ? '✅' : '❌'} Звуковые эффекты и музыка</li>
                    <li>${percentage >= 85 ? '✅' : '❌'} Полноценное меню и настройки</li>
                    <li>${percentage >= 90 ? '✅' : '❌'} CI/CD и автоматическое тестирование</li>
                </ul>
            </div>
        `;
        
        this.drawGamePreview(gameStyle);
    }

    drawGamePreview(style) {
        const canvas = document.getElementById('snake-canvas');
        
        const styles = {
            premium: {
                bgColor: '#0f1b33',
                snakeColor: '#00ff88',
                foodColor: '#ff4444',
                textColor: '#00ff88'
            },
            classic: {
                bgColor: '#1a202c',
                snakeColor: '#68d391', 
                foodColor: '#fc8181',
                textColor: '#68d391'
            },
            basic: {
                bgColor: '#2d3748',
                snakeColor: '#ecc94b',
                foodColor: '#ed8936',
                textColor: '#ecc94b'
            },
            experimental: {
                bgColor: '#4a5568',
                snakeColor: '#a0aec0',
                foodColor: '#718096',
                textColor: '#a0aec0'
            }
        };
        
        const styleConfig = styles[style] || styles.classic;
        
        canvas.innerHTML = `
            <div style="width:100%;height:100%;background:${styleConfig.bgColor};display:flex;align-items:center;justify-content:center;color:${styleConfig.textColor};font-family:monospace;border-radius:8px;position:relative;">
                <div style="text-align:center;">
                    <div style="font-size:24px;margin-bottom:10px;">🐍</div>
                    <div style="font-weight:bold;">Snake Game</div>
                    <div style="font-size:12px;margin-top:5px;opacity:0.8;">${style.toUpperCase()} EDITION</div>
                </div>
                <div style="position:absolute;bottom:10px;right:10px;width:10px;height:10px;background:${styleConfig.snakeColor};border-radius:2px;"></div>
                <div style="position:absolute;top:20px;left:30px;width:8px;height:8px;background:${styleConfig.foodColor};border-radius:50%;"></div>
            </div>
        `;
    }

    playGame() {
        const percentage = (this.gameData.score / 60) * 100;
        let message = '';
        
        if (percentage >= 80) {
            message = '🎮 Запускаем ПРЕМИУМ версию! Ваша игра готова к production с полным набором функций!';
        } else if (percentage >= 60) {
            message = '🎮 Запускаем СТАНДАРТНУЮ версию! Игра работает стабильно с основными функциями.';
        } else if (percentage >= 40) {
            message = '🎮 Запускаем БАЗОВУЮ версию! Есть некоторые ограничения, но геймплей работает.';
        } else {
            message = '🎮 Запускаем ЭКСПЕРИМЕНТАЛЬНУЮ версию! Игра требует доработки, но ядро функционирует.';
        }
        
        alert(message + '\n\nВ реальной реализации здесь бы запускалась сгенерированная Python игра через WebAssembly с учетом всех ваших архитектурных решений!');
    }

    restartGame() {
        this.showScreen('welcome-screen');
        document.getElementById('player-name').value = '';
        this.initArchitecture();
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new GameTrainer();
});