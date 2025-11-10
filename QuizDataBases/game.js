class DatabaseDesignGame {
    constructor() {
        this.students = [];
        this.currentLevel = 1;
        this.mistakes = 0;
        this.selectedStudent = null;
        this.gameActive = false;
        this.incorrectAnswersCount = 0;
        this.correctAnswersInLevel = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSetupModal();
    }

    bindEvents() {
        // Setup modal
        document.getElementById('addStudentBtn').addEventListener('click', () => this.addStudent());
        document.getElementById('studentNameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addStudent();
        });
        document.getElementById('startGameBtn').addEventListener('click', () => this.startGame());
        
        // Game controls
        document.getElementById('leaderboardBtn').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('closeLeaderboardBtn').addEventListener('click', () => this.hideLeaderboard());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextLevel());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('restartGameBtn').addEventListener('click', () => this.restartGame());
        
        // Student selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.student-btn')) {
                const studentId = e.target.closest('.student-btn').dataset.studentId;
                this.selectStudent(studentId);
            }
        });
    }

    addStudent() {
        const input = document.getElementById('studentNameInput');
        const name = input.value.trim();
        
        if (!name) return;
        if (this.students.length >= 20) {
            alert('Максимум 20 участников!');
            return;
        }
        
        const student = {
            id: Date.now().toString(),
            name: name,
            score: 0,
            icon: QUIZ_CONFIG.studentIcons[this.students.length % QUIZ_CONFIG.studentIcons.length],
            color: QUIZ_CONFIG.studentColors[this.students.length % QUIZ_CONFIG.studentColors.length]
        };
        
        this.students.push(student);
        this.updateStudentsList();
        input.value = '';
        input.focus();
        
        // Enable start button if we have at least 2 students
        if (this.students.length >= 2) {
            document.getElementById('startGameBtn').disabled = false;
        }
    }

    removeStudent(studentId) {
        this.students = this.students.filter(s => s.id !== studentId);
        this.updateStudentsList();
        
        if (this.students.length < 2) {
            document.getElementById('startGameBtn').disabled = true;
        }
    }

    updateStudentsList() {
        const list = document.getElementById('studentsList');
        list.innerHTML = this.students.map(student => `
            <div class="student-tag" style="background: ${student.color}">
                ${student.icon} ${student.name}
                <button class="remove-student" onclick="game.removeStudent('${student.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    startGame() {
        this.gameActive = true;
        this.currentLevel = 1;
        this.mistakes = 0;
        this.incorrectAnswersCount = 0;
        
        // Initialize students scores
        this.students.forEach(student => student.score = 0);
        
        this.hideSetupModal();
        this.renderStudentsPanel();
        this.loadLevel(this.currentLevel);
        this.updateProgress();
    }

    renderStudentsPanel() {
        const panel = document.getElementById('studentsPanel');
        panel.innerHTML = this.students.map(student => `
            <button class="student-btn" data-student-id="${student.id}" 
                    style="background: ${student.color}">
                ${student.icon}
                <span class="student-name">${student.name}</span>
                <span class="student-score">${student.score}</span>
            </button>
        `).join('');
    }

    selectStudent(studentId) {
        if (!this.gameActive) return;
        
        // Reset previous selection
        document.querySelectorAll('.student-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.selectedStudent = this.students.find(s => s.id === studentId);
        const studentBtn = document.querySelector(`[data-student-id="${studentId}"]`);
        studentBtn.classList.add('active');
        
        // Enable answer buttons
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = false;
        });
    }

    loadLevel(level) {
        const question = QUIZ_QUESTIONS.find(q => q.level === level);
        if (!question) {
            this.endGame(true);
            return;
        }
    
        // Reset level state
        this.correctAnswersInLevel = 0;
        this.incorrectAnswersCount = 0;
    
        // Check if this is a progress check level
        if (question.question === "PROGRESS_CHECK") {
            this.showProgressCheck(question);
            return;
        }
    
        // Update question area
        document.getElementById('questionIcon').textContent = question.icon;
        document.getElementById('questionTitle').textContent = question.title;
        document.getElementById('questionSubtitle').textContent = question.subtitle;
        document.getElementById('questionContent').innerHTML = question.theory;
    
        // Показываем область ответов для обычных уровней
        document.getElementById('answersArea').style.display = 'block';
        
        // Обновляем ответы
        const answersGrid = document.getElementById('answersGrid');
        answersGrid.innerHTML = question.answers.map((answer, index) => `
            <button class="answer-btn" data-answer-index="${index}">
                ${answer.text}
            </button>
        `).join('');
    
        // Bind answer events
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.selectedStudent) {
                    this.showFeedback('Сначала выберите студента! 👆', 'warning');
                    return;
                }
                this.checkAnswer(parseInt(e.target.dataset.answerIndex));
            });
        });
    
        // Reset selection and disable answers until student is selected
        this.selectedStudent = null;
        document.querySelectorAll('.student-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });
    
        // Disable next button initially
        document.getElementById('nextBtn').disabled = true;
    
        // Update progress
        this.updateProgress();
    }

    checkAnswer(answerIndex) {
        const question = QUIZ_QUESTIONS.find(q => q.level === this.currentLevel);
        const answer = question.answers[answerIndex];
        const answerBtn = document.querySelector(`[data-answer-index="${answerIndex}"]`);
        const studentBtn = document.querySelector(`[data-student-id="${this.selectedStudent.id}"]`);

        // Disable all answer buttons to prevent multiple answers
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        if (answer.correct) {
            // Correct answer
            answerBtn.classList.add('correct');
            studentBtn.classList.add('correct');
            
            // Add score to student
            this.selectedStudent.score += 1;
            this.correctAnswersInLevel++;
            
            // Update student score display
            studentBtn.querySelector('.student-score').textContent = this.selectedStudent.score;
            
            // Show success message with explanation
            this.showFeedback(`Правильно! 🎉 ${answer.explanation}`, 'success');
            
            // Enable next level button
            document.getElementById('nextBtn').disabled = false;
            
        } else {
            // Incorrect answer
            answerBtn.classList.add('incorrect');
            studentBtn.classList.add('incorrect');
            
            this.incorrectAnswersCount++;
            this.mistakes++;
            
            // Show error message with explanation
            this.showFeedback(`Неправильно! ❌ ${answer.explanation}`, 'error');
            
            // Check if we reached max mistakes for this level
            if (this.incorrectAnswersCount >= 3) {
                this.showFeedback('Три неправильных ответа! Переходим к следующему уровню.', 'warning');
                setTimeout(() => {
                    this.nextLevel();
                }, 2000);
            } else {
                // Reset student selection for next attempt
                setTimeout(() => {
                    this.selectedStudent = null;
                    studentBtn.classList.remove('incorrect', 'active');
                    document.querySelectorAll('.answer-btn').forEach(btn => {
                        btn.classList.remove('incorrect');
                        btn.disabled = false;
                    });
                }, 1500);
            }
        }

        // Check game over condition
        if (this.mistakes >= QUIZ_CONFIG.maxMistakes) {
            setTimeout(() => {
                this.endGame(false);
            }, 1000);
        }

        this.updateProgress();
    }

    nextLevel() {
        // Убираем класс progress-check
        document.getElementById('questionArea').classList.remove('progress-check');
        
        if (this.currentLevel < QUIZ_CONFIG.totalLevels) {
            this.currentLevel++;
            this.loadLevel(this.currentLevel);
        } else {
            this.endGame(true);
        }
    }

    showProgressCheck(question) {
        document.getElementById('questionIcon').textContent = question.icon;
        document.getElementById('questionTitle').textContent = question.title;
        document.getElementById('questionSubtitle').textContent = question.subtitle;
        document.getElementById('questionContent').innerHTML = question.theory;
        
        // Скрываем область ответов для progress check
        document.getElementById('answersArea').style.display = 'none';
        
        // Добавляем класс для progress check
        document.getElementById('questionArea').classList.add('progress-check');
        
        // Enable next button
        document.getElementById('nextBtn').disabled = false;
        
        // Show celebration for progress
        this.showFeedback('Отличный прогресс! 🚀 Переходим на следующий уровень сложности!', 'success');
    }

    showFeedback(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        const feedback = document.createElement('div');
        feedback.className = `feedback-message feedback-${type}`;
        feedback.innerHTML = `
            <div class="feedback-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'exclamation'}"></i>
                ${message}
            </div>
        `;

        document.querySelector('.game-area').appendChild(feedback);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const levelCounter = document.getElementById('levelCounter');
        const mistakesCounter = document.getElementById('mistakesCounter');
        
        const progress = (this.currentLevel / QUIZ_CONFIG.totalLevels) * 100;
        progressFill.style.width = `${progress}%`;
        levelCounter.textContent = `Уровень ${this.currentLevel}/${QUIZ_CONFIG.totalLevels}`;
        mistakesCounter.textContent = `Ошибки: ${this.mistakes}/${QUIZ_CONFIG.maxMistakes}`;
        
        // Update progress bar color based on mistakes
        if (this.mistakes > QUIZ_CONFIG.maxMistakes * 0.7) {
            progressFill.style.background = '#ef4444';
        } else if (this.mistakes > QUIZ_CONFIG.maxMistakes * 0.4) {
            progressFill.style.background = '#f59e0b';
        } else {
            progressFill.style.background = '#10b981';
        }
    }

    showLeaderboard() {
        this.updateLeaderboard();
        document.getElementById('leaderboardModal').style.display = 'flex';
    }

    hideLeaderboard() {
        document.getElementById('leaderboardModal').style.display = 'none';
    }

    updateLeaderboard() {
        // Sort students by score
        const sortedStudents = [...this.students].sort((a, b) => b.score - a.score);
        
        const leaderboardContent = document.getElementById('leaderboardContent');
        leaderboardContent.innerHTML = sortedStudents.map((student, index) => {
            const rank = index + 1;
            const { grade, status, statusIcon } = this.calculateGradeAndStatus(student.score);
            
            return `
                <div class="leaderboard-item ${index < 3 ? `rank-${rank}` : ''}">
                    <div class="rank">${rank}</div>
                    <div class="student-info">
                        <span class="student-icon">${student.icon}</span>
                        <span class="student-name">${student.name}</span>
                    </div>
                    <div class="score">${student.score} баллов</div>
                    <div class="grade ${grade.toLowerCase()}">
                        <span class="status-icon">${statusIcon}</span>
                        ${grade} (${status})
                    </div>
                </div>
            `;
        }).join('');
    }

    calculateGradeAndStatus(score) {
        if (score >= 5) {
            return { grade: 'Отлично', status: 'Легенда', statusIcon: '👑' };
        } else if (score >= 3) {
            return { grade: 'Хорошо', status: 'Ветеран', statusIcon: '⭐' };
        } else {
            return { grade: 'Удовлетворительно', status: 'Поддержка', statusIcon: '💪' };
        }
    }

    showHint() {
        const question = QUIZ_QUESTIONS.find(q => q.level === this.currentLevel);
        if (question) {
            this.showFeedback('💡 Подсказка: Внимательно изучите теоретический материал выше!', 'info');
        }
    }

    endGame(success) {
        this.gameActive = false;
        
        const resultsModal = document.getElementById('resultsModal');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsContent = document.getElementById('resultsContent');
        
        if (success) {
            resultsTitle.innerHTML = '🎉 Поздравляем!';
            resultsContent.innerHTML = `
                <div class="success-message">
                    <h3>База данных успешно спроектирована!</h3>
                    <p>Все студенты прошли все 30 уровней и создали полноценную базу данных IT-колледжа.</p>
                    <div class="final-stats">
                        <div class="stat">
                            <strong>${this.currentLevel}</strong>
                            <span>уровней пройдено</span>
                        </div>
                        <div class="stat">
                            <strong>${this.mistakes}</strong>
                            <span>ошибок совершено</span>
                        </div>
                        <div class="stat">
                            <strong>${this.students.length}</strong>
                            <span>участников</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultsTitle.innerHTML = '💥 Игра окончена';
            resultsContent.innerHTML = `
                <div class="error-message">
                    <h3>Превышено максимальное количество ошибок</h3>
                    <p>К сожалению, команда совершила ${this.mistakes} ошибок из допустимых ${QUIZ_CONFIG.maxMistakes}.</p>
                    <p>Попробуйте еще раз и создайте идеальную базу данных!</p>
                    <div class="final-stats">
                        <div class="stat">
                            <strong>${this.currentLevel}</strong>
                            <span>уровней пройдено</span>
                        </div>
                        <div class="stat">
                            <strong>${this.mistakes}</strong>
                            <span>ошибок совершено</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Add leaderboard to results
        this.updateLeaderboard();
        resultsContent.innerHTML += `
            <div class="final-leaderboard">
                <h4>Финальные результаты:</h4>
                ${document.getElementById('leaderboardContent').innerHTML}
            </div>
        `;
        
        resultsModal.style.display = 'flex';
    }

    restartGame() {
        // Hide all modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Reset game state
        this.currentLevel = 1;
        this.mistakes = 0;
        this.selectedStudent = null;
        this.gameActive = false;
        this.incorrectAnswersCount = 0;
        this.correctAnswersInLevel = 0;
        
        // Show setup modal
        this.showSetupModal();
    }

    showSetupModal() {
        document.getElementById('setupModal').style.display = 'flex';
    }

    hideSetupModal() {
        document.getElementById('setupModal').style.display = 'none';
    }
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new DatabaseDesignGame();
});