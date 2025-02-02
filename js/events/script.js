// click event
let heading = document.getElementById("main-heading");
heading.addEventListener("click", () => console.log("heading clicked"));

let body = document.querySelector("body");
body.addEventListener("click", () => console.log("body clicked"));

let coinChoices = document.querySelector("#coin-faces");
let coinFlips = document.querySelector("#coin-flips");
coinChoices.addEventListener("click", (e) => {
  let flip = e.target.textContent;
  coinFlips.textContent += `${flip} `;
});

// mousemove event
logging = false;
document.querySelector("html").addEventListener("mousemove", (e) => {
  if (logging) {
    console.log(`mousemove at ${e.clientX}, ${e.clientY}`);
  }
});

// keydown event
let box = document.querySelector("#box");
document.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "ArrowUp") {
    if (box.offsetTop > 0) {
      box.style.top = `${box.offsetTop - 10}px`;
    }
  } else if (key === "ArrowDown") {
    if (box.offsetTop < window.innerHeight - box.clientHeight) {
      box.style.top = `${box.offsetTop + 10}px`;
    }
  } else if (key === "ArrowLeft") {
    if (box.offsetLeft > 0) {
      box.style.left = `${box.offsetLeft - 10}px`;
    }
  }
  if (key === "ArrowRight") {
    if (box.offsetLeft < window.innerWidth - box.clientWidth) {
      box.style.left = `${box.offsetLeft + 10}px`;
    }
  }
});
