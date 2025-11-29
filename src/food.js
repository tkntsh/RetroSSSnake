// Food class with random spawning and collision detection
export class Food {
  constructor(gridSize, canvasWidth, canvasHeight) {
    this.gridSize = gridSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.position = { x: 0, y: 0 };
    this.pulsePhase = 0;
    this.spawn();
  }

  spawn(snakeSegments = []) {
    let validPosition = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!validPosition && attempts < maxAttempts) {
      // Generate random grid position
      const gridX = Math.floor(Math.random() * (this.canvasWidth / this.gridSize));
      const gridY = Math.floor(Math.random() * (this.canvasHeight / this.gridSize));
      
      this.position = {
        x: gridX * this.gridSize,
        y: gridY * this.gridSize
      };

      // Check if position overlaps with snake
      validPosition = !snakeSegments.some(segment => 
        segment.x === this.position.x && segment.y === this.position.y
      );

      attempts++;
    }
  }

  checkCollision(snakeHead) {
    return (
      snakeHead.x === this.position.x &&
      snakeHead.y === this.position.y
    );
  }

  draw(ctx) {
    // Pulsing animation
    this.pulsePhase += 0.1;
    const pulse = Math.sin(this.pulsePhase) * 0.15 + 0.85;
    const size = this.gridSize * pulse;
    const offset = (this.gridSize - size) / 2;

    // Draw food with glow effect
    ctx.save();
    
    // Outer glow
    ctx.shadowColor = 'rgba(57, 255, 20, 0.6)';
    ctx.shadowBlur = 10;
    
    // Main food body
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.gridSize / 2,
      this.position.y + this.gridSize / 2,
      size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.gridSize / 2 - size / 6,
      this.position.y + this.gridSize / 2 - size / 6,
      size / 6,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    ctx.restore();
  }

  getPosition() {
    return this.position;
  }
}
