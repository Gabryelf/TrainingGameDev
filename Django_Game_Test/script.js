class DjangoGameTest {
    constructor() {
        this.students = [];
        this.currentStudent = null;
        this.selectedTheme = null;
        this.selectedDifficulty = null;
        this.currentQuestion = null;
        this.answeredQuestions = new Set();
        this.gameActive = false;
        this.gameTimer = null;
        this.timeLeft = 60;
        this.totalQuestions = 60;
        this.answeredCount = 0;
        this.gameStartTime = null;
        this.questionQueue = [];
        this.usedQuestions = new Set();
        
        this.avatarColors = [
            '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
            '#073B4C', '#EF476F', '#7209B7', '#3A86FF', '#FB5607',
            '#8338EC', '#FF006E', '#FF9E00', '#1D3557', '#E63946',
            '#A8DADC', '#457B9D', '#F4A261', '#2A9D8F', '#E76F51'
        ];
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateStudentList();
        this.updateProgress();
        this.setupQuestionQueue();
    }
    
    setupQuestionQueue() {
        // Создаем очередь всех вопросов
        this.questionQueue = [];
        for (const theme in questionsDatabase) {
            for (const difficulty in questionsDatabase[theme]) {
                questionsDatabase[theme][difficulty].forEach((question, index) => {
                    this.questionQueue.push({
                        theme,
                        difficulty: parseInt(difficulty),
                        index,
                        question: question.question,
                        answer: question.answer,
                        id: `${theme}_${difficulty}_${index}`
                    });
                });
            }
        }
        
        // Перемешиваем вопросы
        this.shuffleArray(this.questionQueue);
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    bindEvents() {
        // Главный экран
        document.getElementById('add-student').addEventListener('click', () => this.addStudent());
        document.getElementById('student-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addStudent();
        });
        document.getElementById('clear-students').addEventListener('click', () => this.clearStudents());
        document.getElementById('start-rules').addEventListener('click', () => this.showScreen('rules-screen'));
        
        // Экран правил
        document.getElementById('back-to-main').addEventListener('click', () => this.showScreen('main-screen'));
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        
        // Экран игры
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTheme(e.target.dataset.theme));
        });
        
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDifficulty(parseInt(e.target.dataset.difficulty)));
        });
        
        document.getElementById('next-student').addEventListener('click', () => this.nextStudent());
        document.getElementById('show-answer').addEventListener('click', () => this.showAnswerModal());
        document.getElementById('show-leaderboard').addEventListener('click', () => this.showLeaderboardModal());
        document.getElementById('pause-game').addEventListener('click', () => this.pauseGame());
        
        // Модальное окно оценки
        document.getElementById('accept-answer').addEventListener('click', () => this.evaluateAnswer(true));
        document.getElementById('reject-answer').addEventListener('click', () => this.evaluateAnswer(false));
        document.querySelector('.close-modal').addEventListener('click', () => this.hideModal());
        
        // Модальное окно лидерборда
        document.querySelector('.close-leaderboard').addEventListener('click', () => this.hideLeaderboardModal());
        
        // Экран завершения
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
        document.getElementById('back-to-main-from-end').addEventListener('click', () => {
            this.showScreen('main-screen');
            this.restartGame();
        });
    }
    
    addStudent() {
        const nameInput = document.getElementById('student-name');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Введите имя ученика');
            return;
        }
        
        if (this.students.length >= 30) {
            alert('Максимум 30 учеников');
            return;
        }
        
        if (this.students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            alert('Ученик с таким именем уже добавлен');
            return;
        }
        
        const student = {
            id: Date.now(),
            name: name,
            score: 0,
            answers: 0,
            correctAnswers: 0,
            avatarColor: this.avatarColors[this.students.length % this.avatarColors.length],
            avatarText: name.charAt(0).toUpperCase(),
            canAnswer: true,
            timesAnswered: 0
        };
        
        this.students.push(student);
        nameInput.value = '';
        this.updateStudentList();
        this.saveToStorage();
    }
    
    clearStudents() {
        if (confirm('Очистить список учеников?')) {
            this.students = [];
            this.updateStudentList();
            this.saveToStorage();
        }
    }
    
    updateStudentList() {
        const container = document.getElementById('students-container');
        const countElement = document.getElementById('student-count');
        const startButton = document.getElementById('start-rules');
        
        countElement.textContent = this.students.length;
        startButton.disabled = this.students.length < 2;
        
        container.innerHTML = '';
        
        this.students.forEach(student => {
            const div = document.createElement('div');
            div.className = 'student-item';
            div.innerHTML = `
                <div class="avatar" style="background-color: ${student.avatarColor}">
                    ${student.avatarText}
                </div>
                <span>${student.name}</span>
                <button class="remove-student" data-id="${student.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
        });
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-student').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.remove-student').dataset.id);
                this.removeStudent(id);
            });
        });
    }
    
    removeStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        this.updateStudentList();
        this.saveToStorage();
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        
        if (screenId === 'game-screen') {
            this.updateLeaderboard();
        }
    }
    
    startGame() {
        if (this.students.length < 2) {
            alert('Добавьте минимум 2 ученика');
            return;
        }
        
        this.gameActive = true;
        this.gameStartTime = Date.now();
        this.showScreen('game-screen');
        this.nextStudent();
    }
    
    nextStudent() {
        // Сбрасываем таймер
        this.resetTimer();
        
        // Находим учеников, которые могут отвечать (менее 5 баллов)
        const eligibleStudents = this.students.filter(s => s.canAnswer && s.score < 5);
        
        if (eligibleStudents.length === 0) {
            this.endGame();
            return;
        }
        
        // Находим учеников, которые еще не отвечали в этом раунде
        const studentsNotAnswered = eligibleStudents.filter(s => s.timesAnswered === 0);
        
        // Если есть ученики, которые еще не отвечали - выбираем из них
        // Иначе сбрасываем счетчики и выбираем из всех
        let candidates;
        if (studentsNotAnswered.length > 0) {
            candidates = studentsNotAnswered;
        } else {
            // Сбрасываем счетчики для нового раунда
            this.students.forEach(s => s.timesAnswered = 0);
            candidates = eligibleStudents;
        }
        
        // Выбираем случайного ученика
        const randomIndex = Math.floor(Math.random() * candidates.length);
        this.currentStudent = candidates[randomIndex];
        
        // Увеличиваем счетчик ответов
        this.currentStudent.timesAnswered++;
        
        // Сбрасываем выбранные тему и сложность
        this.selectedTheme = null;
        this.selectedDifficulty = null;
        this.currentQuestion = null;
        
        // Обновляем UI
        this.updateCurrentStudentDisplay();
        this.resetQuestionDisplay();
        
        // Активируем кнопки тем
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
        });
        
        // Деактивируем кнопки сложности
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.disabled = true;
        });
        
        // Деактивируем кнопки управления
        document.getElementById('next-student').disabled = true;
        document.getElementById('show-answer').disabled = true;
        
        // Показываем сообщение о выборе темы
        document.getElementById('question-text').textContent = 
            `${this.currentStudent.name}, выберите тему для вопроса`;
    }
    
    selectTheme(theme) {
        this.selectedTheme = theme;
        
        // Деактивируем все кнопки тем
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
        
        // Активируем кнопку выбранной темы
        const selectedBtn = document.querySelector(`[data-theme="${theme}"]`);
        selectedBtn.style.backgroundColor = this.currentStudent.avatarColor;
        selectedBtn.style.color = 'white';
        
        // Активируем кнопки сложности
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.disabled = false;
        });
        
        // Показываем сообщение о выборе сложности
        document.getElementById('question-text').textContent = 
            `Отлично! Теперь выберите сложность вопроса по теме "${this.getThemeName(theme)}"`;
    }
    
    selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
        
        // Деактивируем все кнопки сложности
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.disabled = true;
        });
        
        // Находим доступный вопрос
        this.currentQuestion = this.getRandomQuestion();
        
        if (!this.currentQuestion) {
            alert('Вопросы по этой теме и сложности закончились!');
            return;
        }
        
        // Обновляем отображение вопроса
        document.getElementById('question-text').textContent = this.currentQuestion.question;
        document.getElementById('question-theme').textContent = `Тема: ${this.getThemeName(this.selectedTheme)}`;
        document.getElementById('question-difficulty').textContent = `Сложность: ${difficulty} балл${difficulty > 1 ? 'а' : ''}`;
        document.getElementById('question-difficulty').className = `badge badge-${difficulty}`;
        
        // Активируем кнопку показа ответа
        document.getElementById('show-answer').disabled = false;
        
        // Запускаем таймер
        this.startTimer();
    }
    
    getRandomQuestion() {
        // Фильтруем доступные вопросы
        const availableQuestions = this.questionQueue.filter(q => 
            q.theme === this.selectedTheme && 
            q.difficulty === this.selectedDifficulty &&
            !this.usedQuestions.has(q.id)
        );
        
        if (availableQuestions.length === 0) {
            return null;
        }
        
        // Выбираем случайный вопрос
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];
        
        // Помечаем как использованный
        this.usedQuestions.add(question.id);
        this.answeredCount++;
        
        // Обновляем прогресс
        this.updateProgress();
        
        return question;
    }
    
    startTimer() {
        this.timeLeft = 60;
        this.updateTimerDisplay();
        
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    resetTimer() {
        clearInterval(this.gameTimer);
        this.timeLeft = 60;
        this.updateTimerDisplay();
    }
    
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        const circleTimer = document.getElementById('circle-timer');
        const progressCircle = document.querySelector('.timer-circle-progress');
        
        // Обновляем текстовый таймер
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Обновляем круглый таймер
        circleTimer.textContent = this.timeLeft;
        
        // Обновляем прогресс круга
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (this.timeLeft / 60) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        // Меняем цвет при малом времени
        if (this.timeLeft <= 10) {
            progressCircle.style.stroke = '#e74c3c';
        } else if (this.timeLeft <= 30) {
            progressCircle.style.stroke = '#f39c12';
        } else {
            progressCircle.style.stroke = '#4fc3a1';
        }
    }
    
    timeUp() {
        clearInterval(this.gameTimer);
        alert('Время вышло!');
        this.showAnswerModal();
    }
    
    showAnswerModal() {
        clearInterval(this.gameTimer);
        
        if (!this.currentQuestion || !this.currentStudent) return;
        
        // Заполняем модальное окно
        document.getElementById('modal-student-name').textContent = this.currentStudent.name;
        document.getElementById('modal-theme').textContent = this.getThemeName(this.selectedTheme);
        document.getElementById('modal-difficulty').textContent = this.selectedDifficulty;
        document.getElementById('modal-points').textContent = this.selectedDifficulty;
        document.getElementById('modal-question').textContent = this.currentQuestion.question;
        document.getElementById('modal-correct-answer').textContent = this.currentQuestion.answer;
        
        // Устанавливаем аватар
        const modalAvatar = document.getElementById('modal-avatar');
        modalAvatar.style.backgroundColor = this.currentStudent.avatarColor;
        modalAvatar.textContent = this.currentStudent.avatarText;
        
        // Показываем модальное окно
        document.getElementById('answer-modal').classList.add('active');
        
        // Фокусируемся на поле ответа
        document.getElementById('student-answer').focus();
    }
    
    hideModal() {
        document.getElementById('answer-modal').classList.remove('active');
        document.getElementById('student-answer').value = '';
    }
    
    evaluateAnswer(accepted) {
        if (accepted) {
            // Добавляем баллы ученику
            this.currentStudent.score += this.selectedDifficulty;
            this.currentStudent.correctAnswers++;
            
            // Показываем уведомление
            alert(`Ответ принят! ${this.currentStudent.name} получает ${this.selectedDifficulty} балл${this.selectedDifficulty > 1 ? 'а' : ''}!`);
        } else {
            alert(`Ответ отклонен. ${this.currentStudent.name} не получает баллов.`);
        }
        
        // Обновляем статистику
        this.currentStudent.answers++;
        
        // Проверяем, достиг ли ученик 5 баллов
        if (this.currentStudent.score >= 5) {
            this.currentStudent.canAnswer = false;
        }
        
        // Обновляем лидерборд
        this.updateLeaderboard();
        this.updateCurrentStudentDisplay();
        
        // Проверяем, закончилась ли игра
        if (this.answeredCount >= this.totalQuestions || this.students.filter(s => s.canAnswer && s.score < 5).length === 0) {
            this.endGame();
        } else {
            // Переходим к следующему ученику
            this.hideModal();
            this.nextStudent();
        }
        
        // Сохраняем состояние
        this.saveToStorage();
    }
    
    updateCurrentStudentDisplay() {
        if (!this.currentStudent) return;
        
        document.getElementById('current-student-name').textContent = this.currentStudent.name;
        document.getElementById('current-score').textContent = this.currentStudent.score;
        document.getElementById('current-answers').textContent = this.currentStudent.answers;
        
        const avatar = document.getElementById('current-avatar');
        avatar.style.background = `linear-gradient(135deg, ${this.currentStudent.avatarColor}, ${this.darkenColor(this.currentStudent.avatarColor, 20)})`;
        avatar.innerHTML = `<span>${this.currentStudent.avatarText}</span>`;
    }
    
    updateLeaderboard() {
        // Сортируем учеников по баллам
        const sortedStudents = [...this.students].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.answers - b.answers;
        });
        
        // Обновляем лидерборд в игровом экране
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';
        
        sortedStudents.forEach((student, index) => {
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="leaderboard-avatar" style="background-color: ${student.avatarColor}">
                        ${student.avatarText}
                    </div>
                    <span>${index + 1}. ${student.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="badge badge-${Math.min(student.score, 3)}">${student.score} баллов</span>
                    ${student.score >= 5 ? '<i class="fas fa-crown" style="color: gold;"></i>' : ''}
                </div>
            `;
            leaderboardList.appendChild(div);
        });
        
        // Обновляем полный лидерборд в модальном окне
        this.updateFullLeaderboard(sortedStudents);
    }
    
    updateFullLeaderboard(sortedStudents) {
        const fullLeaderboard = document.getElementById('full-leaderboard');
        fullLeaderboard.innerHTML = '';
        
        sortedStudents.forEach((student, index) => {
            const percentage = student.answers > 0 ? 
                Math.round((student.correctAnswers / student.answers) * 100) : 0;
            
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-weight: bold; width: 30px; text-align: center;">
                        ${index + 1}
                    </div>
                    <div class="leaderboard-avatar" style="background-color: ${student.avatarColor}">
                        ${student.avatarText}
                    </div>
                    <div>
                        <div style="font-weight: bold;">${student.name}</div>
                        <div style="font-size: 0.9em; color: #666;">${student.answers} ответов</div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.5em; font-weight: bold; color: #4a6fa5;">
                        ${student.score} баллов
                    </div>
                    <div style="font-size: 0.9em; color: #666;">
                        Успешность: ${percentage}%
                    </div>
                </div>
            `;
            fullLeaderboard.appendChild(div);
        });
    }
    
    showLeaderboardModal() {
        if (this.gameTimer) {
            alert('Лидерборд недоступен во время ответа ученика!');
            return;
        }
        
        document.getElementById('leaderboard-modal').classList.add('active');
    }
    
    hideLeaderboardModal() {
        document.getElementById('leaderboard-modal').classList.remove('active');
    }
    
    pauseGame() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            alert('Игра на паузе. Нажмите OK чтобы продолжить.');
            this.startTimer();
        } else {
            alert('Игра уже на паузе или не активна.');
        }
    }
    
    updateProgress() {
        const progress = (this.answeredCount / this.totalQuestions) * 100;
        document.getElementById('game-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${this.answeredCount}/${this.totalQuestions} вопросов`;
    }
    
    resetQuestionDisplay() {
        document.getElementById('question-text').textContent = 'Выберите тему и сложность для получения вопроса';
        document.getElementById('question-theme').textContent = 'Тема: -';
        document.getElementById('question-difficulty').textContent = 'Сложность: -';
        document.getElementById('question-difficulty').className = 'badge';
        
        // Сбрасываем стили кнопок тем
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        
        // Вычисляем общее время игры
        const totalTime = Date.now() - this.gameStartTime;
        const minutes = Math.floor(totalTime / 60000);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        
        // Находим победителя
        const winner = this.students.reduce((prev, current) => 
            (prev.score > current.score) ? prev : current
        );
        
        // Заполняем экран завершения
        document.getElementById('winner-name').textContent = winner.name;
        document.getElementById('winner-points').textContent = winner.score;
        document.getElementById('total-questions').textContent = this.answeredCount;
        document.getElementById('total-time').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('active-students').textContent = this.students.filter(s => s.score >= 5).length;
        
        // Устанавливаем аватар победителя
        const winnerAvatar = document.getElementById('winner-avatar');
        winnerAvatar.style.background = `linear-gradient(135deg, ${winner.avatarColor}, ${this.darkenColor(winner.avatarColor, 20)})`;
        winnerAvatar.innerHTML = `<span>${winner.avatarText}</span>`;
        
        // Заполняем таблицу результатов
        const sortedStudents = [...this.students].sort((a, b) => b.score - a.score);
        const resultsTable = document.getElementById('final-results-table');
        resultsTable.innerHTML = '';
        
        sortedStudents.forEach((student, index) => {
            const percentage = student.answers > 0 ? 
                Math.round((student.correctAnswers / student.answers) * 100) : 0;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="leaderboard-avatar" style="background-color: ${student.avatarColor}">
                            ${student.avatarText}
                        </div>
                        ${student.name}
                    </div>
                </td>
                <td><strong>${student.score}</strong></td>
                <td>${student.answers}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1; height: 8px; background: #e0e0e0; border-radius: 4px;">
                            <div style="width: ${percentage}%; height: 100%; background: ${percentage >= 70 ? '#2ecc71' : percentage >= 40 ? '#f39c12' : '#e74c3c'}; border-radius: 4px;"></div>
                        </div>
                        ${percentage}%
                    </div>
                </td>
            `;
            resultsTable.appendChild(row);
        });
        
        // Показываем экран завершения
        this.showScreen('completion-screen');
        
        // Очищаем сохраненную игру
        localStorage.removeItem('djangoGameState');
    }
    
    restartGame() {
        if (confirm('Начать новую игру? Текущий прогресс будет потерян.')) {
            // Сбрасываем состояние игры
            this.currentStudent = null;
            this.selectedTheme = null;
            this.selectedDifficulty = null;
            this.currentQuestion = null;
            this.answeredQuestions.clear();
            this.gameActive = false;
            clearInterval(this.gameTimer);
            this.timeLeft = 60;
            this.answeredCount = 0;
            this.usedQuestions.clear();
            this.questionQueue = [];
            this.setupQuestionQueue();
            
            // Сбрасываем учеников
            this.students.forEach(student => {
                student.score = 0;
                student.answers = 0;
                student.correctAnswers = 0;
                student.canAnswer = true;
                student.timesAnswered = 0;
            });
            
            // Показываем главный экран
            this.showScreen('main-screen');
            this.updateStudentList();
            this.updateProgress();
            this.saveToStorage();
        }
    }
    
    getThemeName(theme) {
        const themes = {
            'models': 'Models',
            'views': 'Views',
            'templates': 'Templates'
        };
        return themes[theme] || theme;
    }
    
    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }
    
    saveToStorage() {
        const gameState = {
            students: this.students,
            answeredCount: this.answeredCount,
            usedQuestions: Array.from(this.usedQuestions),
            gameStartTime: this.gameStartTime
        };
        localStorage.setItem('djangoGameState', JSON.stringify(gameState));
    }
    
    loadFromStorage() {
        const saved = localStorage.getItem('djangoGameState');
        if (saved) {
            try {
                const gameState = JSON.parse(saved);
                
                if (confirm('Найдена сохраненная игра. Загрузить?')) {
                    this.students = gameState.students;
                    this.answeredCount = gameState.answeredCount || 0;
                    this.usedQuestions = new Set(gameState.usedQuestions || []);
                    this.gameStartTime = gameState.gameStartTime;
                    
                    // Если игра была активна, продолжаем
                    if (this.gameStartTime && this.answeredCount > 0 && this.answeredCount < this.totalQuestions) {
                        this.showScreen('game-screen');
                        this.updateProgress();
                        this.updateLeaderboard();
                        this.nextStudent();
                    }
                }
            } catch (e) {
                console.error('Ошибка загрузки сохраненной игры:', e);
            }
        }
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.game = new DjangoGameTest();
});