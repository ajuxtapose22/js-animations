const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
canvas.width = 600
canvas.height = 700

class HeavyBall {
    constructor(x,y,radius,color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.vx = Math.random() * 2 
        this.vy = Math.random() * 2
        this.gravity = .7
        this.bounce = .8
    }

    draw() {
        // beginPath arc(x,y, radius, 0, 0) fillStyle fill closePath
        context.beginPath()
        context.arc(this.x,this.y,this.radius, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
    }

    update() {
        this.vy += this.gravity; 
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius
            this.vy *= -this.bounce
        }

        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius 
            this.vx *= -this.bounce
        } else if (this.x - this.radius < 0) {
            this.x = this.radius
            this.vx *= -this.bounce
        }


    }

}

class LightBall {
    constructor(x,y,radius,color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.vx = Math.random() * 2 
        this.vy = Math.random() * 2
        this.gravity = .06
        this.bounce = .9
        this.mass = radius * radius * Math.PI
    }

    draw() {
        // beginPath arc(x,y, radius, 0, 0) fillStyle fill closePath
        context.beginPath()
        context.arc(this.x,this.y,this.radius, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
    }

    update(balls) {
        this.vy += this.gravity; 
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius
            this.vy *= -this.bounce
        }

        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius 
            this.vx *= -this.bounce
        } else if (this.x - this.radius < 0) {
            this.x = this.radius
            this.vx *= -this.bounce
        }


        //Ball Collision Implementation Goes Here


    }

}

// CREATE BALL INSTANCE
const heavyBalls = [
    new HeavyBall(20, 400, 30 ,'blue'),
    new HeavyBall(300, 20 , 30 ,'red')
]
const ball2 = new LightBall(150, 150, 20, 'green')

function update() {
    // Update the ball's position or state here in future
    for (let ball of heavyBalls) {
        ball.update(heavyBalls)
    }
    ball2.update()
}
function render() {
    context.clearRect(0,0, canvas.width, canvas.height)
    for (let ball of heavyBalls) {
        ball.draw()
    }
    ball2.draw()
}
function gameLoop() {
    update()
    render()

    requestAnimationFrame(gameLoop)
}

// Start the game loop
gameLoop()
