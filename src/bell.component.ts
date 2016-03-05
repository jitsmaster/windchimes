import {Component, Input, OnInit, OnDestroy} from 'angular2/core';
import {Samples} from './samples.service';

@Component({
  selector: 'bell',
  template: `
    <div class="bell {{bell.note}}"
         [style.transform]="getTransform()"
         [style.opacity]="getOpacity()">
    </div>
  `,
  styles: [require('./bell.component.css').toString()]
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

  getTransform() {
    const translate = `translate3d(${this.bell.x}px, ${this.bell.y}px, 0)`;
    const scale = this.fade ? 'scale3d(100, 100, 100)' : 'scale3d(1, 1, 1)';
    return `${translate} ${scale}`;
  }

  getOpacity() {
    return this.fade ? 0 : 0.7;
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
