/*

https://jsfiddle.net/Ln76ysjv/166/
https://twitter.com/hashtag/vexflow

*/
function start(e) {

	// Basic setup boilerplate for using VexFlow with the SVG rendering context:
	VF = Vex.Flow;
	width = document.body.clientWidth;
	height = document.body.clientHeight;

	console.log(width)

	// Create an SVG renderer and attach it to the DIV element named "boo".
	var div = document.getElementById("boo");
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

	// Configure the rendering context.
	renderer.resize(width, height*0.3);
	var context = renderer.getContext();

	// A tickContext is required to draw anything that would be placed
	// in relation to time/rhythm, including StaveNote which we use here.
	// In real music, this allows VexFlow to align notes from multiple
	// voices with different rhythms horizontally. Here, it doesn't do much
	// for us, since we'll be animating the horizontal placement of notes, 
	// but we still need to add our notes to a tickContext so that they get
	// an x value and can be rendered.
	//
	// If we create a voice, it will automatically apply a tickContext to our
	// notes, and space them relative to each other based on their duration &
	// the space available. We definitely do not want that here! So, instead
	// of creating a voice, we handle that part of the drawing manually.
	var tickContext = new VF.TickContext();
	var stave = new VF.Stave(width*0.1, height*0.05, width*0.8)
	.addClef('treble')
	.addTimeSignature("4/4");

	/*var stave2 = new VF.Stave(10, 100, 900)
	.addClef('bass');
	stave2.setContext(context).draw();*/

	// Connect it to the rendering context and draw!
	stave.setContext(context).draw();

	document.getElementById('start').addEventListener('click',(e)=>{
	//c4的int_value為60
		var notes = [
			['b', '', '4', 'qr'],
			['b', '', '4', 'qr'],
			['g', '', '4', '8d'],
			['c', '', '5', '8'],
			['b', '', '4', '8'],
			['g', '', '4', '8'],
			['c', '', '4', '1'],
			// ['g', '', '4'],
			// ['d', '', '4'],
			// ['e', '', '4'],
			// ['e', '', '4'],
			// ['e', '', '4'],
			// ['g', '', '4'],
			// ['c', '', '5'],
			// ['b', '', '4'],
			// ['g', '', '4'],
			// ['c', '', '4'],
			// ['g', '', '4'],
			// ['d', '', '4'],
			// ['e', '', '4'],
			// ['f', '', '4'],
			// ['e', '', '4'],
			// ['g', '', '4'],
			// ['d', '', '5'],
			// ['c', '', '5'],
			// ['b', '', '4'],
			// ['c', '', '5'],
			// ['d', '', '5'],
			// ['e', '', '5'],
			// ['c', '', '5'],
			// ['a', '', '4'],
			// ['b', '', '4'],
			// ['c', '', '5'],
			// ['g', '', '4'],
			// ['g', '', '4'],
			// ['f', '', '4'],
			// ['e', '', '4'],
			// ['d', '', '4'],
			// ['c', '', '4'],
			// ['c', '', '4'],
			// ['d', '', '4']
	
		].map(([letter, acc, octave, durations]) => {
			const note = new VF.StaveNote({
				clef: 'treble',
				keys: [`${letter}${acc}/${octave}`],
				duration: `${durations}`,
			})
			.setContext(context)
			.setStave(stave);
			if(acc) note.addAccidental(0, new VF.Accidental(acc));
			tickContext.addTickable(note)
			return note;
	
		});
		console.log(notes[1])
		tickContext.preFormat().setX(width*0.7);
		const visibleNoteGroups = [];
		setInterval(() => {
			note = notes.shift();
			if(!note) return;
			const group = context.openGroup();
			visibleNoteGroups.push(group);
			note.draw();
			context.closeGroup();
			group.classList.add('scroll');
			const box = group.getBoundingClientRect();
			group.classList.add('scrolling');
	
			// If a user doesn't answer in time make the note fall below the staff
			window.setTimeout(() => {
				const index = visibleNoteGroups.indexOf(group);
				if(index === -1) return;
				group.classList.add('too-slow');
				visibleNoteGroups.shift();
			}, 5000);
		}, 1000);
	})
}


/*
https://www.w3schools.com/jsref/met_document_addeventlistener.asp

document.addEventListener(event, function, useCapture)

true - The event handler is executed in the capturing phase
false- Default. The event handler is executed in the bubbling phase
*/
window.addEventListener( "load", start, false );
