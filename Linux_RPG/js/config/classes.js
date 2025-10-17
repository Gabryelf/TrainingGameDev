const PLAYER_CLASSES = {
    hacker: {
        id: 'hacker',
        name: 'Хакер',
        description: 'Специалист по безопасности и взлому систем',
        baseColor: '#00ff00',
        skills: [
            {
                id: 'quick_learn',
                name: 'Быстрое обучение',
                description: '+20% опыта за изучение новых команд',
                level: 1
            },
            {
                id: 'stealth',
                name: 'Скрытность',
                description: 'Команды выполняются тише и реже вызывают подозрения',
                level: 5
            }
        ],
        bonuses: {
            xpMultiplier: 1.2,
            commandLearningSpeed: 1.5
        }
    },
    sysadmin: {
        id: 'sysadmin',
        name: 'Системный администратор',
        description: 'Эксперт по обслуживанию и настройке систем',
        baseColor: '#3498db',
        skills: [
            {
                id: 'efficient_commands',
                name: 'Эффективные команды',
                description: 'Команды выполняются на 30% быстрее',
                level: 1
            },
            {
                id: 'system_repair',
                name: 'Ремонт системы',
                description: 'Может восстанавливать поврежденные файлы',
                level: 5
            }
        ],
        bonuses: {
            commandEfficiency: 1.3,
            errorReduction: 0.7
        }
    },
    developer: {
        id: 'developer',
        name: 'Разработчик',
        description: 'Создатель программ и скриптов',
        baseColor: '#e74c3c',
        skills: [
            {
                id: 'script_master',
                name: 'Мастер скриптов',
                description: 'Может создавать макросы из команд',
                level: 1
            },
            {
                id: 'debugging',
                name: 'Отладка',
                description: 'Видит дополнительную информацию об ошибках',
                level: 5
            }
        ],
        bonuses: {
            scriptPower: 1.4,
            debugInfo: true
        }
    }
};

const CLASS_EVOLUTIONS = {
    hacker: [
        {
            level: 5,
            classes: ['ethical_hacker', 'security_analyst']
        },
        {
            level: 10,
            classes: ['pentester', 'cyber_warrior']
        }
    ],
    sysadmin: [
        {
            level: 5,
            classes: ['network_engineer', 'devops']
        },
        {
            level: 10,
            classes: ['cloud_architect', 'site_reliability_engineer']
        }
    ],
    developer: [
        {
            level: 5,
            classes: ['senior_developer', 'tech_lead']
        },
        {
            level: 10,
            classes: ['software_architect', 'cto']
        }
    ]
};

const ADVANCED_CLASSES = {
    ethical_hacker: {
        name: 'Этичный хакер',
        description: 'Специалист по тестированию на проникновение',
        skills: ['vulnerability_scanning', 'social_engineering']
    },
    pentester: {
        name: 'Тестер на проникновение',
        description: 'Профессионал в области взлома систем',
        skills: ['advanced_exploitation', 'zero_day_research']
    }
    // ... другие продвинутые классы
};