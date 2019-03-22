const notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const numNotes = notes.length - 1;

const pickNote = () => {
  const noteIndex = Math.floor(Math.random() * numNotes);

  return notes[noteIndex];
};

const pickOctave = () => {
  return Math.max(Math.floor(Math.random() * 6), 4);
};

module.exports = {
  pickNote,
  pickOctave,
};
