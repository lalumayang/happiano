

function start(e) {
	VF = Vex.Flow;
	width = document.body.clientWidth;
	height = document.body.clientHeight;


	var div = document.getElementById("boo");
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

	renderer.resize(width, height*0.3);
	var context = renderer.getContext();

	var tickContext = new VF.TickContext();
	var stave = new VF.Stave(width*0.1, height*0.05, width*0.8)
	.addClef('treble')
	.addTimeSignature("4/4");

	var stave2 = new VF.Stave(width*0.1, height*0.15, width*0.8)
	.addClef('bass')
	.addTimeSignature("4/4");

	stave.setContext(context).draw();
	stave2.setContext(context).draw();
	
	//大括弧 
	var connector = new VF.StaveConnector(stave,stave2);
	var line = new VF.StaveConnector(stave, stave2);
	connector.setType(VF.StaveConnector.type.BRACE);
	connector.setContext(context);
	line.setType(VF.StaveConnector.type.SINGLE);
	line.setContext(context);
	connector.draw();
	line.draw();
	
	document.getElementById('start').addEventListener('click',(e)=>{
	//c4的int_value為60
	var formatter = new VF.Formatter();
		var notes = [
			['c', '', '4', '4'],
			['d', '', '4', '4'],
			['c', '', '4', '4'],
			['e', '', '4', '4'],
			['c', '', '4', '4'],
			['f', '', '4', '4'],
			['c', '', '4', '4'],
			['g', '', '4', '4'],
			['c', '', '4', '1']
		].map(([letter, acc, octave, durations]) => {
			const note = new VF.StaveNote({
				clef: 'treble',
				keys: [`${letter}${acc}/${octave}`],
				duration: `${durations}`,
			})
			.setContext(context)
			.setStave(stave);
			if(acc) note.addAccidental(0, new VF.Accidental(acc));
			tickContext.addTickable(note);

			return note;
		});
		tickContext.preFormat().setX(width*0.7);
		const visibleNoteGroups = [];
		setInterval(() => {
			note = notes.shift();
			if(!note) return;
			const group = context.openGroup();
			visibleNoteGroups.push(group);
			note.draw();
			let note_temp=this.note;
			let keys = note_temp.keys[0];
			context.closeGroup();
			group.classList.add('scroll');
			const box =group.getBoundingClientRect();
			group.classList.add('scrolling');
			group.style.setProperty("--time",(width*0.7)/80+"s"); 

			window.setTimeout(() => {
				let pitch = document.getElementById("tone").value;
				var id = note_temp.attrs.id;
				console.log(keys[0])
				console.log(pitch[0]);
				if(pitch[0]==keys[0]){
					console.log("same!!!" + id);
					$("g #vf-"+id+" path").attr("fill","#12ca3a");
					$("g #vf-"+id+" path").attr("stroke","#12ca3a");
				}
				else{
					console.log("different!!!" + id);
					$("g #vf-"+id+" path").attr("fill","red");
					$("g #vf-"+id+" path").attr("stroke","red");
				}
				const index = visibleNoteGroups.indexOf(group);
				if(index === -1) return;
				group.classList.add('too-slow');
				visibleNoteGroups.shift();
			}, (width*0.7)/80*1000);
		}, 1500);//控制音符之間距離
	})
}

/*
https://www.w3schools.com/jsref/met_document_addeventlistener.asp

document.addEventListener(event, function, useCapture)

true - The event handler is executed in the capturing phase
false- Default. The event handler is executed in the bubbling phase
*/
window.addEventListener( "load", start, false );
