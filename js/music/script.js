let play = document.getElementById("play");
let playing = document.getElementById("playing");

function playNote() {
  let synth = new Tone.Synth({
    oscillator: {
      type: "sine", // other options include "square", "sawtooth", "triangle"
    },
    envelope: {
      attack: 0.8,
      decay: 0.3,
      sustain: 0.8,
      release: 1,
    },
    volume: -6,
  }).toDestination();

  synth.triggerAttackRelease("A4", 2, 0);
}

function playNotesSequence() {
  let synth = new Tone.Synth({
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.8,
      release: 0.1,
    },
    volume: -6,
  }).toDestination();

  let notes = ["A3", "B3", "C#4", "D4", "E4", "F#4", "G#4", "A4"];
  let times = [0, 1, 2, 3, 4, 5, 6, 7];

  notes.forEach((note) => {
    synth.triggerAttackRelease(note, 0.9, times.shift());
  });
}

function playNotesAtOnce() {
  let synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.8,
      release: 0.1,
    },
    volume: -6,
  }).toDestination();

  let notes = [
    ["A3", "C#4"],
    ["B3", "D4"],
    ["C#4", "E4"],
    ["D4", "F#4"],
    ["E4", "G#4"],
    ["F#4", "A4"],
    ["G#4", "B4"],
    ["A4", "C#5"],
  ];
  let times = [0, 1, 2, 3, 4, 5, 6, 7];

  notes.forEach((note) => {
    synth.triggerAttackRelease(note, 0.9, times.shift());
  });
}

function playLoop() {
  let synth = new Tone.Synth().toDestination();

  new Tone.Loop((time) => {
    synth.triggerAttackRelease("C4", "16n", time);
  }, "4n")
    .start("0:0:0")
    .stop("4:0:0"); // bars:quarters:sixteenths notation

  Tone.Transport.start();
}

function playSequenceLoop() {
  let synth = new Tone.Synth().toDestination();

  new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    },
    ["G4", "C4", "C4", "C4"],
    "4n",
  )
    .start("0:0:0")
    .stop("4:0:0");

  Tone.Transport.start();
}

function playPart() {
  let synth = new Tone.PolySynth(Tone.Synth).toDestination();

  new Tone.Part(
    (time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    },
    [
      ["0:0:0", ["C3", "C4"]],
      ["0:0:3", "D4"],
      ["0:1:0", "C4"],
      ["0:1:2", "D4"],
      ["0:2:0", ["E3", "E4"]],
      ["0:2:2", "E4"],
      ["0:3:0", "E4"],
      ["1:0:0", ["G3", "D4"]],
      ["1:0:2", "D4"],
      ["1:1:0", "D4"],
      ["1:2:0", ["E3", "E4"]],
      ["1:2:2", "G4"],
      ["1:3:0", "G4"],
    ],
  ).start("0:0:0");

  Tone.Transport.start();
}

function playHiHat() {
  let hiHatFilter = new Tone.Filter(15000, "bandpass").toDestination();
  let hiHat = new Tone.NoiseSynth({
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0,
      release: 0,
    },
    volume: -6,
  }).connect(hiHatFilter);

  new Tone.Loop((time) => {
    hiHat.triggerAttackRelease("16n", time);
  }, "8n")
    .start("0:0:0")
    .stop("4:0:0");

  Tone.Transport.start();
}

function playSnare() {
  class Snare {
    constructor() {
      this.noiseFilter = new Tone.Filter(5000, "bandpass").toDestination();
      this.noiseSynth = new Tone.NoiseSynth({
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0,
        },
        volume: -12,
      }).connect(this.noiseFilter);
      this.synth = new Tone.Synth({
        oscillator: {
          type: "sine",
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0,
        },
        volume: -12,
      }).toDestination();
    }

    triggerAttackRelease(duration, when) {
      this.noiseSynth.triggerAttackRelease(duration, when);
      this.synth.triggerAttackRelease("G3", duration, when);
    }
  }

  let snare = new Snare();
  new Tone.Loop((time) => {
    snare.triggerAttackRelease("16n", time);
  }, "2n")
    .start("0:1:0")
    .stop("4:0:0");

  Tone.Transport.start();
}

function playKick() {
  let kick = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 6,
    volume: -9,
  }).toDestination();

  new Tone.Loop((time) => {
    kick.triggerAttackRelease(50, "16n", time);
  }, "2n")
    .start("0:0:0")
    .stop("4:0:0");

  Tone.Transport.start();
}

function playKickWithReverb() {
  let reverb = new Tone.Reverb({ decay: 1, wet: 0.3 }).toDestination();
  let kick = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 6,
    volume: -9,
  }).connect(reverb);

  new Tone.Loop((time) => {
    kick.triggerAttackRelease(50, "16n", time);
  }, "2n")
    .start("0:0:0")
    .stop("4:0:0");

  Tone.Transport.start();
}

function playDrums(drumPattern) {
  function makeSequence(pattern) {
    return pattern.split("").map((value) => (value === "." ? null : value));
  }

  let reverb = new Tone.Reverb({ decay: 1, wet: 0.3 }).toDestination();
  
  let hiHatFilter = new Tone.Filter(15000, "bandpass").connect(reverb);
  let hiHat = new Tone.NoiseSynth({
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0,
      release: 0,
    },
    volume: -6,
  }).connect(hiHatFilter);

  new Tone.Sequence(
    (time) => {
      hiHat.triggerAttackRelease("16n", time);
    },
    makeSequence(drumPattern.hiHat),
    "8n",
  )
    .start("0:0:0")
    .stop("4:0:0");

  class Snare {
    constructor() {
      this.noiseFilter = new Tone.Filter(5000, "bandpass").connect(reverb);
      this.noiseSynth = new Tone.NoiseSynth({
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0,
        },
        volume: -12,
      }).connect(this.noiseFilter);
      this.synth = new Tone.Synth({
        oscillator: {
          type: "sine",
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0,
        },
        volume: -12,
      }).connect(reverb);
    }

    triggerAttackRelease(duration, when) {
      this.noiseSynth.triggerAttackRelease(duration, when);
      this.synth.triggerAttackRelease("G3", duration, when);
    }
  }

  let snare = new Snare();

  new Tone.Sequence(
    (time) => {
      snare.triggerAttackRelease("16n", time);
    },
    makeSequence(drumPattern.snare),
    "8n",
  )
    .start("0:0:0")
    .stop("4:0:0");

  let kick = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 6,
    volume: -9,
  }).connect(reverb);

  new Tone.Sequence(
    (time) => {
      kick.triggerAttackRelease(50, "16n", time);
    },
    makeSequence(drumPattern.kick),
    "8n",
  );

  Tone.Transport.start();
}

function playSamples() {
  const sampler = new Tone.Sampler({
    urls: {
      C5: "trumpet-c5.mp3",
      D5: "trumpet-d5.mp3",
      F5: "trumpet-f5.mp3",
    },
    baseUrl: "https://skilldrick-jscc.s3.us-west-2.amazonaws.com/",
    attack: 0,
    release: 1,
    volume: -24,
    onload: () => {
      sampler.triggerAttackRelease(["C5", "E5", "G5"], "1n", 0);
    },
  }).toDestination();

  Tone.Transport.start();
}

play.addEventListener("click", () => {
  play.style.display = "none";
  playing.style = "";

  Tone.start();

  let drumPattern = {
    kick: "x...x...",
    snare: "..x...x.",
    hiHat: "xxxxxxxx",
  };
  playDrums(drumPattern);
});
