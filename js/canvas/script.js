let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d"); // 2d rendering context

// draw a rectangle
function drawRectangle(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// draw an outlined rectangle
function drawOutlinedRectangle(ctx, x, y, width, height, color, lineWidth) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, width, height);
}

// draw a triangle
function drawTriangle(ctx, x0, y0, x1, y1, x2, y2, x3, y3, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fill();
}

// draw a circle
function drawCircle(ctx, x0, y0, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    x0,
    y0,
    r,
    (startAngle = 0),
    (endAngle = Math.PI * 2),
    (counterclockwise = false)
  );
  ctx.fill();
}

// clear the canvas
function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// draw a random figure from the above
figs = {
  rectangle: [drawRectangle, ctx, 10, 10, 200, 100, "crimson"],
  outlinedRectangle: [
    drawOutlinedRectangle,
    ctx,
    10,
    10,
    200,
    100,
    "dodgerblue",
    5,
  ],
  triangle: [drawTriangle, ctx, 100, 100, 150, 15, 200, 100, 100, 100, "gold"],
  circle: [drawCircle, ctx, 100, 100, 50, "darkorange"],
};

function drawRandomFigure() {
  let keys = Object.keys(figs);
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  let randomFigure = figs[randomKey];
  let [fn, ...args] = randomFigure;
  clearCanvas(ctx);
  fn(...args);
}

// add event listeners to the buttons
let drawButton = document.querySelector("#draw");
let clearButton = document.querySelector("#clear");
drawButton.addEventListener("click", drawRandomFigure);
clearButton.addEventListener("click", () => clearCanvas(ctx));
