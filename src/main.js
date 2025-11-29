// Main entry point - Initialize and coordinate all game systems
import { Snake } from './snake.js';
import { Food } from './food.js';
import { ParticleSystem } from './particles.js';
import { Controls } from './controls.js';
import { UIManager } from './ui.js';
import { Game } from './game.js';

// Game state enum
const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver'
};

class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.state = GameState.MENU;
    
    // Initialize systems
    this.ui = new UIManager();
    this.game = new Game(this.canvas, this.ui);
    
    const gridSize = this.game.gridSize;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    
    this.snake = new Snake(gridSize, canvasWidth, canvasHeight);
    this.food = new Food(gridSize, canvasWidth, canvasHeight);
    this.particles = new ParticleSystem();
    this.controls = new Controls();
    
    // Connect game with entities
    this.game.init(this.snake, this.food, this.particles, this.controls);
    
    // Setup UI event handlers
    this.setupUIHandlers();
    
    // Start render loop
    this.lastFrameTime = performance.now();
    this.gameLoop();
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  setupUIHandlers() {
    this.ui.on('startGame', () => this.startGame());
    this.ui.on('pause', () => this.togglePause());
    this.ui.on('resume', () => this.resumeGame());
    this.ui.on('restart', () => this.restartGame());
    this.ui.on('quit', () => this.quitToMenu());
    this.ui.on('playAgain', () => this.startGame());
    this.ui.on('mainMenu', () => this.quitToMenu());
  }

  startGame() {
    this.state = GameState.PLAYING;
    this.game.start();
    this.ui.hideAllScreens();
    this.ui.showHUD();
  }

  togglePause() {
    if (this.state === GameState.PLAYING) {
      this.state = GameState.PAUSED;
      this.game.pause();
      this.ui.showScreen('pause');
    } else if (this.state === GameState.PAUSED) {
      this.resumeGame();
    }
  }

  resumeGame() {
    if (this.state === GameState.PAUSED) {
      this.state = GameState.PLAYING;
      this.game.resume();
      this.ui.hideAllScreens();
    }
  }

  restartGame() {
    this.state = GameState.PLAYING;
    this.game.start();
    this.ui.hideAllScreens();
    this.ui.showHUD();
  }

  quitToMenu() {
    this.state = GameState.MENU;
    this.game.stop();
    this.ui.hideHUD();
    this.ui.showScreen('mainMenu');
  }

  handleResize() {
    // Recalculate canvas size
    this.game.setupCanvas();
    
    // Recreate entities with new dimensions
    const gridSize = this.game.gridSize;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    
    this.snake = new Snake(gridSize, canvasWidth, canvasHeight);
    this.food = new Food(gridSize, canvasWidth, canvasHeight);
    
    // Reinitialize game
    this.game.init(this.snake, this.food, this.particles, this.controls);
    
    // Reset if playing
    if (this.state === GameState.PLAYING || this.state === GameState.PAUSED) {
      this.quitToMenu();
    }
  }

  gameLoop(currentTime = performance.now()) {
    // Calculate delta time for smooth 60fps
    const deltaTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    // Update game logic
    this.game.update(currentTime);
    
    // Render
    this.game.draw();
    
    // Continue loop
    requestAnimationFrame((time) => this.gameLoop(time));
  }
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
  });
} else {
  new SnakeGame();
}
