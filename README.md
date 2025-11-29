# 🐍 Snake Game

A retro-styled Snake game with a classic Game Boy aesthetic, built with modern web technologies.

![Snake Game](https://img.shields.io/badge/Game-Snake-brightgreen?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-Vite-646CFF?style=for-the-badge&logo=vite)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)

## 🎮 Features

- **Smooth 60fps Gameplay** - Buttery smooth animations with requestAnimationFrame
- **Gradient Snake** - Beautiful color gradient from head to tail
- **Particle Effects** - Explosive particles when eating food
- **Progressive Difficulty** - Speed increases as you score higher
- **High Score System** - Persistent high scores using localStorage
- **Mobile Support** - Touch controls and swipe gestures
- **Retro Aesthetic** - Classic Game Boy color palette with modern effects
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🕹️ How to Play

- **Desktop:** Use Arrow Keys or WASD to control the snake
- **Mobile:** Swipe in any direction or use the on-screen D-pad
- **Pause:** Press Space or Escape (or tap the pause button on mobile)

**Objective:** Eat the red food to grow and score points. Avoid hitting walls or yourself!

## 🚀 Tech Stack

- **Vite** - Lightning-fast build tool
- **Vanilla JavaScript** - Pure ES6+ with no framework overhead
- **HTML5 Canvas** - Hardware-accelerated 2D rendering
- **CSS3** - Modern styling with glassmorphism and neon effects
- **Vercel** - Zero-config deployment platform

[View Full Tech Stack →](stack.html)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/snake-game.git

# Navigate to project directory
cd snake-game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

This project is optimized for Vercel deployment. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or use the Vercel Dashboard to import your GitHub repository.

## 📁 Project Structure

```
snake-game/
├── index.html          # Main game page
├── stack.html          # Tech stack info page
├── style.css           # Main styles
├── stack.css           # Tech stack page styles
├── src/
│   ├── main.js        # Game initialization
│   ├── game.js        # Core game loop
│   ├── snake.js       # Snake entity
│   ├── food.js        # Food entity
│   ├── particles.js   # Particle system
│   ├── controls.js    # Input handling
│   ├── ui.js          # UI management
│   └── stack-demo.js  # Animated demo
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── vercel.json        # Vercel deployment config
```

## 🎨 Design

The game features a **retro Game Boy aesthetic** with:
- Olive/lime green color palette (#9BBC0F, #8BAC0F, #306230, #0F380F)
- Pixelated "Press Start 2P" font
- Glassmorphism UI overlays
- Neon glow effects
- Smooth animations and transitions

## 🔧 Configuration

### Vite Config
The project uses Vite for development and building. Configuration is in `vite.config.js`.

### Vercel Config
Deployment settings are in `vercel.json`. The project is configured as a static site.

## 📱 Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Game Mechanics

- **Grid-based Movement** - Snake moves on a 20px grid
- **Collision Detection** - Wall and self-collision
- **Food Spawning** - Random positions avoiding snake body
- **Speed Progression** - Increases every 50 points
- **Score System** - 10 points per food
- **Particle Effects** - 15 particles per food consumption

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas:
- Add different difficulty levels
- Implement obstacles/walls
- Add power-ups
- Create multiple maps
- Add sound effects
- Implement multiplayer

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🙏 Acknowledgments

- Inspired by the classic Nokia Snake game
- Game Boy color palette
- Built with modern web standards

---

**Made with ❤️ using Vite and Vanilla JavaScript**

[Play Now](https://your-deployment-url.vercel.app) | [View Tech Stack](stack.html)
