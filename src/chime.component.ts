import {Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy} from 'angular2/core';
import {style, animate} from 'angular2/src/animate/worker/animation_definition';
import {Samples} from './samples.service';

@Component({
  selector: 'chime',
  template: `
    <div *ngIf="true"
         class="chime {{chime.note}}"
         [style.left]="chime.x + 'px'"
         [style.top]="chime.y + 'px'">
    </div>
  `,
  styles: [require('./chime.component.css').toString()],
  animations: {
    ngEnter: [
      style('.first'),
      animate('.gone', '5s 0.1s ease-out')
    ]
  },
  changeDetection: ChangeDetectionStrategy.CheckOnce
})
export class Chime implements OnInit, OnDestroy {
  @Input() chime:{x: number, y: number, note: string};
  source:AudioBufferSourceNode;
  pan:StereoPannerNode;

  constructor(private samples:Samples,
              private audioCtx:AudioContext) {
  }

  ngOnInit() {
    this.samples.sampleCache[this.chime.note].first().subscribe(sample => {
      this.source = this.audioCtx.createBufferSource();
      this.source.buffer = sample;

      this.pan = this.audioCtx.createStereoPanner();
      this.pan.pan.value = (this.chime.x / 1280) * 2 - 1;

      this.source.connect(this.pan);
      this.pan.connect(this.audioCtx.destination);

      this.source.start();
    });
  }

  ngOnDestroy() {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.pan.disconnect();
    }
  }

  getNoteFrequency() {
    switch (this.chime.note) {
      case 'C':
        return 261.63;
      case 'D':
        return 293.66;
      case 'E':
        return 329.63;
      case 'G':
        return 392.00;
      case 'A':
        return 440.00;
    };
  }

}
