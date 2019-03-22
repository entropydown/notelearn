const Vex = require('vexflow');
const $ = require('jquery');

VF = Vex.Flow;

const div = document.getElementById('display');
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(100, 200);
const context = renderer.getContext();
context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

// Clears the latest note from the staff.
function clearStaff() {
  context.svg.removeChild(context.svg.lastChild);
}

// Generates and displays the note on the staff.
// May want to split this up later depending on what we want to do...
function generateAndDisplayNote(clef) {
  const octave = Math.max(Math.floor(Math.random() * 6), 4);
  const noteIndex = Math.floor(Math.random() * 7);
  const notesBag = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  const pickedNote = notesBag[noteIndex];
  const finalNote = `${pickedNote}/${octave}`;

  const stave = new VF.Stave(10, 40, 100);
  stave.addClef('treble').addTimeSignature('1/4');
  stave.setContext(context).draw();

  const notes = [
    new VF.StaveNote({clef: 'treble', keys: [finalNote], duration: 'q'}),
  ];

  const voice = new VF.Voice({num_beats: 1, beat_value: 4});
  voice.addTickables(notes);

  const formatter = new VF.Formatter().joinVoices([voice]).format([voice]);

  voice.setStave(stave);
  voice.draw(context, stave);

  return pickedNote;
}

function setAnswerConfirmation(text) {
  $('#answer-confirmation').text(text);
}

const clef = 'treble';
const pickNoteMessage = 'Pick the note from the staff below:';
var displayedNote = generateAndDisplayNote(clef);

setAnswerConfirmation(pickNoteMessage)

// Handles generating a new note for the staff
$('#generate').click((event) => {
  clearStaff();
  displayedNote = generateAndDisplayNote(clef);
  setAnswerConfirmation(pickNoteMessage);
});

// Handles button clicks from the list of answers
$('#answer-chooser button').click((event) => {
  const selectedAnswer = event.currentTarget.id;

  if (selectedAnswer === displayedNote) {
    setAnswerConfirmation('Correct! Try another:');
    clearStaff();
    displayedNote = generateAndDisplayNote(clef);
  } else {
    setAnswerConfirmation('Incorrect. Try again!');
  }
});
