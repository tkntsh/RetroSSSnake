// Input controls for keyboard and touch
export class Controls {
  constructor() {
    this.currentDirection = null;
    this.directionQueue = [];
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.swipeThreshold = 30;
    
    this.setupKeyboardControls();
    this.setupTouchControls();
    this.setupMobileButtons();
  }

  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      let direction = null;

      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = { x: 0, y: -1 };
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = { x: 1, y: 0 };
          e.preventDefault();
          break;
      }

      if (direction) {
        this.queueDirection(direction);
      }
    });
  }

  setupTouchControls() {
    const canvas = document.getElementById('gameCanvas');
    
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - this.touchStartX;
      const deltaY = touch.clientY - this.touchStartY;
      
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX > this.swipeThreshold || absDeltaY > this.swipeThreshold) {
        let direction = null;

        if (absDeltaX > absDeltaY) {
          // Horizontal swipe
          direction = deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
        } else {
          // Vertical swipe
          direction = deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
        }

        if (direction) {
          this.queueDirection(direction);
        }
      }
      
      e.preventDefault();
    }, { passive: false });
  }

  setupMobileButtons() {
    const dpadButtons = document.querySelectorAll('.dpad-btn[data-direction]');
    
    dpadButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const dir = button.dataset.direction;
        let direction = null;

        switch(dir) {
          case 'up':
            direction = { x: 0, y: -1 };
            break;
          case 'down':
            direction = { x: 0, y: 1 };
            break;
          case 'left':
            direction = { x: -1, y: 0 };
            break;
          case 'right':
            direction = { x: 1, y: 0 };
            break;
        }

        if (direction) {
          this.queueDirection(direction);
        }
        
        e.preventDefault();
      });
    });
  }

  queueDirection(direction) {
    // Only queue if different from last queued direction
    const lastQueued = this.directionQueue[this.directionQueue.length - 1] || this.currentDirection;
    
    if (!lastQueued || 
        direction.x !== lastQueued.x || 
        direction.y !== lastQueued.y) {
      this.directionQueue.push(direction);
    }
  }

  getNextDirection() {
    if (this.directionQueue.length > 0) {
      this.currentDirection = this.directionQueue.shift();
    }
    return this.currentDirection;
  }

  clearQueue() {
    this.directionQueue = [];
  }
}
