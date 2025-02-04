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

function draw() {
  // clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // draw the ball
  ctx.fillStyle = "white";
  ctx.fillRect(ballPos.x, ballPos.y, BALL_SIZE, BALL_SIZE);
}

function update() {
  ballPos.x += ballSpeed.x;
  ballPos.y += ballSpeed.y;
}

function checkCollision() {
  let ball = {
    left: ballPos.x,
    right: ballPos.x + BALL_SIZE,
    top: ballPos.y,
    bottom: ballPos.y + BALL_SIZE,
  };

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
