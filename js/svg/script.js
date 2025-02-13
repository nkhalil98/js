document.querySelectorAll(".fun").forEach((el) => {
  el.setAttribute("data-offset", 0);
  el.addEventListener("click", (e) => {
    let offset = Number(e.target.getAttribute("data-offset")); // set data attribute

    if (e.shiftKey) {
      offset -= 5;
    } else {
      offset += 5;
    }

    e.target.setAttribute("data-offset", offset);
    e.target.setAttribute("transform", `translate(${offset}, 0)`); // apply transform
  });
});
