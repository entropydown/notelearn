const Vex = require('vexflow');

VF = Vex.Flow;

const initializeStaff = () => {
  const div = document.getElementById('display');
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  renderer.resize(100, 200);

  const context = renderer.getContext();
  context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

  return context;
};

// Generates and displays the note on the staff.
const generateNote = (context, clef, note, octave) => {
  const combined = `${note}/${octave}`;
  const stave = new VF.Stave(10, 40, 100);
  stave.addClef('treble').addTimeSignature('1/4');
  stave.setContext(context).draw();

  const notes = [
    new VF.StaveNote({clef: 'treble', keys: [combined], duration: 'q'}),
  ];

  const voice = new VF.Voice({num_beats: 1, beat_value: 4});
  voice.addTickables(notes);

  const formatter = new VF.Formatter().joinVoices([voice]).format([voice]);

  voice.setStave(stave);
  voice.draw(context, stave);
};

// Clears the latest note from the staff.
const clearStaff = (context) => {
  context.svg.removeChild(context.svg.lastChild);
}

module.exports = {
  clearStaff,
  initializeStaff,
  generateNote,
};
