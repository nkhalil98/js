let play = document.getElementById("play");
let playing = document.getElementById("playing");

play.addEventListener("click", () => {
  play.style.display = "none";
  playing.style = "";

  let audioCtx = new AudioContext();

  let oscNode = audioCtx.createOscillator();
  oscNode.frequency.value = 440;

  let gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.5;

  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscNode.start(audioCtx.currentTime);
  oscNode.stop(audioCtx.currentTime + 2);
});
