export class Text {
	sampleText = `The GainNode interface represents a change in volume. It is an AudioNode audio-processing module that causes a given gain to be applied to the input data before its propagation to the output. A GainNode always has exactly one input and one output, both with the same number of channels.

The gain is a unitless value, changing with time, that is multiplied to each corresponding sample of all input channels. If modified, the new gain is applied using a de-zippering algorithm in order to prevent unaesthetic 'clicks' from appearing in the resulting audio.

The GainNode is increasing the gain of the output.

Number of inputs	1
Number of outputs	1
Channel count mode	"max"
Channel count	2 (not used in the default count mode)
Channel interpretation	"speakers"
Properties
Inherits properties from its parent, AudioNode.

GainNode.gain Read only
Is an a-rate AudioParam representing the amount of gain to apply.
Methods
No specific method; inherits methods from its parent, AudioNode.

Example
The following example shows basic usage of an AudioContext to create a GainNode, which is then used to mute and unmute the audio when a Mute button is clicked by changing the gain property value.

The below snippet wouldn't work as is — for a complete working example, check out our Voice-change-O-matic demo (view source.)

<div>
  <a class="mute">Mute button</a>
</div>
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
var mute = document.querySelector('.mute');
var source;

if (navigator.getUserMedia) {
 navigator.getUserMedia (
   // constraints - only audio needed for this app
   {
     audio: true
   },

   // Success callback
   function(stream) {
     source = audioCtx.createMediaStreamSource(stream);

   },

   // Error callback
   function(err) {
     console.log('The following gUM error occured: ' + err);
   }
  );
} else {
   console.log('getUserMedia not supported on your browser!');
}

source.connect(gainNode);
gainNode.connect(audioCtx.destination);

  ...

mute.onclick = voiceMute;

function voiceMute() {
  if(mute.id == "") {
    gainNode.gain.value = 0;
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.gain.value = 1;
    mute.id = "";
    mute.innerHTML = "Mute";
  }
}`;

	getSentences(str): string[] {
		return str.split(/(\n\n)|\.|\?/g)
			.filter(function (s) { return s && s.match(/\w+/); });
	}

	getWords(text: string): Map<string[], string[]> {
		var wordStats = new Map<string[], string[]>();

		for (var sentence of this.getSentences(text)) {
			var words = sentence.split(/\s+/)
				.map(function (w) {
					return w.replace(/^\W+/, '').replace(/\W+$/, '').toLowerCase();
				})
				.filter(w => { return !!w && !!w.length; });
			for (var i = 0; i < words.length - 2; i++) {
				var key = [words[i], words[i + 1]];
				var nxt = words[i + 2];

				if (wordStats.has(key)) {
					wordStats.get(key).push(nxt);
				} else {
					wordStats.set(key, [nxt]);
				}
			}
		}

		return wordStats;
	}
}