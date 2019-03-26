const Tonal = require('tonal');
const Scale = Tonal.Scale;
const Key = Tonal.Key;

const pickClef = (clefs) => {
  const numClefs = clefs.length;
  const clefIndex = Math.floor(Math.random() * numClefs);

  return clefs[clefIndex];
};

const pickNote = (key) => {
  const notes = Scale.notes(key);
  const numNotes = notes.length;

  const noteIndex = Math.floor(Math.random() * numNotes);

  return notes[noteIndex];
};

const toVexKey = (key) => {
  const [tonic, mode] = Key.tokenize(key);

  switch (mode) {
    case 'major':
      return `${tonic}`
    case 'minor':
      return `${tonic}m`
  };
}

const pickOctave = (clef) => {
  if (clef === 'bass') {
    return Math.floor((Math.random() * 4) + 1);
  }

  return Math.floor((Math.random() * 4) + 3);
};

const pickKeySignature = () => {
  const keySignatures = ['C major',
  'A minor',
  'F major',
  'D minor',
  'Bb major',
  'G minor',
  'Eb major',
  'C minor',
  'Ab major',
  'F minor',
  'Db major',
  'Bb minor',
  'Gb major',
  'Eb minor',
  'Cb major',
  'Ab minor',
  'G major',
  'E minor',
  'D major',
  'B minor',
  'A major',
  'F# minor',
  'E major',
  'C# minor',
  'B major',
  'G# minor',
  'F# major',
  'D# minor',
  'C# major',
  'A# minor']
  const numKeySignatures = keySignatures.length

  const keySignatureIndex = Math.floor(Math.random() * numKeySignatures);

  return keySignatures[keySignatureIndex];
}

module.exports = {
  pickClef,
  pickNote,
  pickOctave,
  pickKeySignature,
  toVexKey
};
