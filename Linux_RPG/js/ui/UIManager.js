class UIManager {
    constructor() {
        this.currentFilter = 'all';
        this.isSidebarCollapsed = false;
        this.gameEngine = null;
    }

    init(gameEngine) {
        this.gameEngine = gameEngine;
        this.setupEventListeners();
        this.setupCommandFilters();
        this.initializeTooltips();
        this.loadSettings();
        this.setupKeyboardInput(); // Добавляем обработку клавиатуры
    }

    setupKeyboardInput() {
        // Обработка ввода команд с клавиатуры
        document.addEventListener('keydown', (e) => {
            // Игнорируем если вводим в input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Быстрые команды с клавиатуры
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1': this.executeQuickCommand('ls'); break;
                    case '2': this.executeQuickCommand('cd'); break;
                    case '3': this.executeQuickCommand('pwd'); break;
                    // Добавьте другие быстрые команды по необходимости
                }
            }
        });
    }

    setupEventListeners() {
        // Кнопки тулбара
        document.getElementById('menu-btn').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('save-btn').addEventListener('click', () => this.quickSave());
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('quick-save').addEventListener('click', () => this.quickSave());
        document.getElementById('quick-help').addEventListener('click', () => this.showHelp());
        document.getElementById('toggle-theme').addEventListener('click', () => this.toggleTheme());

        // Настройки
        document.getElementById('close-settings-btn').addEventListener('click', () => this.hideModal('settings-modal'));
        document.getElementById('close-help-btn').addEventListener('click', () => this.hideModal('help-modal'));
        document.getElementById('reset-game-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('export-save-btn').addEventListener('click', () => this.exportSave());
        document.getElementById('import-save-btn').addEventListener('click', () => this.importSave());
        document.getElementById('theme-selector').addEventListener('change', (e) => this.changeTheme(e.target.value));
        document.getElementById('auto-save-toggle').addEventListener('change', (e) => this.toggleAutoSave(e.target.checked));

        // Фильтры команд
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterCommands(e.target.dataset.filter));
        });
    }

    showSettings() {
        this.updateSettingsInfo();
        this.showModal('settings-modal');
    }

    updateSettingsInfo() {
        const saveInfo = Storage.getSaveInfo();
        if (saveInfo) {
            document.getElementById('total-play-time').textContent = 
                Helpers.formatTime(saveInfo.playTime);
            document.getElementById('last-save-time').textContent = 
                new Date(saveInfo.saveTime).toLocaleString();
        }
    }

    showHelp() {
        this.showModal('help-modal');
    }

    resetGame() {
        if (confirm('ВНИМАНИЕ! Это действие полностью удалит весь ваш прогресс и нельзя будет его восстановить. Вы уверены?')) {
            if (confirm('Точно уверены? Все ваши достижения, уровень и прогресс будут потеряны!')) {
                Storage.deleteSave();
                location.reload();
            }
        }
    }

    exportSave() {
        if (this.gameEngine) {
            this.gameEngine.exportSave();
        }
    }

    importSave() {
        const input = document.getElementById('import-save-input');
        input.click();
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                Storage.importSave(file).then(() => {
                    this.showNotification('Сохранение успешно импортировано!', 'success');
                    setTimeout(() => location.reload(), 1000);
                }).catch(error => {
                    this.showNotification('Ошибка импорта: ' + error.message, 'error');
                });
            }
        };
    }


    executeQuickCommand(commandName) {
        if (!this.gameEngine || !this.gameEngine.isRunning) return;

        const commands = Object.values(COMMANDS_CONFIG[this.gameEngine.player.gameMode]).flat();
        const command = commands.find(cmd => cmd.name === commandName);
        
        if (command) {
            this.gameEngine.executeCommand(command);
        }
    }

    updateCommandsDisplay(player) {
        const commandsGrid = document.getElementById('commands-grid');
        commandsGrid.innerHTML = '';

        const allCommands = Object.values(COMMANDS_CONFIG[player.gameMode]).flat();
        const availableCommands = allCommands.filter(cmd => 
            cmd.chapter <= player.currentChapter
        );

        const filteredCommands = availableCommands.filter(cmd => {
            const isLearned = player.commandsLearned.includes(cmd.id);
            
            switch (this.currentFilter) {
                case 'learned':
                    return isLearned;
                case 'new':
                    return !isLearned;
                default:
                    return true;
            }
        });

        if (filteredCommands.length === 0) {
            commandsGrid.innerHTML = '<div class="no-commands">Нет доступных команд</div>';
            return;
        }

        filteredCommands.forEach(command => {
            const isLearned = player.commandsLearned.includes(command.id);
            const button = document.createElement('button');
            
            button.className = `command-btn ${isLearned ? 'learned' : 'new'}`;
            button.textContent = command.name;
            button.title = `${command.description}\nИспользование: ${command.usage}\n\nПримеры:\n${command.examples.join('\n')}`;
            
            // Делаем ВСЕ команды кликабельными
            button.addEventListener('click', () => {
                if (this.gameEngine && this.gameEngine.isRunning) {
                    this.gameEngine.executeCommand(command);
                } else {
                    this.showNotification('Игра еще не начата!', 'warning');
                }
            });

            // Добавляем подсказку с быстрой клавишей
            const quickKey = this.getQuickKeyForCommand(command.name);
            if (quickKey) {
                button.setAttribute('data-shortcut', quickKey);
            }

            commandsGrid.appendChild(button);
        });
    }

    setupCommandFilters() {
        this.currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterCommands(btn.dataset.filter);
            });
        });
    }

    filterCommands(filter) {
        this.currentFilter = filter;
        this.updateCommandsDisplay(GameEngine.player);
    }

    updatePlayerInfo(player) {
        // Основная информация
        document.getElementById('player-name').textContent = player.name;
        document.getElementById('player-class-badge').textContent = player.class?.name || 'Новичок';
        document.getElementById('player-level').textContent = `Ур. ${player.level}`;
        
        // Статистика
        document.getElementById('stat-class').textContent = player.class?.name || 'Не выбран';
        document.getElementById('stat-score').textContent = player.score.toLocaleString();
        document.getElementById('stat-commands').textContent = player.commandsLearned.length;
        document.getElementById('stat-chapter').textContent = player.currentChapter;

        // XP бар
        const xpFill = document.getElementById('xp-fill');
        const xpText = document.getElementById('xp-text');
        const xpPercentage = (player.xp / player.getXPForNextLevel()) * 100;
        
        xpFill.style.width = `${xpPercentage}%`;
        xpText.textContent = `${player.xp}/${player.getXPForNextLevel()} XP`;

        // Аватар
        this.updatePlayerAvatar(player);
        
        // Навыки класса
        this.updateClassSkills(player);
    }

    updatePlayerAvatar(player) {
        const avatar = document.getElementById('player-avatar');
        if (player.class) {
            avatar.style.background = `linear-gradient(135deg, ${player.class.baseColor}, #2c3e50)`;
            
            // Иконка в зависимости от класса
            const iconMap = {
                hacker: 'fa-user-secret',
                sysadmin: 'fa-cogs',
                developer: 'fa-code'
            };
            
            const iconClass = iconMap[player.class.id] || 'fa-user';
            avatar.innerHTML = `<i class="fas ${iconClass}"></i>`;
        }
    }

    updateClassSkills(player) {
        const skillsContainer = document.getElementById('class-skills');
        skillsContainer.innerHTML = '';

        if (!player.class) return;

        player.class.skills.forEach(skill => {
            const isUnlocked = player.level >= skill.level;
            const skillElement = document.createElement('div');
            skillElement.className = `skill-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            skillElement.innerHTML = `
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">Ур. ${skill.level}</span>
                </div>
                <div class="skill-description">${skill.description}</div>
                ${!isUnlocked ? '<div class="skill-locked">🔒 Недоступно</div>' : ''}
            `;
            skillsContainer.appendChild(skillElement);
        });
    }


    updateStoryDisplay(chapterId) {
        const chapter = STORY_CHAPTERS.find(c => c.id === chapterId);
        if (!chapter) return;

        const storyTitle = document.getElementById('story-title');
        const storyContent = document.getElementById('story-content');
        const progressElement = document.getElementById('story-progress');

        storyTitle.textContent = `Глава ${chapter.id}: ${chapter.title}`;
        
        const progress = GameEngine.storyEngine.getChapterProgress(chapterId);
        progressElement.textContent = `${progress}%`;

        storyContent.innerHTML = `
            <div class="chapter-description">
                <p>${chapter.description}</p>
            </div>
            <div class="chapter-objectives">
                <h4>Цели главы:</h4>
                <ul>
                    ${chapter.objectives.map(obj => 
                        `<li class="objective-item">${obj}</li>`
                    ).join('')}
                </ul>
            </div>
            <div class="chapter-rewards">
                <h4>Награды:</h4>
                <div class="rewards-list">
                    <span class="reward-item">🎯 ${chapter.rewards.xp} XP</span>
                    <span class="reward-item">⭐ ${chapter.rewards.score} очков</span>
                </div>
            </div>
        `;

        // Обновляем прогресс целей
        this.updateObjectivesProgress(chapter);
    }

    updateObjectivesProgress(chapter) {
        const objectives = document.querySelectorAll('.objective-item');
        objectives.forEach((objective, index) => {
            // Здесь можно добавить логику проверки выполнения целей
            // и визуально отмечать выполненные
        });
    }

    updateGameTime(gameTime) {
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        const days = Math.floor(minutes / 1440) + 1;
        
        document.getElementById('game-time').textContent = 
            `Время: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('game-date').textContent = `День: ${days}`;
    }

    updateActiveEvents(events) {
        const eventsContainer = document.getElementById('active-events');
        eventsContainer.innerHTML = '';

        if (events.length === 0) {
            eventsContainer.innerHTML = '<div class="no-events">Нет активных событий</div>';
            return;
        }

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.innerHTML = `
                <div class="event-header">
                    <span class="event-name">${event.name}</span>
                    <span class="event-timer">⏱️</span>
                </div>
                <div class="event-description">${event.description}</div>
            `;
            eventsContainer.appendChild(eventElement);
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('show');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        document.querySelectorAll('.sidebar').forEach(sidebar => {
            sidebar.classList.toggle('collapsed', this.isSidebarCollapsed);
        });
    }

    quickSave() {
        GameEngine.saveGame();
        this.showNotification('Игра сохранена!', 'success');
    }


    showHelp() {
        Terminal.addOutput('=== СПРАВКА ===', 'info');
        Terminal.addOutput('• Используйте команды для взаимодействия с системой');
        Terminal.addOutput('• Изучайте новые команды для прогресса в игре');
        Terminal.addOutput('• Следите за сюжетом и выполняйте цели глав');
        Terminal.addOutput('• Улучшайте класс персонажа каждые 5 уровней');
        Terminal.addOutput('================', 'info');
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        const isDark = document.body.classList.contains('dark-theme');
        this.showNotification(`Тема изменена: ${isDark ? 'Тёмная' : 'Светлая'}`, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    initializeTooltips() {
        // Инициализация tooltip'ов для элементов интерфейса
        const elementsWithTooltip = document.querySelectorAll('[title]');
        elementsWithTooltip.forEach(element => {
            // Можно добастить расширенную логику tooltip'ов
        });
    }

    changeTheme(theme) {
        if (theme === 'auto') {
            // Автоматическое определение темы системы
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-theme');
            } else {
                document.body.classList.add('dark-theme');
                document.body.classList.remove('light-theme');
            }
        } else {
            document.body.classList.toggle('light-theme', theme === 'light');
            document.body.classList.toggle('dark-theme', theme === 'dark');
        }
        
        localStorage.setItem('terminalQuest-theme', theme);
        this.showNotification(`Тема изменена: ${theme}`, 'info');
    }

    toggleAutoSave(enabled) {
        if (this.gameEngine) {
            if (enabled) {
                this.gameEngine.setupAutoSave();
            } else {
                clearInterval(this.gameEngine.autoSaveInterval);
            }
        }
        localStorage.setItem('terminalQuest-autoSave', enabled);
    }

    loadSettings() {
        // Загрузка темы
        const savedTheme = localStorage.getItem('terminalQuest-theme') || 'dark';
        document.getElementById('theme-selector').value = savedTheme;
        this.changeTheme(savedTheme);
        
        // Загрузка настроек автосохранения
        const autoSave = localStorage.getItem('terminalQuest-autoSave') !== 'false';
        document.getElementById('auto-save-toggle').checked = autoSave;
    }

    getQuickKeyForCommand(commandName) {
        const quickKeys = {
            'ls': 'Ctrl+1',
            'cd': 'Ctrl+2', 
            'pwd': 'Ctrl+3',
            'mkdir': 'Ctrl+4',
            'touch': 'Ctrl+5'
        };
        return quickKeys[commandName];
    }

}