import {Component, Inject, Input, OnInit, OnDestroy} from 'angular2/core';
import {animation, state, transition, animate, style, group} from 'angular2/animate';
import {Samples} from './samples.service';
import {Audio} from './audio.service';

@Component({
  selector: 'chime',
  template: `
    <div class="ring {{chime.note}}"
         animate-expand="state"
         [style.left.px]="chime.x - 300"
         [style.top.px]="chime.y - 300">
    </div>
    <div class="light"
         animate-flash="wat"
         [style.left.px]="chime.x - 300"
         [style.top.px]="chime.y - 300">
    </div>
  `,
  styles: [require('./chime.component.css').toString()],
  animations: [
    animation('expand', [
      transition('void => lol', [
        style({opacity: 1, transform: 'scale3d(0.01,0.01,0.01) translateZ(0)'}),
        animate('5s ease-in', style({opacity: 0, transform: 'scale3d(1,1,1) translateZ(0)'}))
        /*group([
          animate('5s', style({opacity: 0})),
          animate('5s', style({transform: 'scale3d(1,1,1) translateZ(0)'}))
        ])*/
      ])/*
      state('void', style({opacity: 1, transform: 'scale3d(0.01,0.01,0.01) translateZ(0)'})),
      transition('void => *', [
        style(':void'),
        group([
          animate('5s ease-out', style({opacity: 0})),
          animate('4.9s 0.1s cubic-bezier(0,.79,.13,.71)', style({
            transform: 'scale3d(1,1,1) translateZ(0)'
          }))
        ])
      ])*/
    ]),
    animation('flash', [
      state('void', style({opacity: 1, transform: 'scale3d(0.1,0.1,0.1) translateZ(0)'})),
      /*transition('void => *', [
        style(':void'),
        animate('0.05s ease-in', style({opacity: 1, transform: 'scale3d(1,1,1) translateZ(0)'})),
        animate('1s ease-out', style({opacity: 0, transform: 'scale3d(0,0,0) translateZ(0)'}))
      ])*/
    ])
  ]
})
export class Chime implements OnInit, OnDestroy {
  @Input() chime:{x: number, y: number, note: string, state: string, muted: boolean};
  stopAudio:Function;
  started:boolean;

  constructor(private samples:Samples,
              private audio:Audio) {
  }

  ngOnInit() {
    if (this.chime.state === 'chiming') {
      if (this.chime.muted) {
        setTimeout(() => this.started = true, 0);
      } else {
        this.samples.getSample(this.chime.note).then(sample => {
          this.stopAudio = this.audio.play(sample, (this.chime.x / 1280) * 2 - 1);
          this.started = true;
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.stopAudio) {
      this.stopAudio();
    }
  }

  get state() {
    return 'lol';
  }



}
