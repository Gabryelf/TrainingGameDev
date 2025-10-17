// js/main.js - ОБНОВЛЕННАЯ ВЕРСИЯ
class TerminalQuestApp {
    constructor() {
        this.gameEngine = new GameEngine();
        this.isInitialized = false;
    }

    async init() {
        try {
            // Проверка поддержки localStorage
            if (!this.checkBrowserSupport()) {
                this.showBrowserError();
                return;
            }

            // Инициализация движка игры
            await this.gameEngine.init();
            
            this.isInitialized = true;
            this.setupGlobalHandlers();
            
            console.log('Terminal Quest Pro инициализирован!');
            
        } catch (error) {
            console.error('Ошибка инициализации приложения:', error);
            this.showInitError(error);
        }
    }

    checkBrowserSupport() {
        try {
            return typeof Storage !== 'undefined' && 
                   'localStorage' in window && 
                   window.localStorage !== null;
        } catch (e) {
            return false;
        }
    }

    showBrowserError() {
        document.body.innerHTML = `
            <div class="browser-error" style="padding: 20px; text-align: center; color: white;">
                <h1>⚠️ Неподдерживаемый браузер</h1>
                <p>Для работы Terminal Quest Pro требуется браузер с поддержкой:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>Local Storage</li>
                    <li>ES6+ features</li>
                    <li>CSS Grid & Flexbox</li>
                </ul>
                <p>Пожалуйста, обновите браузер или используйте современный браузер.</p>
            </div>
        `;
    }

    showInitError(error) {
        document.body.innerHTML = `
            <div class="init-error" style="padding: 20px; text-align: center; color: white;">
                <h1>🚫 Ошибка загрузки</h1>
                <p>Не удалось загрузить Terminal Quest Pro:</p>
                <pre style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;">${error.message}</pre>
                <button onclick="location.reload()" style="background: #e94560; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Перезагрузить</button>
            </div>
        `;
    }

    setupGlobalHandlers() {
        // Обработчик перед закрытием страницы
        window.addEventListener('beforeunload', (e) => {
            if (this.gameEngine.isRunning) {
                this.gameEngine.saveGame();
                e.preventDefault();
                e.returnValue = '';
            }
        });

        // Глобальные горячие клавиши
        document.addEventListener('keydown', (e) => {
            // Ctrl+S для сохранения
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.gameEngine.saveGame();
                this.gameEngine.uiManager.showNotification('Игра сохранена!', 'success');
            }
            
            // Ctrl+L для очистки терминала
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.gameEngine.terminal.clear();
                this.gameEngine.terminal.addOutput('Терминал очищен.');
            }
            
            // F1 для справки
            if (e.key === 'F1') {
                e.preventDefault();
                this.gameEngine.uiManager.showHelp();
            }
        });

        // Обработчик изменения размера окна
        window.addEventListener('resize', Helpers.throttle(() => {
            this.handleResize();
        }, 250));
    }

    handleResize() {
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile-layout', isMobile);
    }

    // Метод для сброса игры
    resetGame() {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
            Storage.deleteSave();
            location.reload();
        }
    }

    // Метод для экспорта сохранения
    exportSave() {
        const saveUrl = Storage.exportSave();
        if (saveUrl) {
            const a = document.createElement('a');
            a.href = saveUrl;
            a.download = `terminal_quest_save_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(saveUrl);
            this.gameEngine.uiManager.showNotification('Сохранение экспортировано!', 'success');
        }
    }
}

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    window.TerminalQuest = new TerminalQuestApp();
    await window.TerminalQuest.init();
});

// Глобальные функции для отладки
window.debugGame = () => {
    return window.TerminalQuest?.getGameEngine();
};

window.resetGame = () => {
    window.TerminalQuest?.resetGame();
};