// init canvas
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// init ball
const BALL_SIZE = 5;
let ballPos = {
  x: 20,
  y: 20,
};
let ballSpeed = {
  x: 4,
  y: 2,
};

// init paddle
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;
let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

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
}

function update() {
  ballPos.x += ballSpeed.x;
  ballPos.y += ballSpeed.y;
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
    ballSpeed.y = -speedShift;
  } else if (distanceFromBottom < 0) {
    // ball hit near the bottom of the paddle
    ballSpeed.y = speedShift;
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

  if (ball.left < 0 || ball.right > canvasWidth) {
    ballSpeed.x = -ballSpeed.x;
  }
  if (ball.top < 0 || ball.bottom > canvasHeight) {
    ballSpeed.y = -ballSpeed.y;
  }
}

function gameLoop() {
  draw();
  update();
  checkCollision();
  setTimeout(gameLoop, 30); // call gameLoop again after 30ms
}

gameLoop();
