const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 600;

let isDragging = false
let mouseX, mouseY


class Ball {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.vx = Math.random() * 3 - 2;  // Random horizontal velocity
      this.vy = Math.random() * 6 - 2;  // Random vertical velocity
      this.gravity = .06;
      this.friction = 0.99;  // Air resistance to slow down
      this.bounce = 1.6;  // Energy loss on bounce
    }
  
    update() {
        if (!isDragging) {

            this.vy += this.gravity;  // Apply gravity
            this.x += this.vx;
            this.y += this.vy;
            
            // Detect collision with floor and walls
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.vy *= -this.bounce;  // Invert velocity, apply bounce factor
            }
            
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.vx *= -this.bounce;  // Reverse horizontal direction
            }
            
            // Friction to simulate energy loss in air
            this.vx *= this.friction;
            this.vy *= this.friction;
        }
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    isInside(mouseX,mouseY) {
        const dist = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2)
        return dist < this.radius
    }
  }
  
// Particle class
class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = Math.random() * 2 - 1;  // Random horizontal velocity
      this.vy = Math.random() * -2;  // Random upward velocity
      this.size = Math.random() * 5 + 2;
      this.alpha = 1;  // Opacity
      this.life = 100;  // Lifespan in frames
    }


  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;  // Slowly fade out
    this.size *= 0.98;  // Gradually shrink
    this.life--;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';  // Smoke color
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

// Particle System class
class ParticleSystem {
    constructor() {
      this.particles = [];
    }
  
    emit(x, y) {
      for (let i = 0; i < 5; i++) {  // Emit multiple particles
        this.particles.push(new Particle(x, y));
      }
    }
  
    update() {
      // Remove dead particles (particles with life <= 0)
      this.particles = this.particles.filter(p => p.life > 0);
      this.particles.forEach(p => p.update());
    }
  
    render(ctx) {
      this.particles.forEach(p => p.draw(ctx));
    }
  }

  // Create a ball instance
  const ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 'red');
  // Create particle system instance
  const particleSystem = new ParticleSystem()


canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top

    if (ball.isInside(mouseX, mouseY)) {
        isDragging = true
    }
})

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect()
      // Update the ball's position based on the mouse
      ball.x = e.clientX - rect.left;
      ball.y = e.clientY - rect.top;
    }
  });
  
  canvas.addEventListener('mouseup', () => {
    // Stop dragging when the mouse is released
    isDragging = false;
  });


function update() {
    ball.update()

    // Particle
    particleSystem.emit(ball.x, ball.y)
    particleSystem.update()
}

function render() {
    ctx.clearRect(0,0, canvas.width, canvas.height) //clear the canvas
    ball.draw(ctx)
    particleSystem.render(ctx)
}

function gameLoop() {
    update()
    render()
    requestAnimationFrame(gameLoop)
}

gameLoop()