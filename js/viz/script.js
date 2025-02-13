// selection
d3.selectAll("circle")
  .attr("fill", "crimson")
  .attr("r", (d, i) => 10 + i * 5); // d: datum, i: index

d3.select("body").insert("h1", "svg").text("Hello, D3.js!");

// data binding
let nums = [3, 2, 1];
d3.selectAll("circle")
  .data(nums) // bind data (nums) to selection
  .attr("r", (d) => d * 5);

// data joins
let longNums = [3, 2, 1, 2, 3];
d3.select("svg")
  .selectAll("circle")
  .data(longNums)
  .join("circle") // adds/removes circle elements to match data
  .attr("fill", "crimson")
  .attr("cx", (d, i) => (i + 1) * 50)
  .attr("cy", 50)
  .attr("r", (d, i) => d * 5);

// real-time updates
let numbers = [3, 2, 1, 2, 3];

function update(data) {
  d3.select("svg")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("fill", "crimson")
    .attr("cx", (d, i) => (i + 1) * 50)
    .attr("cy", 50)
    .attr("r", (d, i) => d * 5);
}

function updateWithTransition(data) {
  d3.select("svg")
    .selectAll("circle")
    .data(data, (d) => d) // key function to match data
    .join("circle")
    .transition()
    .duration(500)
    .attr("cx", (d, i) => (i + 1) * 50)
    .attr("cy", 50)
    .attr("r", (d, i) => d * 5);
}

function updateFancy(data) {
  d3.select("svg")
    .selectAll("circle")
    .data(data, (d) => d)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("fill", "crimson")
          .attr("cx", (d, i) => (i + 1) * 50)
          .attr("cy", 50)
          .transition()
          .duration(500)
          .attr("r", (d, i) => d * 5),
      (update) =>
        update
          .transition()
          .duration(500)
          .attr("cx", (d, i) => (i + 1) * 50),
      (exit) => exit.transition().duration(500).attr("r", 0).remove()
    );
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

d3.select("#append").on("click", () => {
  numbers.push(randomIntFromInterval(1, 5));
  updateFancy(numbers);
});

d3.select("#prepend").on("click", () => {
  numbers.unshift(randomIntFromInterval(1, 5));
  updateFancy(numbers);
});

d3.select("#drop").on("click", () => {
  numbers.pop();
  updateFancy(numbers);
});
