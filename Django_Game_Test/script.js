class DjangoGameTest {
    constructor() {
        this.students = [];
        this.currentStudent = null;
        this.selectedTheme = null;
        this.selectedDifficulty = null;
        this.currentQuestion = null;
        this.gameActive = false;
        this.gameTimer = null;
        this.timeLeft = 60;
        this.totalQuestions = 60;
        this.answeredCount = 0;
        this.gameStartTime = null;
        this.questionQueue = [];
        this.usedQuestions = new Set();
        this.gameInterval = null;
        this.gameDuration = 0;
        
        this.avatarColors = [
            '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
            '#7209B7', '#3A86FF', '#FB5607', '#8338EC', '#FF006E',
            '#FF9E00', '#1D3557', '#E63946', '#A8DADC', '#457B9D',
            '#F4A261', '#2A9D8F', '#E76F51', '#9B5DE5', '#00BBF9'
        ];
        
        this.avatarIcons = [
            'fas fa-user', 'fas fa-user-tie', 'fas fa-user-graduate', 'fas fa-user-ninja',
            'fas fa-user-astronaut', 'fas fa-user-secret', 'fas fa-user-md', 'fas fa-user-injured',
            'fas fa-user-cog', 'fas fa-user-check', 'fas fa-user-edit', 'fas fa-user-friends',
            'fas fa-user-plus', 'fas fa-user-shield', 'fas fa-user-tag', 'fas fa-user-clock'
        ];
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateStudentList();
        this.updateProgress();
        this.setupQuestionQueue();
        this.setupConfetti();
    }
    
    setupQuestionQueue() {
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
            btn.addEventListener('click', (e) => this.selectTheme(e.currentTarget.dataset.theme));
        });
        
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDifficulty(parseInt(e.currentTarget.dataset.difficulty)));
        });
        
        document.getElementById('next-student').addEventListener('click', () => this.nextStudent());
        document.getElementById('show-answer').addEventListener('click', () => this.showAnswerModal());
        document.getElementById('show-leaderboard').addEventListener('click', () => this.showLeaderboardModal());
        document.getElementById('show-full-leaderboard').addEventListener('click', () => this.showLeaderboardModal());
        document.getElementById('pause-game').addEventListener('click', () => this.pauseGame());
        
        // Модальное окно оценки
        document.getElementById('accept-answer').addEventListener('click', () => this.evaluateAnswer(true));
        document.getElementById('reject-answer').addEventListener('click', () => this.evaluateAnswer(false));
        document.getElementById('clear-answer').addEventListener('click', () => {
            document.getElementById('student-answer').value = '';
            this.updateCharCount();
        });
        document.querySelector('.close-modal').addEventListener('click', () => this.hideModal());
        document.getElementById('student-answer').addEventListener('input', () => this.updateCharCount());
        
        // Модальное окно лидерборда
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.currentTarget.dataset.tab));
        });
        
        // Экран завершения
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
        document.getElementById('back-to-main-from-end').addEventListener('click', () => {
            this.showScreen('main-screen');
            this.restartGame();
        });
        
        // Закрытие модальных окон при клике вне
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('answer-modal');
            if (e.target === modal) this.hideModal();
            
            const leaderboardModal = document.getElementById('leaderboard-modal');
            if (e.target === leaderboardModal) this.hideLeaderboardModal();
        });
    }
    
    addStudent() {
        const nameInput = document.getElementById('student-name');
        const name = nameInput.value.trim();
        
        if (!name) {
            this.showNotification('Введите имя ученика', 'warning');
            return;
        }
        
        if (this.students.length >= 30) {
            this.showNotification('Максимум 30 учеников', 'warning');
            return;
        }
        
        if (this.students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            this.showNotification('Ученик с таким именем уже добавлен', 'warning');
            return;
        }
        
        const colorIndex = this.students.length % this.avatarColors.length;
        const iconIndex = this.students.length % this.avatarIcons.length;
        
        const student = {
            id: Date.now() + Math.random(),
            name: name,
            score: 0,
            answers: 0,
            correctAnswers: 0,
            avatarColor: this.avatarColors[colorIndex],
            avatarIcon: this.avatarIcons[iconIndex],
            avatarText: name.charAt(0).toUpperCase(),
            canAnswer: true,
            timesAnswered: 0,
            active: true
        };
        
        this.students.push(student);
        nameInput.value = '';
        this.updateStudentList();
        this.saveToStorage();
        this.showNotification(`Ученик ${name} добавлен`, 'success');
    }
    
    clearStudents() {
        if (this.students.length === 0) return;
        
        if (confirm('Очистить список всех учеников?')) {
            this.students = [];
            this.updateStudentList();
            this.saveToStorage();
            this.showNotification('Список учеников очищен', 'info');
        }
    }
    
    updateStudentList() {
        const container = document.getElementById('students-container');
        const countElement = document.getElementById('student-count');
        const startButton = document.getElementById('start-rules');
        
        countElement.textContent = this.students.length;
        startButton.disabled = this.students.length < 2;
        
        if (this.students.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>Добавьте учеников чтобы начать</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        this.students.forEach(student => {
            const div = document.createElement('div');
            div.className = 'student-item';
            div.innerHTML = `
                <div class="avatar" style="background-color: ${student.avatarColor}">
                    <i class="${student.avatarIcon}"></i>
                </div>
                <span>${student.name}</span>
                <button class="remove-student" data-id="${student.id}" title="Удалить">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
        });
        
        document.querySelectorAll('.remove-student').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.removeStudent(id);
            });
        });
    }
    
    removeStudent(id) {
        const student = this.students.find(s => s.id == id);
        if (!student) return;
        
        if (confirm(`Удалить ученика ${student.name}?`)) {
            this.students = this.students.filter(s => s.id != id);
            this.updateStudentList();
            this.saveToStorage();
            this.showNotification(`Ученик ${student.name} удален`, 'info');
        }
    }
    
    showNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Удаление через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        
        if (screenId === 'game-screen') {
            this.updateLeaderboard();
            this.startGameTimer();
        } else if (screenId === 'completion-screen') {
            this.showConfetti();
        }
    }
    
    startGame() {
        if (this.students.length < 2) {
            this.showNotification('Добавьте минимум 2 ученика', 'warning');
            return;
        }
        
        this.gameActive = true;
        this.gameStartTime = Date.now();
        this.gameDuration = 0;
        this.showScreen('game-screen');
        this.nextStudent();
    }
    
    nextStudent() {
        this.resetTimer();
        
        const eligibleStudents = this.students.filter(s => s.active && s.score < 5);
        
        if (eligibleStudents.length === 0) {
            this.endGame();
            return;
        }
        
        const studentsNotAnswered = eligibleStudents.filter(s => s.timesAnswered === 0);
        let candidates = studentsNotAnswered.length > 0 ? studentsNotAnswered : eligibleStudents;
        
        if (studentsNotAnswered.length === 0) {
            this.students.forEach(s => s.timesAnswered = 0);
        }
        
        const randomIndex = Math.floor(Math.random() * candidates.length);
        this.currentStudent = candidates[randomIndex];
        this.currentStudent.timesAnswered++;
        
        this.selectedTheme = null;
        this.selectedDifficulty = null;
        this.currentQuestion = null;
        
        this.updateCurrentStudentDisplay();
        this.resetQuestionDisplay();
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.disabled = true;
        });
        
        document.getElementById('next-student').disabled = true;
        document.getElementById('show-answer').disabled = true;
        
        document.getElementById('question-text').textContent = 
            `${this.currentStudent.name}, выберите тему для вопроса`;
            
        document.getElementById('question-hint').textContent = 
            'После выбора темы и сложности появится вопрос и начнется таймер';
            
        this.showNotification(`${this.currentStudent.name}, ваша очередь! Выбирайте тему.`, 'info');
    }
    
    selectTheme(theme) {
        this.selectedTheme = theme;
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
                btn.style.borderColor = this.currentStudent.avatarColor;
            }
        });
        
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.disabled = false;
        });
        
        document.getElementById('question-text').textContent = 
            `Отлично! Теперь выберите сложность вопроса по теме "${this.getThemeName(theme)}"`;
            
        document.getElementById('question-hint').textContent = 
            'Выберите уровень сложности (1-3 балла). Чем сложнее вопрос, тем больше баллов можно получить.';
    }
    
    selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
        
        document.querySelectorAll('.select-difficulty').forEach(btn => {
            btn.disabled = true;
        });
        
        this.currentQuestion = this.getRandomQuestion();
        
        if (!this.currentQuestion) {
            this.showNotification('Вопросы по этой теме и сложности закончились! Выберите другую тему или сложность.', 'warning');
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.disabled = false;
            });
            return;
        }
        
        document.getElementById('question-text').textContent = this.currentQuestion.question;
        document.getElementById('question-theme').textContent = `Тема: ${this.getThemeName(this.selectedTheme)}`;
        document.getElementById('question-difficulty').textContent = `Сложность: ${difficulty} балл${difficulty > 1 ? 'а' : ''}`;
        document.getElementById('question-difficulty').className = `badge badge-${difficulty}`;
        
        document.getElementById('question-hint').textContent = 
            `У вас есть 60 секунд на ответ. Вопрос на ${difficulty} балл${difficulty > 1 ? 'а' : ''}. Постарайтесь ответить как можно полнее.`;
        
        document.getElementById('show-answer').disabled = false;
        this.startTimer();
    }
    
    getRandomQuestion() {
        const availableQuestions = this.questionQueue.filter(q => 
            q.theme === this.selectedTheme && 
            q.difficulty === this.selectedDifficulty &&
            !this.usedQuestions.has(q.id)
        );
        
        if (availableQuestions.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];
        
        this.usedQuestions.add(question.id);
        this.answeredCount++;
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
        
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        circleTimer.textContent = this.timeLeft;
        
        const circumference = 2 * Math.PI * 35;
        const offset = circumference - (this.timeLeft / 60) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        if (this.timeLeft <= 10) {
            progressCircle.style.stroke = '#ef4444';
            circleTimer.style.color = '#ef4444';
        } else if (this.timeLeft <= 30) {
            progressCircle.style.stroke = '#f59e0b';
            circleTimer.style.color = '#f59e0b';
        } else {
            progressCircle.style.stroke = '#10b981';
            circleTimer.style.color = '#10b981';
        }
    }
    
    timeUp() {
        clearInterval(this.gameTimer);
        this.showNotification('Время вышло!', 'warning');
        setTimeout(() => this.showAnswerModal(), 1000);
    }
    
    showAnswerModal() {
        clearInterval(this.gameTimer);
        
        if (!this.currentQuestion || !this.currentStudent) return;
        
        document.getElementById('modal-student-name').textContent = this.currentStudent.name;
        document.getElementById('modal-theme').textContent = this.getThemeName(this.selectedTheme);
        document.getElementById('modal-difficulty').textContent = this.selectedDifficulty;
        document.getElementById('modal-points').textContent = this.selectedDifficulty;
        document.getElementById('modal-question').textContent = this.currentQuestion.question;
        document.getElementById('modal-correct-answer').textContent = this.currentQuestion.answer;
        
        const modalAvatar = document.getElementById('modal-avatar');
        modalAvatar.style.backgroundColor = this.currentStudent.avatarColor;
        modalAvatar.innerHTML = `<i class="${this.currentStudent.avatarIcon}"></i>`;
        
        document.getElementById('answer-modal').classList.add('active');
        document.getElementById('student-answer').focus();
        this.updateCharCount();
    }
    
    updateCharCount() {
        const textarea = document.getElementById('student-answer');
        const charCount = document.getElementById('char-count');
        charCount.textContent = textarea.value.length;
    }
    
    hideModal() {
        document.getElementById('answer-modal').classList.remove('active');
        document.getElementById('student-answer').value = '';
    }
    
    evaluateAnswer(accepted) {
        if (accepted) {
            this.currentStudent.score += this.selectedDifficulty;
            this.currentStudent.correctAnswers++;
            this.showNotification(
                `Ответ принят! ${this.currentStudent.name} получает ${this.selectedDifficulty} балл${this.selectedDifficulty > 1 ? 'а' : ''}!`, 
                'success'
            );
        } else {
            this.showNotification(`Ответ отклонен. ${this.currentStudent.name} не получает баллов.`, 'warning');
        }
        
        this.currentStudent.answers++;
        
        if (this.currentStudent.score >= 5) {
            this.currentStudent.active = false;
            this.showNotification(`${this.currentStudent.name} набрал 5+ баллов и завершает игру!`, 'info');
        }
        
        this.updateLeaderboard();
        this.updateCurrentStudentDisplay();
        this.updateActiveStudentsCount();
        
        if (this.answeredCount >= this.totalQuestions || this.students.filter(s => s.active && s.score < 5).length === 0) {
            this.endGame();
        } else {
            this.hideModal();
            setTimeout(() => this.nextStudent(), 1500);
        }
        
        this.saveToStorage();
    }
    
    updateCurrentStudentDisplay() {
        if (!this.currentStudent) return;
        
        document.getElementById('current-student-name').textContent = this.currentStudent.name;
        document.getElementById('current-score').textContent = this.currentStudent.score;
        document.getElementById('current-answers').textContent = this.currentStudent.answers;
        
        const percentage = this.currentStudent.answers > 0 ? 
            Math.round((this.currentStudent.correctAnswers / this.currentStudent.answers) * 100) : 0;
        document.getElementById('current-correct').textContent = `${percentage}%`;
        
        const avatar = document.getElementById('current-avatar');
        avatar.style.background = `linear-gradient(135deg, ${this.currentStudent.avatarColor}, ${this.darkenColor(this.currentStudent.avatarColor, 20)})`;
        avatar.innerHTML = `<i class="${this.currentStudent.avatarIcon}"></i>`;
        
        const status = document.querySelector('.student-status');
        if (this.currentStudent.score >= 5) {
            status.textContent = 'Завершил игру';
            status.style.color = '#10b981';
        } else {
            status.textContent = 'Активен';
            status.style.color = '#3b82f6';
        }
    }
    
    updateLeaderboard() {
        const sortedStudents = [...this.students].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (a.correctAnswers !== b.correctAnswers) return b.correctAnswers - a.correctAnswers;
            return a.answers - b.answers;
        });
        
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';
        
        if (sortedStudents.length === 0) {
            leaderboardList.innerHTML = `
                <div class="empty-leaderboard">
                    <i class="fas fa-trophy"></i>
                    <p>Игра начнется после первого вопроса</p>
                </div>
            `;
            return;
        }
        
        sortedStudents.slice(0, 5).forEach((student, index) => {
            const percentage = student.answers > 0 ? 
                Math.round((student.correctAnswers / student.answers) * 100) : 0;
                
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="leaderboard-avatar" style="background-color: ${student.avatarColor}">
                        <i class="${student.avatarIcon}"></i>
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 1rem;">${index + 1}. ${student.name}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">
                            ${student.answers} ответов • ${percentage}% успешность
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.3rem; font-weight: 800; color: ${this.getScoreColor(student.score)};">
                        ${student.score}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        баллов
                    </div>
                </div>
            `;
            leaderboardList.appendChild(div);
        });
        
        this.updateFullLeaderboard(sortedStudents);
    }
    
    updateFullLeaderboard(sortedStudents) {
        const fullLeaderboard = document.getElementById('full-leaderboard');
        fullLeaderboard.innerHTML = '';
        
        sortedStudents.forEach((student, index) => {
            const percentage = student.answers > 0 ? 
                Math.round((student.correctAnswers / student.answers) * 100) : 0;
            const avgScore = student.answers > 0 ? 
                (student.score / student.answers).toFixed(1) : '0.0';
            
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
                    <div style="font-weight: 800; font-size: 1.2rem; width: 40px; text-align: center; color: ${this.getRankColor(index + 1)};">
                        ${index + 1}
                    </div>
                    <div class="leaderboard-avatar" style="background-color: ${student.avatarColor}; width: 50px; height: 50px; font-size: 1.2rem;">
                        <i class="${student.avatarIcon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 800; font-size: 1.1rem;">${student.name}</div>
                        <div style="font-size: 0.9rem; color: var(--text-muted);">
                            ${student.active ? 'Активен' : 'Завершил'} • ${student.answers} ответов
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.8rem; font-weight: 800; color: ${this.getScoreColor(student.score)};">
                        ${student.score}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">
                        ${percentage}% успешность • ${avgScore} средний
                    </div>
                </div>
            `;
            fullLeaderboard.appendChild(div);
        });
        
        this.updateStatsContent(sortedStudents);
    }
    
    updateStatsContent(sortedStudents) {
        const statsContent = document.getElementById('stats-content');
        if (!statsContent) return;
        
        const totalStudents = this.students.length;
        const activeStudents = this.students.filter(s => s.active && s.score < 5).length;
        const completedStudents = totalStudents - activeStudents;
        
        const totalAnswers = this.students.reduce((sum, s) => sum + s.answers, 0);
        const totalCorrect = this.students.reduce((sum, s) => sum + s.correctAnswers, 0);
        const totalScore = this.students.reduce((sum, s) => sum + s.score, 0);
        
        const avgSuccess = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;
        const avgScore = totalStudents > 0 ? (totalScore / totalStudents).toFixed(1) : '0.0';
        
        statsContent.innerHTML = `
            <div class="stat-card">
                <h4>Активные ученики</h4>
                <div class="number">${activeStudents}</div>
                <p>из ${totalStudents}</p>
            </div>
            <div class="stat-card">
                <h4>Всего ответов</h4>
                <div class="number">${totalAnswers}</div>
                <p>${this.answeredCount} вопросов из ${this.totalQuestions}</p>
            </div>
            <div class="stat-card">
                <h4>Средняя успешность</h4>
                <div class="number">${avgSuccess}%</div>
                <p>${totalCorrect} правильных из ${totalAnswers}</p>
            </div>
            <div class="stat-card">
                <h4>Средний балл</h4>
                <div class="number">${avgScore}</div>
                <p>Всего баллов: ${totalScore}</p>
            </div>
        `;
    }
    
    showLeaderboardModal() {
        if (this.gameTimer) {
            this.showNotification('Лидерборд недоступен во время ответа ученика!', 'warning');
            return;
        }
        
        document.getElementById('leaderboard-modal').classList.add('active');
    }
    
    hideLeaderboardModal() {
        document.getElementById('leaderboard-modal').classList.remove('active');
    }
    
    switchTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabId}`);
        });
    }
    
    pauseGame() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.showNotification('Игра на паузе. Нажмите OK чтобы продолжить.', 'info');
            setTimeout(() => {
                this.startTimer();
                this.showNotification('Игра продолжается!', 'info');
            }, 1000);
        } else {
            this.showNotification('Игра уже на паузе или не активна.', 'info');
        }
    }
    
    updateProgress() {
        const progress = (this.answeredCount / this.totalQuestions) * 100;
        document.getElementById('game-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${this.answeredCount}/${this.totalQuestions} вопросов`;
        document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
    }
    
    startGameTimer() {
        if (this.gameInterval) clearInterval(this.gameInterval);
        
        this.gameInterval = setInterval(() => {
            if (this.gameStartTime) {
                this.gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
                const minutes = Math.floor(this.gameDuration / 60);
                const seconds = this.gameDuration % 60;
                document.getElementById('game-time').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    updateActiveStudentsCount() {
        const activeCount = this.students.filter(s => s.active && s.score < 5).length;
        document.getElementById('active-students-count').textContent = `${activeCount} активных`;
    }
    
    resetQuestionDisplay() {
        document.getElementById('question-text').textContent = 'Выберите тему и сложность для получения вопроса';
        document.getElementById('question-theme').textContent = 'Тема: -';
        document.getElementById('question-difficulty').textContent = 'Сложность: -';
        document.getElementById('question-difficulty').className = 'badge';
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.style.borderColor = '';
        });
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        clearInterval(this.gameInterval);
        
        const sortedStudents = [...this.students].sort((a, b) => b.score - a.score);
        const winner = sortedStudents[0];
        
        const totalTime = this.gameDuration;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        
        document.getElementById('winner-name').textContent = winner.name;
        document.getElementById('winner-points').textContent = winner.score;
        document.getElementById('winner-answers').textContent = winner.answers;
        
        const winnerPercentage = winner.answers > 0 ? 
            Math.round((winner.correctAnswers / winner.answers) * 100) : 0;
        document.getElementById('winner-percentage').textContent = `${winnerPercentage}%`;
        
        const winnerAvg = winner.answers > 0 ? (winner.score / winner.answers).toFixed(1) : '0.0';
        document.getElementById('winner-avg').textContent = winnerAvg;
        
        document.getElementById('total-questions').textContent = this.answeredCount;
        document.getElementById('total-time').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const completedStudents = this.students.filter(s => s.score >= 5).length;
        document.getElementById('completed-students').textContent = completedStudents;
        
        const totalAnswers = this.students.reduce((sum, s) => sum + s.answers, 0);
        const totalCorrect = this.students.reduce((sum, s) => sum + s.correctAnswers, 0);
        const avgSuccess = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;
        document.getElementById('avg-success').textContent = `${avgSuccess}%`;
        
        const winnerAvatar = document.getElementById('winner-avatar');
        winnerAvatar.style.background = `linear-gradient(135deg, ${winner.avatarColor}, ${this.darkenColor(winner.avatarColor, 20)})`;
        winnerAvatar.innerHTML = `<i class="${winner.avatarIcon}"></i>`;
        
        const resultsTable = document.getElementById('final-results-table');
        resultsTable.innerHTML = '';
        
        sortedStudents.forEach((student, index) => {
            const percentage = student.answers > 0 ? 
                Math.round((student.correctAnswers / student.answers) * 100) : 0;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="font-weight: 800; color: ${this.getRankColor(index + 1)};">${index + 1}</div>
                        ${index < 3 ? '<i class="fas fa-trophy" style="color: gold;"></i>' : ''}
                    </div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="leaderboard-avatar" style="background-color: ${student.avatarColor}">
                            <i class="${student.avatarIcon}"></i>
                        </div>
                        <span style="font-weight: 700;">${student.name}</span>
                    </div>
                </td>
                <td><strong style="color: ${this.getScoreColor(student.score)}; font-size: 1.1rem;">${student.score}</strong></td>
                <td>${student.answers}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1; height: 8px; background: var(--bg-surface); border-radius: 4px;">
                            <div style="width: ${percentage}%; height: 100%; background: ${percentage >= 70 ? '#22c55e' : percentage >= 40 ? '#f59e0b' : '#ef4444'}; border-radius: 4px;"></div>
                        </div>
                        <span style="font-weight: 700; min-width: 40px;">${percentage}%</span>
                    </div>
                </td>
                <td>
                    <span class="badge ${student.active && student.score < 5 ? 'badge-1' : 'badge-2'}" style="font-size: 0.8rem;">
                        ${student.active && student.score < 5 ? 'Активен' : 'Завершил'}
                    </span>
                </td>
            `;
            resultsTable.appendChild(row);
        });
        
        this.showScreen('completion-screen');
        localStorage.removeItem('djangoGameState');
    }
    
    restartGame() {
        if (confirm('Начать новую игру? Текущий прогресс будет потерян.')) {
            this.currentStudent = null;
            this.selectedTheme = null;
            this.selectedDifficulty = null;
            this.currentQuestion = null;
            this.gameActive = false;
            clearInterval(this.gameTimer);
            clearInterval(this.gameInterval);
            this.timeLeft = 60;
            this.answeredCount = 0;
            this.usedQuestions.clear();
            this.gameStartTime = null;
            this.gameDuration = 0;
            this.questionQueue = [];
            this.setupQuestionQueue();
            
            this.students.forEach(student => {
                student.score = 0;
                student.answers = 0;
                student.correctAnswers = 0;
                student.active = true;
                student.timesAnswered = 0;
            });
            
            this.showScreen('main-screen');
            this.updateStudentList();
            this.updateProgress();
            this.saveToStorage();
        }
    }
    
    getThemeName(theme) {
        const themes = {
            'basics': 'Основы Django',
            'models': 'Модели',
            'views': 'Представления',
            'templates': 'Шаблоны'
        };
        return themes[theme] || theme;
    }
    
    getScoreColor(score) {
        if (score >= 10) return '#10b981';
        if (score >= 5) return '#3b82f6';
        if (score >= 3) return '#f59e0b';
        return '#ef4444';
    }
    
    getRankColor(rank) {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return '#cd7f32';
        return 'var(--text-primary)';
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
    
    setupConfetti() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = this.avatarColors[Math.floor(Math.random() * this.avatarColors.length)];
            confetti.style.opacity = Math.random() * 0.5 + 0.5;
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            container.appendChild(confetti);
        }
    }
    
    showConfetti() {
        const confetti = document.querySelectorAll('.confetti');
        confetti.forEach(c => {
            c.style.animation = 'none';
            setTimeout(() => {
                c.style.animation = '';
            }, 10);
        });
    }
    
    saveToStorage() {
        const gameState = {
            students: this.students,
            answeredCount: this.answeredCount,
            usedQuestions: Array.from(this.usedQuestions),
            gameStartTime: this.gameStartTime,
            gameDuration: this.gameDuration
        };
        localStorage.setItem('djangoGameState', JSON.stringify(gameState));
    }
    
    loadFromStorage() {
        const saved = localStorage.getItem('djangoGameState');
        if (saved) {
            try {
                const gameState = JSON.parse(saved);
                
                if (gameState.students && gameState.students.length > 0) {
                    if (confirm('Найдена сохраненная игра. Загрузить?')) {
                        this.students = gameState.students;
                        this.answeredCount = gameState.answeredCount || 0;
                        this.usedQuestions = new Set(gameState.usedQuestions || []);
                        this.gameStartTime = gameState.gameStartTime;
                        this.gameDuration = gameState.gameDuration || 0;
                        
                        if (this.gameStartTime && this.answeredCount > 0 && this.answeredCount < this.totalQuestions) {
                            this.showScreen('game-screen');
                            this.updateProgress();
                            this.updateLeaderboard();
                            this.startGameTimer();
                            this.updateActiveStudentsCount();
                            this.nextStudent();
                        }
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
    
    // Добавляем стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 16px 20px;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: var(--success-color);
        }
        
        .notification-warning {
            border-left-color: var(--warning-color);
        }
        
        .notification-info {
            border-left-color: var(--primary-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i {
            color: var(--success-color);
        }
        
        .notification-warning .notification-content i {
            color: var(--warning-color);
        }
        
        .notification-info .notification-content i {
            color: var(--primary-color);
        }
        
        .notification-content span {
            font-weight: 600;
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(style);
});