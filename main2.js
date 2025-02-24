const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
canvas.width = 600
canvas.height = 700

class Ball {
    constructor(x,y,radius,color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        // beginPath arc(x,y, radius, 0, 0) fillStyle fill closePath
        context.beginPath
        context.arc(this.x,this.y,this.radius, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
    }

}

// CREATE BALL INSTANCE
const ball = new Ball(100,100,20,'blue')
const ball2 = new Ball(150, 150, 20, 'red')

function update() {
    // Update the ball's position or state here in future
}
function render() {
    context.clearRect(0,0, canvas.width, canvas.height)
    ball.draw()
}
function gameLoop() {
    update()
    render()

    requestAnimationFrame(gameLoop)
}

// Start the game loop
gameLoop()
