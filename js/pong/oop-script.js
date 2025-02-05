class GameView {
  constructor() {
    let canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.offsetTop = canvas.offsetTop;
  }

  draw(...elements) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    elements.forEach((element) => {
      element.draw(this.ctx);
    });
  }

  drawScores(scores) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(scores.leftScore.toString(), 50, 50);
    this.ctx.textAlign = "right";
    this.ctx.fillText(scores.rightScore.toString(), this.canvasWidth - 50, 50);
  }

  drawGameOver() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over", this.canvasWidth / 2, this.canvasHeight / 2);
  }
}

class Element {
  constructor(x, y, width, height, color = "white") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  boundingBox() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height,
    };
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Ball extends Element {
  static SIZE = 5;

  constructor() {
    super(0, 0, Ball.SIZE, Ball.SIZE);
    this.init();
  }

  init() {
    this.x = 20;
    this.y = 20;
    this.xSpeed = 4;
    this.ySpeed = 2;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  adjustAngle(distanceFromTop, distanceFromBottom, speedShift = 0.5) {
    if (distanceFromTop < 0) {
      this.ySpeed -= speedShift;
    } else if (distanceFromBottom < 0) {
      this.ySpeed += speedShift;
    }
  }

  checkPaddleCollision(paddle, xSpeedAfterCollision) {
    let ballBox = this.boundingBox();
    let paddleBox = paddle.boundingBox();

    let collisionOccurred =
      ballBox.left < paddleBox.right &&
      ballBox.right > paddleBox.left &&
      ballBox.top < paddleBox.bottom &&
      ballBox.bottom > paddleBox.top;

    if (collisionOccurred) {
      let distanceFromTop = ballBox.top - paddleBox.top;
      let distanceFromBottom = paddleBox.bottom - ballBox.bottom;
      this.adjustAngle(distanceFromTop, distanceFromBottom);
      this.xSpeed = xSpeedAfterCollision;
    }
  }

  checkWallCollision(width, height, scores) {
    let ballBox = this.boundingBox();

    if (ballBox.left < 0) {
      scores.rightScore++;
      this.init();
    }

    if (ballBox.right > width) {
      scores.leftScore++;
      this.init();
    }

    if (ballBox.top < 0 || ballBox.bottom > height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}

class Paddle extends Element {
  static WIDTH = 5;
  static HEIGHT = 20;
  static OFFSET = 10;

  constructor(x, y) {
    super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
  }
}

class Scores {
  constructor() {
    this.leftScore = 0;
    this.rightScore = 0;
  }
}

class Computer {
  static SPEED = 2;

  static followBall(ball, paddle) {
    let ballBox = ball.boundingBox();
    let paddleBox = paddle.boundingBox();

    if (ballBox.bottom < paddleBox.top) {
      paddle.y -= this.SPEED;
    } else if (ballBox.top > paddleBox.bottom) {
      paddle.y += this.SPEED;
    }
  }
}

class Game {
  constructor() {
    this.view = new GameView();
    this.ball = new Ball();
    this.leftPaddle = new Paddle(Paddle.OFFSET, 10);
    this.rightPaddle = new Paddle(
      this.view.canvasWidth - Paddle.OFFSET - Paddle.WIDTH,
      30
    );
    this.scores = new Scores();
    this.gameOver = false;

    document.addEventListener("mousemove", (e) => {
      this.rightPaddle.y = e.y - this.view.offsetTop;
    });
  }

  draw() {
    this.view.draw(this.ball, this.leftPaddle, this.rightPaddle);
    this.view.drawScores(this.scores);
  }

  checkCollision() {
    this.ball.checkPaddleCollision(this.leftPaddle, Math.abs(this.ball.xSpeed));
    this.ball.checkPaddleCollision(
      this.rightPaddle,
      -Math.abs(this.ball.xSpeed)
    );

    this.ball.checkWallCollision(
      this.view.canvasWidth,
      this.view.canvasHeight,
      this.scores
    );

    if (this.scores.leftScore >= 9 || this.scores.rightScore >= 9) {
      this.gameOver = true;
    }
  }

  update() {
    this.ball.update();
    Computer.followBall(this.ball, this.leftPaddle);
  }

  loop() {
    this.draw();
    this.update();
    this.checkCollision();

    if (this.gameOver) {
      this.draw();
      this.view.drawGameOver();
    } else {
      setTimeout(() => this.loop(), 30);
    }
  }
}

let game = new Game();
game.loop();
