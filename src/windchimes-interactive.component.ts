import {Component, Inject, HostListener, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Random} from './random.service';
import {Spacial} from './spacial.service';
import {Remote} from './remote.service';
import {Samples} from './samples.service';
import {Chime} from './chime.component';
import {ThankYou} from './thank-you.component';
import {ForAnyOrder} from './forAnyOrder.directive';
import { Audio } from './audio.service';

@Component({
  selector: 'windchimes-interactive',
  template: `
    <div class="muted-indicator" *ngIf="muted"></div>
    <div class="hint click-hint" *ngIf="!clicked && !isDone()">click anywhere</div>
    <div class="hint touch-hint" *ngIf="!clicked && !isDone()">touch anywhere</div>
    <chime *forAnyOrder="let chime of chimes | async"
           [chime]=chime>
    </chime>
    <thank-you *ngIf="isDone()">
    </thank-you>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, ForAnyOrder, ThankYou]
})
export class WindchimesInteractive {
  clicks = new Subject<{
    x: number, y: number,
    screenHeight: number
  }>();
  noteSampler = this.spacial.sampler(this.notes, true);
  chimes = this.clicks.map(({x, y, screenHeight}) => ({
    x,
    y,
    note: this.noteSampler(y, screenHeight),
    state: 'chiming',
    muted: this.muted
  }))
    .bufferTime(5000, 10);

  clicked = false;
  state: string;
  muted: boolean;

  constructor(private random: Random,
    private audio: Audio,
    private spacial: Spacial,
    private remote: Remote,
    private samples: Samples,
    @Inject('notes') private notes,
    @Inject('audioContext') private audioCtx) {
    remote.controlEvents().subscribe(state => {
      this.state = state.state;
      this.muted = state.muted;
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.clicked) {
      // unlock audio on ios
      const src = this.audioCtx.createBufferSource();
      src.buffer = this.audioCtx.createBuffer(1, 1, 22050);
      src.connect(this.audioCtx.destination);
      src.start(0);
    }
    this.clicked = true;
    if (!this.isDone()) {
      this.clicks.next({
        x: event.clientX, y: event.screenY, screenHeight: window.screen.availHeight
      });
    }
  }

  isDone() {
    return this.state === 'done';
  }
}
