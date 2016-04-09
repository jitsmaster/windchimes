import {Component, Inject, Input, OnInit, OnDestroy, ChangeDetectionStrategy} from 'angular2/core';
import {animate, style, group} from 'angular2/animate';
import {Samples} from './samples.service';

@Component({
  selector: 'chime',
  template: `
    <div class="ring {{chime.note}}"
         [class.remote]="remote"
         [class.expanding]="source"
         [style.left.px]="chime.x - 300"
         [style.top.px]="chime.y - 300">
    </div>
    <div class="flash"
         [class.remote]="remote"
         [class.flashing]="source"
         [style.left.px]="chime.x - 300"
         [style.top.px]="chime.y - 300">
    </div>
  `,
  styles: [require('./chime.component.css').toString()],
  animations: {
    'addClass(expanding)': [
      style({opacity: 1, transform: 'scale3d(0.015,0.015,0.015) translateZ(0)'}),
      group([
        animate({opacity: 0}, '5s 0 ease-out'),
        animate({transform: 'scale3d(1,1,1) translateZ(0)'}, '4.9s 0.1s cubic-bezier(0,.79,.13,.71)')
      ])
    ],
    'addClass(flashing)': [
      style({opacity: 1, transform: 'scale3d(0.1,0.1,0.1) translateZ(0)'}),
      animate({opacity: 1, transform: 'scale3d(1,1,1) translateZ(0)'}, '0.05s ease-in'),
      animate({opacity: 0, transform: 'scale3d(0,0,0) translateZ(0)'}, '1s ease-out')
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
