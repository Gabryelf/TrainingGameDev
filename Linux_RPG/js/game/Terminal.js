class Terminal {
    constructor() {
        this.element = document.getElementById('terminal');
        this.history = [];
        this.historyIndex = -1;
        this.currentDirectory = '/home/user';
        this.isWindows = false;
    }

    init() {
        this.clear();
        this.addWelcomeMessage();
        this.setupEventListeners();
    }

    addWelcomeMessage() {
        this.addOutput('Добро пожаловать в Terminal Quest Pro!');
        this.addOutput('Для начала игры создайте своего персонажа.');
        this.addOutput('------------------------------------------------');
    }

    addInput(command, player) {
        const prompt = this.generatePrompt(player);
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `
            <span class="prompt">${prompt}</span>
            <span class="command">${command}</span>
        `;
        this.element.appendChild(line);
        this.scrollToBottom();
        
        // Добавляем в историю
        this.history.push(command);
        this.historyIndex = this.history.length;
    }

    addOutput(message, type = 'info') {
        const line = document.createElement('div');
        line.className = `terminal-line output ${type}`;
        line.textContent = message;
        this.element.appendChild(line);
        this.scrollToBottom();
    }

    addError(message) {
        this.addOutput(`Ошибка: ${message}`, 'error');
    }

    addSuccess(message) {
        this.addOutput(`✓ ${message}`, 'success');
    }

    addWarning(message) {
        this.addOutput(`⚠ ${message}`, 'warning');
    }

    generatePrompt(player) {
        if (!player.name || !player.computerName) {
            return 'user@terminal-quest:~$ ';
        }
        
        const className = player.class ? `-${player.class.id}` : '';
        return `${player.name}@${player.computerName}${className}:~$ `;
    }

    clear() {
        this.element.innerHTML = '';
    }

    scrollToBottom() {
        this.element.scrollTop = this.element.scrollHeight;
    }

    setupEventListeners() {
        // Очистка терминала
        document.getElementById('clear-terminal').addEventListener('click', () => {
            this.clear();
            this.addOutput('Терминал очищен.');
        });

        // Экспорт терминала
        document.getElementById('export-terminal').addEventListener('click', () => {
            this.exportHistory();
        });
    }

    exportHistory() {
        const content = this.element.innerText;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `terminal_quest_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.addSuccess('История терминала экспортирована!');
    }

    simulateCommandExecution(command, player) {
        // Имитация задержки выполнения команды
        const baseDelay = 500;
        const efficiency = player.class?.bonuses?.commandEfficiency || 1;
        const delay = baseDelay / efficiency;
        
        return new Promise(resolve => {
            setTimeout(() => {
                // Здесь будет логика выполнения конкретных команд
                this.addOutput(`Команда '${command.name}' выполнена успешно`);
                resolve(true);
            }, delay);
        });
    }

    simulateCommandExecution(command, player) {
        return new Promise(resolve => {
            const baseDelay = 800; // Увеличим задержку для лучшего UX
            const efficiency = player.class?.bonuses?.commandEfficiency || 1;
            const delay = baseDelay / efficiency;
            
            setTimeout(() => {
                let output = '';
                
                // Разные ответы для разных команд
                switch(command.name) {
                    case 'ls':
                        output = this.getLSOutput();
                        break;
                    case 'pwd':
                        output = `/home/${player.name}`;
                        break;
                    case 'mkdir':
                        output = `Директория 'new_folder' создана успешно`;
                        break;
                    case 'cd':
                        output = `Переход в директорию /home/${player.name}`;
                        break;
                    case 'touch':
                        output = `Файл 'new_file.txt' создан`;
                        break;
                    default:
                        output = `Команда '${command.name}' выполнена успешно`;
                }
                
                this.addOutput(output);
                resolve(true);
            }, delay);
        });
    }

    getLSOutput() {
        return `total 4
drwxr-xr-x 2 user user 4096 Dec 10 10:00 documents
drwxr-xr-x 2 user user 4096 Dec 10 10:00 downloads
-rw-r--r-- 1 user user  123 Dec 10 09:55 readme.txt`;
    }
}