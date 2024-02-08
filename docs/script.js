var ball = document.getElementById("ball");
var paddle = document.getElementById("paddle");
var paddleWidth = paddle.offsetWidth;
var ballRadius = ball.offsetWidth / 2;
var ballSpeedX = 5;
var ballSpeedY = -5;
var paddleSpeed = 20;
var gameOver = false;

function movePaddle(offset) {
    var currentLeft = parseInt(paddle.style.left) || 0;
    var newLeft = currentLeft + offset;
    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft > window.innerWidth - paddleWidth) {
        newLeft = window.innerWidth - paddleWidth;
    }
    paddle.style.left = newLeft + "px";
}

function moveBall() {
    var ballRect = ball.getBoundingClientRect();
    var paddleRect = paddle.getBoundingClientRect();

    if (ballRect.top + ballSpeedY < 0) {
        ballSpeedY = -ballSpeedY;
    } else if (ballRect.bottom + ballSpeedY > window.innerHeight) {
        // ゲームオーバー
        gameOver = true;
        alert("Game Over");
        resetGame();
        return;
    }

    if (
        ballRect.left + ballSpeedX < 0 ||
        ballRect.right + ballSpeedX > window.innerWidth
    ) {
        ballSpeedX = -ballSpeedX;
    }

    if (
        ballRect.bottom + ballSpeedY > paddleRect.top &&
        ballRect.left + ballSpeedX > paddleRect.left &&
        ballRect.right + ballSpeedX < paddleRect.right
    ) {
        ballSpeedY = -ballSpeedY;
    }

    ball.style.left = ballRect.left + ballSpeedX + "px";
    ball.style.top = ballRect.top + ballSpeedY + "px";
}

function resetGame() {
    ball.style.left = "calc(50% - " + ballRadius + "px)";
    ball.style.top = "50px";
    gameOver = false;
}

document.addEventListener("keydown", function (event) {
    if (gameOver) return;
    if (event.key === "ArrowLeft") {
        movePaddle(-paddleSpeed);
    } else if (event.key === "ArrowRight") {
        movePaddle(paddleSpeed);
    }
});

setInterval(moveBall, 30)