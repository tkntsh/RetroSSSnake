// Snake class with gradient rendering and smooth movement
export class Snake {
  constructor(gridSize, canvasWidth, canvasHeight) {
    this.gridSize = gridSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }

  reset() {
    // Start in the middle of the canvas
    const startX = Math.floor(this.canvasWidth / this.gridSize / 2) * this.gridSize;
    const startY = Math.floor(this.canvasHeight / this.gridSize / 2) * this.gridSize;
    
    this.segments = [
      { x: startX, y: startY },
      { x: startX - this.gridSize, y: startY },
      { x: startX - this.gridSize * 2, y: startY }
    ];
    
    this.direction = { x: 1, y: 0 }; // Start moving right
    this.nextDirection = { x: 1, y: 0 };
    this.growing = false;
  }

  setDirection(newDirection) {
    // Prevent reversing into itself
    if (newDirection.x === -this.direction.x && newDirection.y === -this.direction.y) {
      return;
    }
    this.nextDirection = newDirection;
  }

  update() {
    // Update direction
    this.direction = this.nextDirection;

    // Calculate new head position
    const head = this.segments[0];
    const newHead = {
      x: head.x + this.direction.x * this.gridSize,
      y: head.y + this.direction.y * this.gridSize
    };

    // Add new head
    this.segments.unshift(newHead);

    // Remove tail if not growing
    if (!this.growing) {
      this.segments.pop();
    } else {
      this.growing = false;
    }
  }

  grow() {
    this.growing = true;
  }

  checkSelfCollision() {
    const head = this.segments[0];
    // Check if head collides with any body segment (skip the head itself)
    for (let i = 1; i < this.segments.length; i++) {
      if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
        return true;
      }
    }
    return false;
  }

  checkWallCollision() {
    const head = this.segments[0];
    return (
      head.x < 0 ||
      head.x >= this.canvasWidth ||
      head.y < 0 ||
      head.y >= this.canvasHeight
    );
  }

  draw(ctx) {
    const segmentCount = this.segments.length;
    
    this.segments.forEach((segment, index) => {
      // Create gradient from head (bright) to tail (dark)
      const brightness = 1 - (index / segmentCount) * 0.6;
      
      // Game Boy green gradient
      const r = Math.floor(15 * brightness);
      const g = Math.floor(56 * brightness);
      const b = Math.floor(15 * brightness);
      
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
      
      // Add border for pixel-perfect look
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(segment.x, segment.y, this.gridSize, this.gridSize);
      
      // Head gets extra highlight
      if (index === 0) {
        ctx.fillStyle = 'rgba(155, 188, 15, 0.5)';
        ctx.fillRect(
          segment.x + 2,
          segment.y + 2,
          this.gridSize - 4,
          this.gridSize - 4
        );
      }
    });
  }

  getHead() {
    return this.segments[0];
  }

  getSegments() {
    return this.segments;
  }
}
