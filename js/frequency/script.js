const width = 600;
const height = 600;

let svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let margin = { top: 20, right: 10, bottom: 20, left: 50 };

let topContainer = svg
  .append("g")
  .attr("id", "top-container")
  .attr("transform", `translate(0, ${margin.top})`);

let leftContainer = svg
  .append("g")
  .attr("id", "left-container")
  .attr("transform", `translate(${margin.left}, 0)`);

function getClass(char) {
  if (char.match(/[a-z]/)) {
    return "lowercase";
  } else if (char.match(/[A-Z]/)) {
    return "uppercase";
  } else if (char.match(/\d/)) {
    return "digit";
  } else {
    return "special";
  }
}

function update(data) {
  let xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([margin.left, width - margin.right])
    .nice();

  let yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.char))
    .range([margin.top, height - margin.bottom])
    .padding(0.5);

  let topAxisTicks = xScale.ticks().filter((tick) => Number.isInteger(tick));

  let topAxis = d3
    .axisTop(xScale)
    .tickValues(topAxisTicks)
    .tickFormat(d3.format("d"));
  let leftAxis = d3.axisLeft(yScale);

  topContainer.transition().call(topAxis);
  leftContainer.transition().call(leftAxis);

  svg
    .selectAll("rect")
    .data(data, (d) => d.char)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", xScale(0))
          .attr("y", (d, i) => yScale(d.char))
          .attr("class", (d, i) => getClass(d.char))
          .transition()
          .attr("width", (d, i) => xScale(d.count) - xScale(0))
          .attr("height", yScale.bandwidth()),
      (update) =>
        update
          .transition()
          .attr("width", (d, i) => xScale(d.count) - xScale(0))
          .attr("height", yScale.bandwidth())
          .attr("y", (d, i) => yScale(d.char)),
      (exit) => exit.transition().attr("width", 0).attr("height", 0).remove()
    );
}

function parseSpace(char) {
  if (char.trim() === "") {
    return "<space>";
  } else {
    return char;
  }
}

d3.select("textarea").on("input", (e) => {
  let freqs = {};
  let text = e.target.value.split("");
  text.forEach((char) => {
    char = parseSpace(char);
    if (freqs[char]) {
      freqs[char]++;
    } else {
      freqs[char] = 1;
    }
  });

  let data = Object.entries(freqs).map((d) => ({
    char: d[0],
    count: d[1],
  }));

  data.sort((a, b) => d3.ascending(a.char, b.char));

  update(data);
});
