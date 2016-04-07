import {Component, Inject, Input, OnInit, OnDestroy, ChangeDetectionStrategy} from 'angular2/core';
import {animate, style} from 'angular2/animate';
import {Samples} from './samples.service';

@Component({
  selector: 'chime',
  template: `
    <div *ngIf="true"
         class="chime {{chime.note}}"
         [class.remote]="remote"
         [style.left]="(chime.x - 300) + 'px'"
         [style.top]="(chime.y - 300) + 'px'">
    </div>
  `,
  styles: [require('./chime.component.css').toString()],
  animations: {
    ngEnter: [
      style({opacity: 1, transform: 'scale3d(0.015,0.015,0.015) translateZ(0)', 'filter': 'blur(0px)'}),
      animate({opacity: 0, transform: 'scale3d(1,1,1) translateZ(0)', 'filter': 'blur(10px)'}, '5s 0.1s cubic-bezier(0,.79,.13,.71)')
    ]
  },
  changeDetection: ChangeDetectionStrategy.CheckOnce
})
export class Chime implements OnInit, OnDestroy {
  @Input() chime:{x: number, y: number, note: string, state: string};
  @Input() remote:boolean;
  source:AudioBufferSourceNode;
  pan:StereoPannerNode;

  constructor(private samples:Samples,
              @Inject('audioContext') private audioCtx) {
  }

  ngOnInit() {
    if (this.chime.state === 'chiming') {
      this.samples.sampleCache.chimes[this.chime.note].first().subscribe(sample => {
        this.source = this.audioCtx.createBufferSource();
        this.source.buffer = sample;

        this.pan = this.audioCtx.createStereoPanner();
        this.pan.pan.value = (this.chime.x / 1280) * 2 - 1;

        this.source.connect(this.pan);
        this.pan.connect(this.audioCtx.destination);

        this.source.start();
      });
    }
  }

  ngOnDestroy() {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.pan.disconnect();
    }
  }

}
