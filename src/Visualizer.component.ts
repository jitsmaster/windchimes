import {Component, Inject, HostListener, Query, QueryList, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Audio } from './audio.service';
import { Samples } from './samples.service';

@Component({
	selector: 'visualizer',
	template: `
	<select (change)="select($event)"
		style="display:block">
		<option>[Select a song to play]</option>
		<option *ngFor="let name of sampleNames">{{name}}</option>
	</select>
	<button (click)="control()" style="display:block">Play/Pause</button>
    <canvas #can style="position:absolute;bottom:100"></canvas>
  `,
	providers: [
		Audio, Samples
	]
})
export class Visualizer {
	playHandler: Function;

	playing = false;

	sampleNames = ["AMERICA", "SUN_8", "SUN_7"];


	constructor(private audio: Audio,
		private samples: Samples,
		private ele: ElementRef) {
	}

	_name: string = "AMERICA";

	select(evt: Event) {
		this._name = evt.currentTarget["value"];

		if (!!this.playHandler)
			this.playHandler();

		this.audio.startTime = 0;
		this.audio.startOffset = 0;

		this._play();
	}

	_play() {
		if (!this._name)
			return;
		this.samples.getSample(this._name).then(sample => {
			this.playHandler = this.audio.playWithData(sample);
		});
	}

	ngOnInit() {
		this.audio.onPlaybackRequestAnimFrame.subscribe(freqs => {
			this.drawFrame(freqs);
		});

		this.ele.nativeElement.style.textAlign = "center";
	}
	ngOnDestroyy() {
		this.playHandler();
	}

	control() {
		if (this.playing)
			this.audio.pause();
		else
			this._play();

		this.playing = !this.playing;
	}

	drawFrame(stats: {
		freqs: Uint8Array,
		times: Uint8Array
	}) {
		if (!stats)
			return;

		var canvas = (this.ele.nativeElement as HTMLElement).querySelector('canvas') as HTMLCanvasElement;
		var w = Math.floor(window.screen.availWidth);
		canvas.width = w;
		canvas.height = 360;
		var drawContext = canvas.getContext('2d');

		var h = 360;

		// Draw the frequency domain chart.
		for (var i = 0; i < stats.freqs.length; i++) {
			var value = stats.freqs[i];
			var percent = value / 256;
			var height = h * percent;
			var offset = h - height - 1;
			var barWidth = w / stats.freqs.length;
			var hue = i / stats.freqs.length * 360;
			drawContext.fillStyle = 'hsl(' + hue + ', 85%, 80%)';
			drawContext.fillRect(i * barWidth, offset, barWidth, height);
		}

		for (var i = 0; i < stats.times.length; i++) {
			var value = stats.times[i];
			var percent = value / 256;
			var height = h * percent;
			var offset = h - height - 1;
			var barWidth = w / stats.times.length;
			drawContext.fillStyle = 'white';
			drawContext.fillRect(i * barWidth, offset, 1, 2);
		}
	}
}
