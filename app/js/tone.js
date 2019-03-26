const Tone = require('tone');

const synth = new Tone.Synth().toMaster();

Tone.start()

const playNoteSound = (note, octave) => {
  const duration = '8n';
  synth.triggerAttackRelease(`${note}${octave}`, duration);
};

module.exports = {
  playNoteSound
}
