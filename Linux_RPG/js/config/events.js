const GAME_EVENTS = {
    daily: [
        {
            id: 'maintenance',
            name: 'Техническое обслуживание',
            description: 'Система проходит плановое обслуживание',
            effects: {
                message: '🔧 Системное уведомление: Проводится техническое обслуживание',
                temporaryBonus: { xp: 1.1 },
                duration: 3600 // 1 час в секундах
            }
        }
    ],
    random: [
        {
            id: 'virus_attack',
            name: 'Вирусная атака',
            description: 'Обнаружена вредоносная программа!',
            probability: 0.05,
            effects: {
                message: '🦠 ВНИМАНИЕ: Обнаружена вирусная активность!',
                temporaryBlock: ['rm', 'chmod', 'sudo'],
                requiredCommands: ['ps', 'kill'],
                duration: 5
            }
        }
    ]
};