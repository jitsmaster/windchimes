import {Component, Inject, HostListener, EventEmitter} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Random} from './random.service';
import {Remote} from './remote.service';
import {Samples} from './samples.service';
import {Chime} from './chime.component';
import {ThankYou} from './thank-you.component';
import {ForAnyOrder} from './forAnyOrder.directive';

@Component({
  selector: 'windchimes-interactive',
  template: `
    <div class="hint click-hint" *ngIf="!clicked && !isDone()">click anywhere</div>
    <div class="hint touch-hint" *ngIf="!clicked && !isDone()">touch anywhere</div>
    <chime *forAnyOrder="#chime of chimes"
           [chime]=chime>
    </chime>
    <thank-you *ngIf="isDone()">
    </thank-you>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, ForAnyOrder, ThankYou]
})
export class WindchimesInteractive {
  clicks = new Subject<{x: number, y: number}>();
  chimes:any[];
  clicked = false;
  state:string;

  constructor(random:Random, remote: Remote, samples:Samples, @Inject('notes') notes) {
    const noteSampler = random.sampler(notes);
    this.chimes = [];
    this.clicks.map(({x, y}) => ({
        x,
        y,
        note: noteSampler(),
        state: 'chiming'
      })).subscribe(chime => {
        this.chimes.unshift(chime);
        if (this.chimes.length > 20) {
          this.chimes.length = 20;
        }
      });
    remote.controlEvents().subscribe(state => {
      this.state = state.state;
    });
  }

  @HostListener('click', ['$event'])
  onClick(event:MouseEvent) {
    this.clicked = true;
    if (!this.isDone()) {
      this.clicks.next({x: event.clientX, y: event.clientY});
    }
  }

  isDone() {
    return this.state === 'done';
  }
}
