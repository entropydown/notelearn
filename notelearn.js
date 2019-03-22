const Vex = require('vexflow');
const $ = require('jquery');

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("display");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(100, 200);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

function generateAndDisplayNote() {
  const octave = Math.max(Math.floor(Math.random() * 6), 4);
  const noteIndex = Math.floor(Math.random() * 7);
  const noteBag = ["a", "b", "c", "d", "e", "f", "g"];

  const pickedNote = noteBag[noteIndex];
  const finalNote = `${pickedNote}/${octave}`;

  // Create a stave of width 400 at position 10, 40 on the canvas.
  var stave = new VF.Stave(10, 40, 100);

  // Add a clef and time signature.
  stave.addClef("treble").addTimeSignature("1/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  var notes = [
    new VF.StaveNote({clef: "treble", keys: [finalNote], duration: "q"}),
  ];

  var voice = new VF.Voice({num_beats: 1, beat_value: 4});
  voice.addTickables(notes);

  var formatter = new VF.Formatter().joinVoices([voice]).format([voice]);

  voice.setStave(stave);
  voice.draw(context, stave);
  return pickedNote;
}

var clef = "treble"
var target = generateAndDisplayNote();
$('#answer-confirmation').text('determine note');

$("button").click(function(event) {
  if (this.id === target) {
    //alert('correct!');
    $('#answer-confirmation').text('correct! try another:');
    context.svg.removeChild(context.svg.lastChild);
    target = generateAndDisplayNote();
  } else if (this.id === "generate") {
    context.svg.removeChild(context.svg.lastChild);
    target = generateAndDisplayNote();
    $('#answer-confirmation').text('determine note');
  } else {
    //alert('incorrect!');
    $('#answer-confirmation').text('incorrect. try again!');
  }
  console.log(this.id);
});

