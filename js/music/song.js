// instruments
function makeDrums() {
  let reverb = new Tone.Reverb({
    decay: 1,
    wet: 0.3,
  }).toDestination();

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

  let kick = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 6,
    volume: -9,
  }).connect(reverb);

  return {
    hiHat,
    snare,
    kick,
  };
}

let drums = makeDrums();

let lowBass = new Tone.FMSynth({
  oscillator: {
    type: "triangle",
  },
  envelope: {
    attack: 0.0001,
    decay: 0.5,
    sustain: 0.3,
    release: 0.1,
  },
  volume: -3,
}).toDestination();

let highBass = new Tone.FMSynth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.0001,
    decay: 0.1,
    sustain: 0.3,
    release: 0.1,
  },
  volume: -9,
}).toDestination();

let chordSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "triangle",
  },
  volume: -12,
}).toDestination();

let sampler = new Tone.Sampler({
  urls: {
    C5: "trumpet-c5.mp3",
    D5: "trumpet-d5.mp3",
    F5: "trumpet-f5.mp3",
  },
  baseUrl: "https://skilldrick-jscc.s3.us-west-2.amazonaws.com/",
  attack: 0,
  release: 1,
  volume: -24,
}).toDestination();

// sequencing
function makeSequence(pattern) {
  return pattern.split("").map((value) => (value === "." ? null : value));
}

function makePipeSequence(pattern) {
  return pattern
    .split("|")
    .map((value) => (value.trim() === "" ? null : value));
}

let drumPattern = {
  hiHat: "x...x...",
  snare: "..x...x.",
  kick: "xxxxxxxx",
};

let hiHatSeq = new Tone.Sequence(
  (time) => {
    drums.hiHat.triggerAttackRelease("16n", time);
  },
  makeSequence(drumPattern.hiHat),
  "8n",
);

let snareSeq = new Tone.Sequence(
  (time) => {
    drums.snare.triggerAttackRelease("16n", time);
  },
  makeSequence(drumPattern.snare),
  "8n",
);

let kickSeq = new Tone.Sequence(
  (time) => {
    kick.triggerAttackRelease(50, "16n", time);
  },
  makeSequence(drumPattern.kick),
  "8n",
);

let lowBassSeq = new Tone.Sequence(
  (time, note) => {
    lowBass.triggerAttackRelease(note, "16n", time, 0.6);
  },
  makePipeSequence("G2| | |G2|G2| | | "),
  "8n",
);

let highBassSeq = new Tone.Sequence(
  (time, note) => {
    highBass.triggerAttackRelease(note, "16n", time, 0.3);
  },
  makePipeSequence("G3|F3|E3|D3|G2|D3|G3|D3"),
  "8n",
);

let chords = {
  1: ["D4", "G4"],
  2: ["E4", "G4"],
  3: ["C4", "E4", "G4"],
  4: ["D4", "F4", "A4"],
  5: ["B3", "F4", "G4"],
};

function playChord(time, chordName) {
  let notes = chords[chordName];
  chordSynth.triggerAttackRelease(notes, "16n", time, 0.6);
}

let chordSeq1 = new Tone.Sequence(
  (time, chordName) => {
    playChord(time, chordName);
  },
  makeSequence("1...2...3..4...31...2...3..4.343"),
  "8n",
);

let chordSeq2 = new Tone.Sequence(
  (time, chordName) => {
    playChord(time, chordName);
  },
  makeSequence("3...2...4..1.213"),
  "8n",
);

let trumperPart = new Tone.Part(
  (time, note) => {
    sampler.triggerAttackRelease(note, "1n", time);
  },
  [
    ["0:0:0", "G5"],
    ["0:2:0", "C5"],
    ["1:0:0", "G5"],
    ["2:0:0", "D5"],
    ["2:2:0", "C5"],
    ["3:0:0", "B4"],
    ["4:0:0", "G5"],
    ["4:2:0", "C5"],
    ["5:0:0", "G5"],
    ["6:0:0", "D5"],
    ["6:2:0", "C5"],
    ["7:0:0", "B4"],
    ["7:2:0", "D5"],
    ["8:0:0", "C5"],
    ["8:2:0", "E5"],
    ["9:0:0", "F5"],
    ["9:2:0", "D5"],
    ["10:0:0", "C5"],
    ["10:2:0", "E5"],
    ["11:0:0", "D5"],
    ["12:0:0", "C5"],
    ["12:2:0", "E5"],
    ["13:0:0", "F5"],
    ["13:2:0", "D5"],
    ["14:0:0", "C5"],
    ["14:2:0", "E5"],
    ["15:0:0", ["B4", "G5"]],
  ],
);

// song
hiHatSeq.start("0:0:0").stop("44:0:0");
snareSeq.start("0:0:0").stop("44:0:0");
kickSeq.start("0:0:0").stop("44:0:0");

lowBassSeq.start("0:0:0").stop("47:3:0");
highBassSeq.start("4:0:0").stop("47:3:0");

chordSeq1.start("8:0:0").stop("24:0:0");
chordSeq2.start("24:0:0").stop("32:0:0");
chordSeq1.start("32:0:0").stop("40:0:0");

trumperPart.start("16:0:0");

// event handling
let play = document.getElementById("play");
let playing = document.getElementById("playing");

play.addEventListener("click", () => {
  play.style.display = "none";
  playing.style = "";

  Tone.start();

  Tone.Transport.position = "0:0:0";
  Tone.Transport.start();
});
