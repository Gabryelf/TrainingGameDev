// js/game/GameEngine.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
class GameEngine {
    constructor() {
        this.player = new Player();
        this.terminal = new Terminal();
        this.storyEngine = new StoryEngine();
        this.uiManager = new UIManager();
        this.isRunning = false;
        this.gameTime = 0;
        this.autoSaveInterval = null;
        this.hasExistingSave = false;
    }

    async init() {
        try {
            this.terminal.init();
            this.uiManager.init(this);
            
            // Проверяем есть ли сохранение
            const savedGame = this.safeLoadGame();
            this.hasExistingSave = this.isValidSave(savedGame);
            
            if (this.hasExistingSave) {
                // Показываем окно с выбором - продолжить или новая игра
                this.showGameStartModal();
            } else {
                // Нет сохранения - сразу создаем персонажа
                this.showCharacterCreation();
            }

            this.startGameLoop();
            this.setupAutoSave();
            
        } catch (error) {
            console.error('Ошибка инициализации GameEngine:', error);
            this.handleInitError(error);
        }
    }

    showGameStartModal() {
        this.uiManager.showModal('character-creation-modal');
        
        // Показываем информацию о существующем сохранении
        const saveInfo = Storage.getSaveInfo();
        const modal = document.getElementById('character-creation-modal');
        const title = modal.querySelector('h2');
        const continueBtn = document.getElementById('continue-game-btn');
        const startBtn = document.getElementById('start-game-btn');
        
        title.textContent = 'Добро пожаловать в Terminal Quest!';
        
        // Добавляем информацию о сохранении
        const existingSaveInfo = document.createElement('div');
        existingSaveInfo.className = 'existing-save-info';
        existingSaveInfo.innerHTML = `
            <div class="save-details">
                <h3>Обнаружено существующее сохранение:</h3>
                <p><strong>Игрок:</strong> ${saveInfo.playerName}</p>
                <p><strong>Уровень:</strong> ${saveInfo.level}</p>
                <p><strong>Глава:</strong> ${saveInfo.chapter}</p>
                <p><strong>Изучено команд:</strong> ${saveInfo.commandsLearned}</p>
            </div>
        `;
        
        const form = modal.querySelector('.character-creation');
        form.insertBefore(existingSaveInfo, form.firstChild);
        
        // Настраиваем кнопки
        continueBtn.style.display = 'inline-block';
        startBtn.textContent = 'Начать заново';
        
        continueBtn.onclick = () => {
            this.loadExistingGame();
        };
        
        startBtn.onclick = () => {
            if (confirm('Вы уверены, что хотите начать новую игру? Текущий прогресс будет потерян!')) {
                this.showCharacterCreation();
            }
        };
        
        // Заполняем выбор классов (на случай новой игры)
        this.populateClassSelection();
    }

    safeLoadGame() {
        try {
            return Storage.loadGame();
        } catch (error) {
            console.error('Ошибка загрузки сохранения:', error);
            return null;
        }
    }

    isValidSave(savedGame) {
        return savedGame && 
               savedGame.player && 
               savedGame.player.name && 
               typeof savedGame.player.name === 'string' &&
               savedGame.player.name.trim() !== '';
    }

    async loadSavedGame(savedGame) {
        try {
            this.player.fromJSON(savedGame.player);
            this.isRunning = true;
            
            // Обновляем UI
            this.uiManager.updatePlayerInfo(this.player);
            this.uiManager.updateCommandsDisplay(this.player);
            this.uiManager.updateStoryDisplay(this.player.currentChapter);
            
            // Приветственное сообщение
            this.terminal.addOutput(`=== ИГРА ЗАГРУЖЕНА ===`);
            this.terminal.addOutput(`Добро пожаловать обратно, ${this.player.name}!`);
            this.terminal.addOutput(`Уровень: ${this.player.level} | Глава: ${this.player.currentChapter}`);
            this.terminal.addOutput(`Изучено команд: ${this.player.commandsLearned.length}`);
            this.terminal.addOutput('Используйте команды для продолжения игры.');
            this.terminal.addOutput('================================');
            
        } catch (error) {
            console.error('Ошибка загрузки игры:', error);
            throw new Error('Не удалось загрузить сохранение. Файл может быть поврежден.');
        }
    }

    handleInitError(error) {
        this.terminal.addOutput(`❌ Ошибка инициализации: ${error.message}`, 'error');
        this.terminal.addOutput('Попытка восстановления...');
        
        // Пробуем создать новую игру
        setTimeout(() => {
            this.terminal.addOutput('Запуск создания нового персонажа...');
            this.showCharacterCreation();
        }, 2000);
    }

    showCharacterCreation() {
        this.uiManager.showModal('character-creation-modal');
        
        // Очищаем возможную информацию о предыдущем сохранении
        const existingInfo = document.querySelector('.existing-save-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        const title = document.querySelector('#character-creation-modal h2');
        const continueBtn = document.getElementById('continue-game-btn');
        const startBtn = document.getElementById('start-game-btn');
        
        title.textContent = 'Создание персонажа';
        continueBtn.style.display = 'none';
        startBtn.textContent = 'Начать игру';
        
        this.populateClassSelection();

        // Обработчики
        startBtn.onclick = () => this.startNewGame();
        
        const nameInput = document.getElementById('player-name-input');
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startNewGame();
        });
        
        // Фокус на поле имени
        setTimeout(() => nameInput.focus(), 100);
    }

    startNewGame() {
        const playerName = document.getElementById('player-name-input').value.trim();
        const computerName = document.getElementById('computer-name-input').value.trim();
        const selectedClass = document.querySelector('input[name="player-class"]:checked');
        
        // Валидация
        if (!playerName) {
            alert('Пожалуйста, введите имя пользователя!');
            return;
        }
        if (!computerName) {
            alert('Пожалуйста, введите имя компьютера!');
            return;
        }
        if (!selectedClass) {
            alert('Пожалуйста, выберите класс!');
            return;
        }

        // Создаем нового игрока
        this.player = new Player();
        this.player.name = playerName;
        this.player.computerName = computerName;
        this.player.class = PLAYER_CLASSES[selectedClass.value];
        
        this.uiManager.hideModal('character-creation-modal');
        this.isRunning = true;
        
        // Очищаем терминал и показываем приветствие
        this.terminal.clear();
        this.terminal.addOutput(`=== TERMINAL QUEST PRO ===`);
        this.terminal.addOutput(`Игра началась! Добро пожаловать, ${playerName}!`);
        this.terminal.addOutput(`Ваш класс: ${this.player.class.name}`);
        this.terminal.addOutput(`Компьютер: ${computerName}`);
        this.terminal.addOutput('================================');
        this.terminal.addOutput('Используйте команды для взаимодействия с системой.');
        
        // Запускаем начальное событие
        setTimeout(() => {
            if (this.storyEngine) {
                this.storyEngine.triggerEvent('wake_up', true);
            }
        }, 1000);
        
        // Обновляем UI
        this.uiManager.updatePlayerInfo(this.player);
        this.uiManager.updateCommandsDisplay(this.player);
        
        // Сохраняем
        this.saveGame();
    }

    loadExistingGame() {
        const savedGame = this.safeLoadGame();
        if (this.isValidSave(savedGame)) {
            this.player.fromJSON(savedGame.player);
            this.isRunning = true;
            
            this.uiManager.hideModal('character-creation-modal');
            this.uiManager.updatePlayerInfo(this.player);
            this.uiManager.updateCommandsDisplay(this.player);
            this.uiManager.updateStoryDisplay(this.player.currentChapter);
            
            this.terminal.addOutput(`=== ИГРА ПРОДОЛЖЕНА ===`);
            this.terminal.addOutput(`С возвращением, ${this.player.name}!`);
            this.terminal.addOutput(`Уровень: ${this.player.level} | Глава: ${this.player.currentChapter}`);
            this.terminal.addOutput(`Изучено команд: ${this.player.commandsLearned.length}`);
            this.terminal.addOutput('Используйте команды для продолжения игры.');
            this.terminal.addOutput('================================');
        }
    }

    populateClassSelection() {
        const classesContainer = document.getElementById('classes-selection');
        classesContainer.innerHTML = '';
        
        Object.values(PLAYER_CLASSES).forEach(playerClass => {
            const classElement = document.createElement('div');
            classElement.className = 'class-option';
            classElement.innerHTML = `
                <input type="radio" name="player-class" value="${playerClass.id}" id="class-${playerClass.id}">
                <label for="class-${playerClass.id}" class="class-label">
                    <div class="class-icon" style="background: ${playerClass.baseColor}">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="class-info">
                        <h4>${playerClass.name}</h4>
                        <p>${playerClass.description}</p>
                    </div>
                </label>
            `;
            classesContainer.appendChild(classElement);
        });

        // Выбираем первый класс по умолчанию
        const firstClass = document.querySelector('.class-option input');
        if (firstClass) firstClass.checked = true;
    }


    async executeCommand(command) {
        if (!this.isRunning) return;

        try {
            this.terminal.addInput(command.name, this.player);
            
            // Проверка, изучена ли команда
            const isNewCommand = this.player.learnCommand(command.id);
            
            if (isNewCommand) {
                const xpGained = this.player.addXP(command.xp);
                this.terminal.addSuccess(`Вы изучили новую команду: ${command.name}`);
                this.terminal.addOutput(`+${xpGained} опыта получено!`);
                
                // Проверка событий
                if (this.storyEngine) {
                    this.storyEngine.checkCommandEvents(command.id);
                }
            }

            // Имитация выполнения команды
            await this.terminal.simulateCommandExecution(command, this.player);
            
            // Случайные события
            this.checkRandomEvents();
            
            // Обновление интерфейса
            this.uiManager.updatePlayerInfo(this.player);
            this.uiManager.updateCommandsDisplay(this.player);
            
            // Прогресс главы
            this.checkChapterProgress();
            
            this.saveGame();
            
        } catch (error) {
            console.error('Ошибка выполнения команды:', error);
            this.terminal.addError(`Ошибка выполнения команды: ${error.message}`);
        }
    }

    checkRandomEvents() {
        // Базовая реализация случайных событий
        if (Math.random() < 0.1) { // 10% шанс
            this.terminal.addOutput('🎲 Произошло случайное событие!', 'warning');
        }
    }

    checkChapterProgress() {
        // Базовая проверка прогресса
        const learnedCount = this.player.commandsLearned.length;
        if (learnedCount >= 3 && this.player.currentChapter === 1) {
            this.completeChapter();
        }
    }

    completeChapter() {
        this.player.currentChapter++;
        this.terminal.addOutput(`🎉 Переход к главе ${this.player.currentChapter}!`, 'success');
        this.uiManager.updateStoryDisplay(this.player.currentChapter);
    }

    setupAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            if (this.isRunning) {
                this.saveGame();
                this.terminal.addOutput('💾 Игра автоматически сохранена', 'success');
            }
        }, 60000);
    }

    saveGame() {
        try {
            Storage.saveGame({
                player: this.player.toJSON(),
                timestamp: Date.now(),
                version: '1.0.0'
            });
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            this.terminal.addError('Не удалось сохранить игру');
        }
    }

    startGameLoop() {
        setInterval(() => {
            if (this.isRunning) {
                this.gameTime++;
                this.player.stats.playTime++;
                this.uiManager.updateGameTime(this.gameTime);
            }
        }, 1000);
    }

    getGameEngine() {
        return this;
    }

    // Метод для экспорта сохранения
    exportSave() {
        const saveUrl = Storage.exportSave();
        if (saveUrl) {
            const a = document.createElement('a');
            a.href = saveUrl;
            a.download = `terminal_quest_save_${this.player.name}_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(saveUrl);
            return true;
        }
        return false;
    }
}

// Делаем GameEngine глобально доступным для отладки
window.GameEngine = GameEngine;