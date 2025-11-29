// UI Manager for menu screens and HUD
export class UIManager {
  constructor() {
    this.screens = {
      mainMenu: document.getElementById('mainMenu'),
      howToPlay: document.getElementById('howToPlayMenu'),
      pause: document.getElementById('pauseMenu'),
      gameOver: document.getElementById('gameOverMenu')
    };
    
    this.hud = document.getElementById('hud');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Main Menu
    document.getElementById('startBtn').addEventListener('click', () => {
      this.emit('startGame');
    });

    document.getElementById('howToPlayBtn').addEventListener('click', () => {
      this.showScreen('howToPlay');
    });

    document.getElementById('backToMenuBtn').addEventListener('click', () => {
      this.showScreen('mainMenu');
    });

    // Pause Menu
    document.getElementById('continueBtn').addEventListener('click', () => {
      this.emit('resume');
    });

    document.getElementById('restartBtn').addEventListener('click', () => {
      this.emit('restart');
    });

    document.getElementById('quitBtn').addEventListener('click', () => {
      this.emit('quit');
    });

    // Game Over
    document.getElementById('playAgainBtn').addEventListener('click', () => {
      this.emit('playAgain');
    });

    document.getElementById('mainMenuBtn').addEventListener('click', () => {
      this.emit('mainMenu');
    });

    // Mobile pause button
    document.getElementById('mobilePauseBtn').addEventListener('click', () => {
      this.emit('pause');
    });

    // Keyboard pause
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Escape') {
        this.emit('pause');
        e.preventDefault();
      }
    });
  }

  showScreen(screenName) {
    // Hide all screens
    Object.values(this.screens).forEach(screen => {
      screen.classList.remove('active');
    });

    // Show requested screen
    if (this.screens[screenName]) {
      this.screens[screenName].classList.add('active');
    }
  }

  hideAllScreens() {
    Object.values(this.screens).forEach(screen => {
      screen.classList.remove('active');
    });
  }

  showHUD() {
    this.hud.classList.remove('hidden');
  }

  hideHUD() {
    this.hud.classList.add('hidden');
  }

  updateScore(score) {
    document.getElementById('currentScore').textContent = score;
    document.getElementById('pauseScore').textContent = score;
    document.getElementById('finalScore').textContent = score;
  }

  updateHighScore(highScore) {
    document.getElementById('menuHighScore').textContent = highScore;
    document.getElementById('hudHighScore').textContent = highScore;
    document.getElementById('pauseHighScore').textContent = highScore;
    document.getElementById('gameOverHighScore').textContent = highScore;
  }

  showNewRecord(isNewRecord) {
    const newRecordText = document.getElementById('newRecordText');
    if (isNewRecord) {
      newRecordText.classList.remove('hidden');
    } else {
      newRecordText.classList.add('hidden');
    }
  }

  // Simple event system
  listeners = {};

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}
