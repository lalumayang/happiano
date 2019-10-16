var chromatic = [
   ["a"],
   ["a#", "bb"],
   ["b"],
   ["c"],
   ["c#", "db"],
   ["d"],
   ["d#", "eb"],
   ["e"],
   ["f"],
   ["f#", "gb"],
   ["g"],
   ["g#", "ab"],
  ];

var canvasContext = null;
var canvasWidth = 0;
var canvasHeight = 0;

var active = false;

var context = null;
var mediaStreamSource = null;
var processor = null;
var analyser = null;
var savedEvent = null;

var handleSuccess = function (stream) {
    context = new AudioContext();
    mediaStreamSource = context.createMediaStreamSource(stream);
    processor = context.createScriptProcessor(0, 1, 1);
    mediaStreamSource.connect(processor);
    processor.connect(context.destination);

    analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.5;
    analyser.minDecibels = -80;
    analyser.maxDecibels = -10;
    analyser.connect(processor);
    console.log(context.sampleRate / analyser.fftSize);

    mediaStreamSource.connect(analyser);
};

function start() {
    navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
        .then(handleSuccess)
        .catch(console.log("no"));
    active = true;


    draw();
}

// function stop() {
//  active = false;
//  context = null;
//  if(mediaStreamSource != null) {
//   for(var index in mediaStreamSource.mediaStream.getTracks()) {
//    mediaStreamSource.mediaStream.getTracks()[index].stop();
//   }
//   mediaStreamSource = null;
//  }
//  if(processor != null) {
//   processor.disconnect();
//   processor = null;
//  }
//  if(analyser != null) {
//   analyser.disconnect();
//   analyser = null;
//  }
// }

var canvasContext = null;
var canvasWidth = 0;
var canvasHeight = 0;

function draw() {
    if (canvas == null) {
        var canvas = document.getElementById("display");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        canvasContext = canvas.getContext("2d");
    }

    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    if (active) {
        if (analyser != null) {
            var bins = analyser.frequencyBinCount;
            var binWidth = canvasWidth / bins;
            var unitBinHeight = canvasHeight / 255;

            var binFreqInterval = context.sampleRate / bins;

            var spectrum = new Uint8Array(bins);

            analyser.getByteFrequencyData(spectrum);
            // console.log(spectrum)
            var maxVal = null;
            var maxIndex = 0;
            for (var i in spectrum) {
                if (maxVal == null || maxVal < spectrum[i]) {
                    maxVal = spectrum[i];
                    maxIndex = i;
                }
            }
            // console.log("max: "+maxVal)
            var binRange = context.sampleRate / analyser.fftSize;
            var min = maxIndex * binRange;
            var max = min + binRange;

            // canvasContext.strokeStyle = "black";
            // var middle = binWidth * maxIndex + binWidth / 2;
            // canvasContext.beginPath();
            // canvasContext.moveTo(middle, 0);
            // canvasContext.lineTo(middle, canvasHeight);
            // canvasContext.stroke();

            var mean = (max + min) / 2;
            var C4 = 261.626;
            var constant = Math.pow(2, 1 / 12);

            var halfSteps = Math.round(12 * Math.log2(mean / C4) / Math.log2(2));

            // console.log("halfstep: "+halfSteps);

            var index = (3 + halfSteps) % chromatic.length;
            if (index < 0) {
                index += chromatic.length;
            }
            noteValue = chromatic[index];
            document.getElementById("tone").value = noteValue;
        }

        window.requestAnimationFrame(draw);
    }
}
