// Particle system for food consumption effects
export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  createExplosion(x, y, color = '#39FF14') {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 3;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.02,
        size: 3 + Math.random() * 4,
        color: color
      });
    }
  }

  update() {
    this.particles = this.particles.filter(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply gravity and air resistance
      particle.vy += 0.15;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Decay life
      particle.life -= particle.decay;
      
      // Remove dead particles
      return particle.life > 0;
    });
  }

  draw(ctx) {
    ctx.save();
    
    this.particles.forEach(particle => {
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 8;
      ctx.fill();
    });
    
    ctx.restore();
  }

  hasParticles() {
    return this.particles.length > 0;
  }
}
