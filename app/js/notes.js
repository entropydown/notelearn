const notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const numNotes = notes.length;

const pickClef = (clefs) => {
  const numClefs = clefs.length;
  const clefIndex = Math.floor(Math.random() * numClefs);

  return clefs[clefIndex];
};

const pickNote = () => {
  const noteIndex = Math.floor(Math.random() * numNotes);

  return notes[noteIndex];
};

const pickOctave = (clef) => {
  if (clef === 'bass') {
    return Math.floor((Math.random() * 4) + 1);
  }

  return Math.floor((Math.random() * 4) + 3);
};

module.exports = {
  pickClef,
  pickNote,
  pickOctave,
};
