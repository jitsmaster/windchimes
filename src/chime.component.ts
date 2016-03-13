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

  constructor(private samples:Samples,
              private audioCtx:AudioContext) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.samples.sampleCache.hasOwnProperty(this.chime.note)) {
        this.source = this.audioCtx.createBufferSource();
        this.source.buffer = this.samples.sampleCache[this.chime.note];
        this.source.connect(this.audioCtx.destination);
        this.source.start();
      }
    }, 200);
  }

  ngOnDestroy() {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
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