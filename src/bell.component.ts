import {Component, Input, OnInit, OnDestroy} from 'angular2/core';
import {css} from 'angular2/src/animate/worker/animation_definition';
import {Samples} from './samples.service';

@Component({
  selector: 'bell',
  template: `
    <div *ngIf="true"
         class="bell {{bell.note}}"
         [style.left]="bell.x + 'px'"
         [style.top]="bell.y + 'px'">
    </div>
  `,
  styles: [require('./bell.component.css').toString()],
  animations: {
    'ng-enter': [
      css('.first', '0s'),
      css('.gone', '5s ease-out')
    ]
  },
  animationStyles: {
    '.first': [
      ['all', {
        opacity: '0.7',
        transform: 'scale3d(1, 1, 1)'
      }]
    ],
    '.gone': [
      ['all', {
        opacity: '0',
        transform: 'scale3d(100, 100, 100)'
      }]
    ]
  }
})
export class Bell implements OnInit, OnDestroy {
  @Input() bell:{x: number, y: number, note: string};
  fade:boolean;
  source:AudioBufferSourceNode;

  constructor(private samples:Samples,
              private audioCtx:AudioContext) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.fade = true;
      if (this.samples.sampleCache.hasOwnProperty(this.bell.note)) {
        this.source = this.audioCtx.createBufferSource();
        this.source.buffer = this.samples.sampleCache[this.bell.note];
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
    switch (this.bell.note) {
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
