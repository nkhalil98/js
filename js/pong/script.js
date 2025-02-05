// init canvas
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// init ball
const BALL_SIZE = 5;
let ballPos;
let ballSpeed;

function initBall() {
  ballPos = {
    x: 20,
    y: 20,
  };
  ballSpeed = {
    x: 4,
    y: 2,
  };
}

// init paddles
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;
const COMPUTER_PADDLE_SPEED = 2;
let leftPaddleTop = 10;
let rightPaddleTop = 30;

// score and game over
let leftScore = 0;
let rightScore = 0;
let gameOver = false;

// paddle movement
document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

function computerFollowBall() {
  let ball = {
    top: ballPos.y,
    bottom: ballPos.y + BALL_SIZE,
  };

  let leftPaddle = {
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  if (ball.bottom < leftPaddle.top) {
    leftPaddleTop -= COMPUTER_PADDLE_SPEED;
  } else if (ball.top > leftPaddle.bottom) {
    leftPaddleTop += COMPUTER_PADDLE_SPEED;
  }
}

function draw() {
  // clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "white";

  // draw the ball
  ctx.fillRect(ballPos.x, ballPos.y, BALL_SIZE, BALL_SIZE);

  // draw the paddles
  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(
    canvasWidth - PADDLE_OFFSET - PADDLE_WIDTH,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );

  // draw the scores
  ctx.font = "30px Monospace";
  ctx.textAlign = "left";
  ctx.fillText(leftScore.toString(), 50, 50);
  ctx.textAlign = "right";
  ctx.fillText(rightScore.toString(), canvasWidth - 50, 50);
}

function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "30px Monospace";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2);
}

function update() {
  ballPos.x += ballSpeed.x;
  ballPos.y += ballSpeed.y;
  computerFollowBall();
}

function checkPaddleBallCollision(ball, paddle) {
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}

function adjustAngle(ball, paddle, speedShift) {
  let distanceFromTop = ball.top - paddle.top;
  let distanceFromBottom = paddle.bottom - ball.bottom;

  if (distanceFromTop < 0) {
    // ball hit near the top of the paddle
    ballSpeed.y -= speedShift;
  } else if (distanceFromBottom < 0) {
    // ball hit near the bottom of the paddle
    ballSpeed.y += speedShift;
  }
}

function checkCollision() {
  let ball = {
    left: ballPos.x,
    right: ballPos.x + BALL_SIZE,
    top: ballPos.y,
    bottom: ballPos.y + BALL_SIZE,
  };

  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  let rightPaddle = {
    left: canvasWidth - PADDLE_OFFSET - PADDLE_WIDTH,
    right: canvasWidth - PADDLE_OFFSET,
    top: rightPaddleTop,
    bottom: rightPaddleTop + PADDLE_HEIGHT,
  };

  if (checkPaddleBallCollision(ball, leftPaddle)) {
    adjustAngle(ball, leftPaddle, 0.5);
    ballSpeed.x = Math.abs(ballSpeed.x); // trick instead of negating in case of multiple collisions
  }

  if (checkPaddleBallCollision(ball, rightPaddle)) {
    adjustAngle(ball, rightPaddle, 0.5);
    ballSpeed.x = -Math.abs(ballSpeed.x);
  }

  if (ball.left < 0) {
    rightScore++;
    initBall();
  }

  if (ball.right > canvasWidth) {
    leftScore++;
    initBall();
  }

  if (leftScore > 9 || rightScore > 9) {
    gameOver = true;
  }

  if (ball.top < 0 || ball.bottom > canvasHeight) {
    ballSpeed.y = -ballSpeed.y;
  }
}

function gameLoop() {
  draw();
  update();
  checkCollision();
  if (gameOver) {
    draw();
    drawGameOver();
  } else {
    setTimeout(gameLoop, 30); // call gameLoop again after 30ms
  }
}

initBall();
gameLoop();
