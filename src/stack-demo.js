// Automated demo gameplay for tech stack page background
import { Snake } from './snake.js';
import { Food } from './food.js';

class DemoGame {
  constructor() {
    this.canvas = document.getElementById('bgCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 20;
    
    this.setupCanvas();
    this.init();
    this.startDemo();
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Ensure grid fits
    const gridCountX = Math.floor(this.canvas.width / this.gridSize);
    const gridCountY = Math.floor(this.canvas.height / this.gridSize);
    this.canvas.width = gridCountX * this.gridSize;
    this.canvas.height = gridCountY * this.gridSize;
  }

  init() {
    this.snake = new Snake(this.gridSize, this.canvas.width, this.canvas.height);
    this.food = new Food(this.gridSize, this.canvas.width, this.canvas.height);
    this.food.spawn(this.snake.getSegments());
    
    this.lastMoveTime = 0;
    this.moveInterval = 150;
    this.isRunning = true;
  }

  // AI pathfinding - simple approach toward food
  calculateNextDirection() {
    const head = this.snake.getHead();
    const foodPos = this.food.getPosition();
    const currentDir = this.snake.direction;
    
    const dx = foodPos.x - head.x;
    const dy = foodPos.y - head.y;
    
    // Determine best direction
    let targetDir = { x: 0, y: 0 };
    
    if (Math.abs(dx) > Math.abs(dy)) {
      // Move horizontally
      targetDir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
    } else {
      // Move vertically
      targetDir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
    }
    
    // Check if target direction is valid (not opposite)
    if (targetDir.x === -currentDir.x && targetDir.y === -currentDir.y) {
      // Can't reverse, try perpendicular direction
      if (currentDir.x !== 0) {
        targetDir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      } else {
        targetDir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      }
    }
    
    // Check if this move would cause collision
    const nextHead = {
      x: head.x + targetDir.x * this.gridSize,
      y: head.y + targetDir.y * this.gridSize
    };
    
    // Wall collision check
    if (nextHead.x < 0 || nextHead.x >= this.canvas.width ||
        nextHead.y < 0 || nextHead.y >= this.canvas.height) {
      // Try alternative directions
      const alternatives = [
        { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
      ];
      
      for (const alt of alternatives) {
        if (alt.x === -currentDir.x && alt.y === -currentDir.y) continue;
        
        const testHead = {
          x: head.x + alt.x * this.gridSize,
          y: head.y + alt.y * this.gridSize
        };
        
        if (testHead.x >= 0 && testHead.x < this.canvas.width &&
            testHead.y >= 0 && testHead.y < this.canvas.height) {
          targetDir = alt;
          break;
        }
      }
    }
    
    return targetDir;
  }

  update(currentTime) {
    if (!this.isRunning) return;
    
    if (currentTime - this.lastMoveTime < this.moveInterval) {
      return;
    }
    
    this.lastMoveTime = currentTime;
    
    // AI decision
    const nextDir = this.calculateNextDirection();
    this.snake.setDirection(nextDir);
    
    // Update snake
    this.snake.update();
    
    // Check collisions - restart if hit
    if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
      this.init();
      return;
    }
    
    // Check food
    if (this.food.checkCollision(this.snake.getHead())) {
      this.snake.grow();
      this.food.spawn(this.snake.getSegments());
      
      // Speed up slightly
      this.moveInterval = Math.max(80, this.moveInterval - 2);
    }
  }

  draw() {
    // Clear with Game Boy background
    this.ctx.fillStyle = '#9BBC0F';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw subtle grid
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
    
    // Draw entities
    this.food.draw(this.ctx);
    this.snake.draw(this.ctx);
  }

  startDemo() {
    const gameLoop = (currentTime) => {
      this.update(currentTime);
      this.draw();
      requestAnimationFrame(gameLoop);
    };
    
    requestAnimationFrame(gameLoop);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DemoGame();
  });
} else {
  new DemoGame();
}

// Handle resize
window.addEventListener('resize', () => {
  location.reload();
});
