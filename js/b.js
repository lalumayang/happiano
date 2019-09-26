$(function() {
});

$(document).ready(function() {
});

function start(e) {
	VF = Vex.Flow;

	var div = document.getElementById("b");
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

	renderer.resize(600, 150);
	var context = renderer.getContext();

	var tickContext = new VF.TickContext();

	var stave = new VF.Stave(40, 5, 500)
  .addClef('treble')
  .addKeySignature('B')
  .addTimeSignature("4/4");
  
  stave.setContext(context).draw();
  
  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["b/3"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }).addAccidental(0, new VF.Accidental("#")),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }).addAccidental(0, new VF.Accidental("#")),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "q" }).addAccidental(0, new VF.Accidental("#")),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "q" }).addAccidental(0, new VF.Accidental("#")),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "q" }).addAccidental(0, new VF.Accidental("#")),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "q" })
  ];
  
  var beams = VF.Beam.generateBeams(notes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
  beams.forEach(function(b) {b.setContext(context).draw()})
}
window.addEventListener( "load", start, false );


