function start(e) {
	VF = Vex.Flow;
	width = document.body.clientWidth;
	height = document.body.clientHeight;


	var div = document.getElementById("boo");
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

	renderer.resize(width, height*0.5);
	var context = renderer.getContext();

	var tickContext = new VF.TickContext();
	var stave = new VF.Stave(width*0.1, height*0.05, width*0.8)
	.addClef('treble')
	.addTimeSignature("4/4");

	var stave2 = new VF.Stave(width*0.1, height*0.1, width*0.8)
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
			['e', '', '4', '4'],
			['c', '', '4', '4'],
			['c', '', '4', '4'],
			['d', '', '4', '4'],
			['e', '', '4', '4'],
			['c', '', '4', '4'],
			['e', '', '4', '4'],
			['f', '', '4', '4'],
			['g', '', '4', '2'],
			['e', '', '4', '4'],
			['f', '', '4', '4'],
			['g', '', '4', '2'],
			['f', '', '4', '8'],
			['g', '', '4', '8'],
			['f', '', '4', '8'],
			['e', '', '4', '8'],
			['d', '', '4', '4'],
			['c', '', '4', '4'],
			['f', '', '4', '8'],
			['g', '', '4', '8'],
			['f', '', '4', '8'],
			['e', '', '4', '8'],
			['d', '', '4', '4'],
			['c', '', '4', '4'],
			['e', '', '4', '4'],
			['g', '', '3', '4'],
			['c', '', '4', '2'],
			['e', '', '4', '4'],
			['g', '', '3', '4'],
			['c', '', '4', '2']
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
		
		var beams = VF.Beam.generateBeams(notes);
		Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
		beams.forEach(function(b) {b.setContext(context).draw()})
		var count=0;
		var total=0;
		var total_socre=0;
		
		window.setInterval(() => {
			note = notes.shift();
			let note_temp=this.note;
			let pitch = document.getElementById("tone").value;
			let keys = note_temp.keys[0];
			var id = note_temp.attrs.id;
			console.log(keys[0]);
			console.log(pitch[0]);
			if(pitch[0]==keys[0]){
				console.log("same!!!" + id);
				count=1;
			}
			else{
				console.log("different!!!" + id);
				count=0;
			}
			
			total=total+count;//答對幾個
			total_socre=(total/32)*100;//答對率 百分比
			document.getElementById("1").value=total_socre;
			// alert(total_socre);
			console.log(total_socre);
		}, 100);clef();
	})
	
}
window.addEventListener( "load", start, false );
