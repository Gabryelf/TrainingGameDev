const COMMANDS_CONFIG = {
    linux: {
        basic: [
            {
                id: 'ls',
                name: 'ls',
                description: 'Показать содержимое директории',
                usage: 'ls [опции] [путь]',
                examples: ['ls', 'ls -l', 'ls /home'],
                xp: 10,
                chapter: 1,
                category: 'navigation'
            },
            {
                id: 'cd',
                name: 'cd',
                description: 'Перейти в другую директорию',
                usage: 'cd [путь]',
                examples: ['cd /home', 'cd ..', 'cd ~'],
                xp: 10,
                chapter: 1,
                category: 'navigation'
            }
        ],
        intermediate: [
            {
                id: 'grep',
                name: 'grep',
                description: 'Поиск текста в файлах',
                usage: 'grep [опции] шаблон [файлы]',
                examples: ['grep "hello" file.txt', 'grep -r "pattern" .'],
                xp: 30,
                chapter: 3,
                category: 'text_processing'
            }
        ]
        // ... другие команды
    },
    windows: {
        basic: [
            {
                id: 'dir',
                name: 'dir',
                description: 'Показать содержимое директории',
                usage: 'dir [путь]',
                examples: ['dir', 'dir C:\\Users'],
                xp: 10,
                chapter: 1,
                category: 'navigation'
            }
        ]
        // ... другие команды Windows
    }
};

const COMMAND_CATEGORIES = {
    navigation: { name: 'Навигация', color: '#3498db' },
    file_management: { name: 'Управление файлами', color: '#e74c3c' },
    text_processing: { name: 'Обработка текста', color: '#9b59b6' },
    system_info: { name: 'Системная информация', color: '#f1c40f' },
    process_management: { name: 'Управление процессами', color: '#1abc9c' },
    networking: { name: 'Сеть', color: '#d35400' }
};