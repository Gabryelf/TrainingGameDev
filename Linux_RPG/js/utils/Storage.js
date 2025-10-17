// js/utils/Storage.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
class Storage {
    static saveGame(gameData) {
        try {
            const saveData = {
                ...gameData,
                saveTime: new Date().toISOString(),
                version: '1.0.0'
            };
            
            localStorage.setItem('terminalQuestSave', JSON.stringify(saveData));
            console.log('Игра сохранена:', saveData);
            return true;
        } catch (error) {
            console.error('Ошибка сохранения игры:', error);
            return false;
        }
    }

    static loadGame() {
        try {
            const saved = localStorage.getItem('terminalQuestSave');
            if (!saved) {
                console.log('Сохранение не найдено');
                return null;
            }
            
            const saveData = JSON.parse(saved);
            console.log('Сохранение загружено:', saveData);
            
            // Базовая валидация структуры
            if (!saveData.player) {
                console.warn('Неверная структура сохранения: отсутствует player');
                return null;
            }
            
            return saveData;
        } catch (error) {
            console.error('Ошибка загрузки игры:', error);
            return null;
        }
    }

    static deleteSave() {
        try {
            localStorage.removeItem('terminalQuestSave');
            console.log('Сохранение удалено');
            return true;
        } catch (error) {
            console.error('Ошибка удаления сохранения:', error);
            return false;
        }
    }

    static getSaveInfo() {
        const saved = this.loadGame();
        if (!saved) return null;
        
        return {
            playerName: saved.player?.name || 'Неизвестно',
            level: saved.player?.level || 1,
            chapter: saved.player?.currentChapter || 1,
            saveTime: saved.saveTime || 'Неизвестно',
            playTime: saved.player?.stats?.playTime || 0,
            commandsLearned: Array.isArray(saved.player?.commandsLearned) ? saved.player.commandsLearned.length : 0
        };
    }

    static exportSave() {
        const saveData = this.loadGame();
        if (!saveData) return null;
        
        try {
            const dataStr = JSON.stringify(saveData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            return URL.createObjectURL(dataBlob);
        } catch (error) {
            console.error('Ошибка экспорта:', error);
            return null;
        }
    }

    static importSave(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const saveData = JSON.parse(e.target.result);
                    
                    if (!this.validateSaveData(saveData)) {
                        reject(new Error('Неверный формат файла сохранения'));
                        return;
                    }
                    
                    this.saveGame(saveData);
                    resolve(true);
                } catch (error) {
                    reject(new Error('Ошибка парсинга файла: ' + error.message));
                }
            };
            
            reader.onerror = () => reject(new Error('Ошибка чтения файла'));
            reader.readAsText(file);
        });
    }

    static validateSaveData(saveData) {
        return saveData && 
               saveData.player && 
               typeof saveData.player === 'object' &&
               saveData.version;
    }
}