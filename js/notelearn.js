// const Vex = require('vexflow');
const $ = require('jquery');
const notes = require('./notes');
const vex = require('./vex');

const { pickNote, pickOctave } = notes;
const { initializeStaff, generateNote, clearStaff } = vex;

function setAnswerConfirmation(text) {
  $('#answer-confirmation').text(text);
}

const clef = 'treble';
const context = initializeStaff();
const pickNoteMessage = 'Pick the note from the staff below:';

var displayedNote = pickNote();
generateNote(context, clef, displayedNote, pickOctave());
setAnswerConfirmation(pickNoteMessage)

// Handles generating a new note for the staff
$('#generate').click((event) => {
  clearStaff(context);
  displayedNote = pickNote();
  generateNote(context, clef, displayedNote, pickOctave());
  setAnswerConfirmation(pickNoteMessage);
});

// Handles button clicks from the list of answers
$('#answer-chooser button').click((event) => {
  const selectedAnswer = event.currentTarget.id;

  if (selectedAnswer === displayedNote) {
    setAnswerConfirmation('Correct! Try another:');
    clearStaff(context);
    displayedNote = pickNote();
    generateNote(context, clef, displayedNote, pickOctave());
  } else {
    setAnswerConfirmation('Incorrect. Try again!');
  }
});
