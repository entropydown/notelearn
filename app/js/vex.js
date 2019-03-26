const Vex = require('vexflow');

VF = Vex.Flow;

const initializeStaff = () => {
  const div = document.getElementById('display');
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  renderer.resize(400, 400);

  const context = renderer.getContext();
  context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

  return context;
};

// Generates and displays the note on the staff.
const generateNote = (context, clef, note, octave, key) => {
  const numBeats = 1;
  const beatValue = 4;
  const combined = `${note}/${octave}`;
  const stave = new VF.Stave(10, 40, 300);

  context.clear();
  stave
    .addClef(clef)
    .addTimeSignature(`${numBeats}/${beatValue}`)
    .setContext(context)
    .addKeySignature(key)
    .draw();

  const notes = [
    new VF.StaveNote({clef, keys: [combined], duration: 'q'}),
  ];

  const voice = new VF.Voice({num_beats: numBeats, beat_value: beatValue});
  voice.addTickables(notes);

  const formatter = new VF.Formatter().joinVoices([voice]).format([voice]);

  voice.setStave(stave);
  voice.draw(context, stave);
};

module.exports = {
  initializeStaff,
  generateNote,
};
