let play = document.getElementById("play");
let playing = document.getElementById("playing");

play.addEventListener("click", () => {
  play.style.display = "none";
  playing.style = "";

  Tone.start();

  let synth = new Tone.Synth({
    oscillator: {
      type: "sine", // other options include "square", "sawtooth", "triangle"
    },
    envelope: {
      attack: 0,
      decay: 0,
      sustain: 1,
      release: 0,
    },
    volume: -6,
  }).toDestination();

  synth.triggerAttackRelease("A4", 2, 0);
});
