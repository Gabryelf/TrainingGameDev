// js/game/Player.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
class Player {
    constructor() {
        this.name = '';
        this.computerName = 'terminal-quest';
        this.class = null;
        this.level = 1;
        this.xp = 0;
        this.score = 0;
        this.commandsLearned = []; // ДОЛЖЕН БЫТЬ МАССИВОМ!
        this.skills = [];
        this.inventory = [];
        this.stats = {
            commandsMastered: 0,
            chaptersCompleted: 0,
            playTime: 0,
            eventsTriggered: 0
        };
        this.currentChapter = 1;
        this.gameMode = 'linux';
    }

    learnCommand(commandId) {
        if (!this.commandsLearned.includes(commandId)) {
            this.commandsLearned.push(commandId);
            return true;
        }
        return false;
    }

    addXP(amount) {
        const multiplier = this.class?.bonuses?.xpMultiplier || 1;
        const finalAmount = Math.floor(amount * multiplier);
        this.xp += finalAmount;
        
        const xpNeeded = this.getXPForNextLevel();
        if (this.xp >= xpNeeded) {
            this.levelUp();
        }
        
        return finalAmount;
    }

    getXPForNextLevel() {
        return this.level * 100;
    }

    levelUp() {
        this.level++;
        this.xp = 0;
        
        if (this.level % 5 === 0) {
            this.triggerClassEvolution();
        }
        
        this.unlockClassSkills();
        
        return this.level;
    }

    triggerClassEvolution() {
        const evolution = CLASS_EVOLUTIONS[this.class?.id];
        if (evolution) {
            const availableEvolutions = evolution.filter(e => e.level === this.level);
            if (availableEvolutions.length > 0) {
                // Логика выбора новой специализации
                console.log('Available evolutions:', availableEvolutions);
            }
        }
    }

    unlockClassSkills() {
        if (!this.class) return;
        
        const availableSkills = this.class.skills.filter(skill => 
            skill.level <= this.level && 
            !this.skills.includes(skill.id)
        );
        
        availableSkills.forEach(skill => {
            this.skills.push(skill.id);
            if (window.GameEngine) {
                window.GameEngine.terminal.addOutput(`🎯 Новый навык разблокирован: ${skill.name}`);
            }
        });
    }

    getClassSkill(skillId) {
        return this.class?.skills.find(s => s.id === skillId);
    }

    hasSkill(skillId) {
        return this.skills.includes(skillId);
    }

    getProgress() {
        const totalCommands = Object.values(COMMANDS_CONFIG[this.gameMode])
            .flat()
            .filter(cmd => cmd.chapter <= this.currentChapter).length;
            
        const progress = {
            commands: {
                learned: this.commandsLearned.length,
                total: totalCommands,
                percentage: Math.round((this.commandsLearned.length / totalCommands) * 100)
            },
            chapter: this.currentChapter,
            level: this.level,
            score: this.score
        };
        
        return progress;
    }

    toJSON() {
        return {
            name: this.name,
            computerName: this.computerName,
            class: this.class,
            level: this.level,
            xp: this.xp,
            score: this.score,
            commandsLearned: this.commandsLearned,
            skills: this.skills,
            inventory: this.inventory,
            stats: this.stats,
            currentChapter: this.currentChapter,
            gameMode: this.gameMode
        };
    }

    fromJSON(data) {
        // ВАЖНО: Восстанавливаем все свойства, гарантируя правильные типы данных
        this.name = data.name || '';
        this.computerName = data.computerName || 'terminal-quest';
        this.class = data.class || null;
        this.level = Number(data.level) || 1;
        this.xp = Number(data.xp) || 0;
        this.score = Number(data.score) || 0;
        
        // ГАРАНТИРУЕМ, что commandsLearned - это массив
        this.commandsLearned = Array.isArray(data.commandsLearned) ? data.commandsLearned : [];
        
        this.skills = Array.isArray(data.skills) ? data.skills : [];
        this.inventory = Array.isArray(data.inventory) ? data.inventory : [];
        this.stats = {
            commandsMastered: Number(data.stats?.commandsMastered) || 0,
            chaptersCompleted: Number(data.stats?.chaptersCompleted) || 0,
            playTime: Number(data.stats?.playTime) || 0,
            eventsTriggered: Number(data.stats?.eventsTriggered) || 0
        };
        this.currentChapter = Number(data.currentChapter) || 1;
        this.gameMode = data.gameMode || 'linux';
        
        return this;
    }
}