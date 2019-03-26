const $ = require('jquery');
const notes = require('./notes');
const vex = require('./vex');

const { pickClef, pickNote, pickOctave } = notes;
const { initializeStaff, generateNote } = vex;

const setAnswerConfirmation = (text) => {
  $('#answer-confirmation').text(text);
}

// Handles selection of clefs
$(document).ready(() => {
  const bassClef = 'bass';
  const trebleClef = 'treble';
  const pickNoteMessage = 'Pick the note from the staff below:';
  const context = initializeStaff();
  var availableClefs = [bassClef, trebleClef];
  var clef = pickClef(availableClefs);
  var note = pickNote();

  generateNote(context, clef, note, pickOctave(clef));
  setAnswerConfirmation(pickNoteMessage)

  $('#clef-selector input[type=checkbox]').change((event) => {
    const selectedClef = event.currentTarget.id;
    const otherClef = selectedClef === trebleClef ? bassClef : trebleClef;
    const otherClefToggle = document.querySelector(`#${otherClef}`);
    const clefToggleLabelClasses = otherClefToggle.parentElement.classList;

    if (event.currentTarget.checked) {
      otherClefToggle.removeAttribute('disabled');
      clefToggleLabelClasses.remove('is-disabled');
      availableClefs = [...availableClefs, selectedClef];
    } else {
      otherClefToggle.setAttribute('disabled', '');
      clefToggleLabelClasses.add('is-disabled');
      availableClefs = availableClefs.filter(clef => clef !== selectedClef);
    }
  });

  // Handles generating a new note for the staff
  $('#generate').click((event) => {
    clef = pickClef(availableClefs);
    note = pickNote();
    generateNote(context, clef, note, pickOctave(clef));
    setAnswerConfirmation(pickNoteMessage);
  });

  // Handles button clicks from the list of answers
  $('#answer-chooser button').click((event) => {
    const selectedAnswer = event.currentTarget.id;

    if (selectedAnswer === note) {
      setAnswerConfirmation('Correct! Try another:');
      clef = pickClef(availableClefs);
      note = pickNote();
      generateNote(context, clef, note, pickOctave(clef));
    } else {
      setAnswerConfirmation('Incorrect. Try again?');
    }
  });
});
