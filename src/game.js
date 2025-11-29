// Game class - Core game loop and state management
export class Game {
  constructor(canvas, ui) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ui = ui;
    
    // Game settings
    this.gridSize = 20;
    this.baseSpeed = 150; // milliseconds per move
    this.speedIncrement = 5; // Speed increase per 50 points
    this.speedIncrementInterval = 50;
    
    // Game state
    this.score = 0;
    this.highScore = this.loadHighScore();
    this.gameSpeed = this.baseSpeed;
    this.lastMoveTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    
    this.setupCanvas();
  }

  setupCanvas() {
    // Make canvas square and responsive
    const size = Math.min(this.canvas.parentElement.clientWidth, 
                          this.canvas.parentElement.clientHeight);
    this.canvas.width = size;
    this.canvas.height = size;
    
    // Ensure grid fits perfectly
    const gridCount = Math.floor(size / this.gridSize);
    this.canvas.width = gridCount * this.gridSize;
    this.canvas.height = gridCount * this.gridSize;
  }

  init(snake, food, particles, controls) {
    this.snake = snake;
    this.food = food;
    this.particles = particles;
    this.controls = controls;
  }

  start() {
    this.reset();
    this.isRunning = true;
    this.isPaused = false;
    // Add a grace period to prevent immediate collision detection
    this.lastMoveTime = performance.now() + 500; // 500ms delay before first move
  }

  reset() {
    this.score = 0;
    this.gameSpeed = this.baseSpeed;
    this.snake.reset();
    this.food.spawn(this.snake.getSegments());
    this.controls.clearQueue();
    this.ui.updateScore(0);
    this.ui.updateHighScore(this.highScore);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.lastMoveTime = performance.now();
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
  }

  update(currentTime) {
    if (!this.isRunning || this.isPaused) {
      return;
    }

    // Update particles always
    this.particles.update();

    // Check if enough time has passed for snake movement
    if (currentTime - this.lastMoveTime < this.gameSpeed) {
      return;
    }

    this.lastMoveTime = currentTime;

    // Get next direction from controls
    const nextDirection = this.controls.getNextDirection();
    if (nextDirection) {
      this.snake.setDirection(nextDirection);
    }

    // Update snake position
    this.snake.update();

    // Check collisions
    if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
      this.gameOver();
      return;
    }

    // Check food collision
    if (this.food.checkCollision(this.snake.getHead())) {
      this.eatFood();
    }
  }

  eatFood() {
    // Grow snake
    this.snake.grow();
    
    // Update score
    this.score += 10;
    this.ui.updateScore(this.score);
    
    // Create particle explosion
    const foodPos = this.food.getPosition();
    this.particles.createExplosion(
      foodPos.x + this.gridSize / 2,
      foodPos.y + this.gridSize / 2,
      '#39FF14'
    );
    
    // Increase speed every 50 points
    if (this.score % this.speedIncrementInterval === 0) {
      this.gameSpeed = Math.max(50, this.gameSpeed - this.speedIncrement);
    }
    
    // Spawn new food
    this.food.spawn(this.snake.getSegments());
  }

  gameOver() {
    this.stop();
    
    // Check for new high score
    const isNewRecord = this.score > this.highScore;
    if (isNewRecord) {
      this.highScore = this.score;
      this.saveHighScore(this.highScore);
      this.ui.updateHighScore(this.highScore);
    }
    
    this.ui.showNewRecord(isNewRecord);
    this.ui.hideHUD();
    this.ui.showScreen('gameOver');
  }

  draw() {
    // Clear canvas with Game Boy background
    this.ctx.fillStyle = '#9BBC0F';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid (subtle)
    this.ctx.strokeStyle = 'rgba(48, 98, 48, 0.1)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
    
    // Draw game entities
    this.food.draw(this.ctx);
    this.snake.draw(this.ctx);
    this.particles.draw(this.ctx);
  }

  loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  }

  saveHighScore(score) {
    localStorage.setItem('snakeHighScore', score.toString());
  }

  getScore() {
    return this.score;
  }

  getHighScore() {
    return this.highScore;
  }
}
