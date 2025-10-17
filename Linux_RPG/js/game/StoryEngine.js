class StoryEngine {
    constructor() {
        this.currentEvent = null;
        this.eventQueue = [];
        this.completedEvents = new Set();
        this.activeRandomEvents = new Map();
    }

    triggerEvent(eventId, immediate = false) {
        const event = STORY_EVENTS[eventId];
        if (!event || this.completedEvents.has(eventId)) return;

        if (immediate) {
            this.executeEvent(event);
        } else {
            this.eventQueue.push(event);
        }
    }

    executeEvent(event) {
        this.currentEvent = event;
        
        switch (event.type) {
            case 'scripted':
                this.handleScriptedEvent(event);
                break;
            case 'interactive':
                this.handleInteractiveEvent(event);
                break;
            case 'choice':
                this.handleChoiceEvent(event);
                break;
        }
        
        this.completedEvents.add(event.id);
    }

    handleScriptedEvent(event) {
        event.dialog.forEach((line, index) => {
            setTimeout(() => {
                Terminal.addOutput(line, 'story');
                
                if (index === event.dialog.length - 1 && event.onComplete) {
                    this.executeEventCompletion(event);
                }
            }, index * 2000);
        });
    }

    handleInteractiveEvent(event) {
        Terminal.addOutput('💬 ИНТЕРАКТИВНОЕ СОБЫТИЕ:', 'story');
        event.dialog.forEach(line => {
            Terminal.addOutput(line, 'story');
        });

        if (event.choices) {
            this.presentChoices(event.choices);
        }
    }

    presentChoices(choices) {
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'story-choices';
        
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => this.handleChoice(choice);
            choicesContainer.appendChild(button);
        });

        Terminal.element.appendChild(choicesContainer);
    }

    handleChoice(choice) {
        document.querySelector('.story-choices')?.remove();
        
        Terminal.addOutput(`> ${choice.text}`, 'player-choice');
        
        if (choice.effects) {
            this.applyChoiceEffects(choice.effects);
        }
        
        if (choice.nextEvent) {
            this.triggerEvent(choice.nextEvent, true);
        }
    }

    applyChoiceEffects(effects) {
        if (effects.xp) {
            GameEngine.player.addXP(effects.xp);
            Terminal.addOutput(`+${effects.xp} опыта получено!`, 'success');
        }
        
        if (effects.unlockCommands) {
            effects.unlockCommands.forEach(cmdId => {
                GameEngine.player.learnCommand(cmdId);
                Terminal.addOutput(`🔓 Команда разблокирована: ${cmdId}`, 'success');
            });
        }
    }

    checkCommandEvents(commandId) {
        Object.entries(STORY_EVENTS).forEach(([eventId, event]) => {
            if (event.trigger === `command_learned:${commandId}` && 
                !this.completedEvents.has(eventId)) {
                this.triggerEvent(eventId, true);
            }
        });
    }

    processEventQueue() {
        if (this.eventQueue.length > 0 && !this.currentEvent) {
            const nextEvent = this.eventQueue.shift();
            this.executeEvent(nextEvent);
        }
    }

    startRandomEvent(eventConfig) {
        const eventId = `random_${Date.now()}`;
        const event = {
            id: eventId,
            ...eventConfig,
            startTime: Date.now(),
            duration: eventConfig.duration || 30000 // 30 секунд по умолчанию
        };

        this.activeRandomEvents.set(eventId, event);
        this.executeEvent(event);

        // Автоматическое завершение события через указанное время
        setTimeout(() => {
            this.endRandomEvent(eventId);
        }, event.duration);
    }

    endRandomEvent(eventId) {
        const event = this.activeRandomEvents.get(eventId);
        if (event) {
            this.activeRandomEvents.delete(eventId);
            
            if (event.onEnd) {
                event.onEnd();
            }
            
            Terminal.addOutput(`Событие '${event.name}' завершено.`, 'info');
        }
    }

    getActiveEvents() {
        return Array.from(this.activeRandomEvents.values());
    }

    isEventActive(eventId) {
        return this.activeRandomEvents.has(eventId);
    }

    getChapterProgress(chapterId) {
        const chapter = STORY_CHAPTERS.find(c => c.id === chapterId);
        if (!chapter) return 0;

        const learnedCommands = chapter.requiredCommands.filter(cmd => 
            GameEngine.player.commandsLearned.includes(cmd)
        );

        return Math.round((learnedCommands.length / chapter.requiredCommands.length) * 100);
    }
}