import {Component, Inject, HostListener, EventEmitter} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Random} from './random.service';
import {Samples} from './samples.service';
import {Chime} from './chime.component';
import {ForAnyOrder} from './forAnyOrder.directive';

@Component({
  selector: 'windchimes-interactive',
  template: `
    <chime *forAnyOrder="#chime of chimes"
           [chime]=chime>
    </chime>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, ForAnyOrder]
})
export class WindchimesInteractive {
  clicks = new Subject<{x: number, y: number}>();
  chimes:any[];

  constructor(random:Random, samples:Samples, @Inject('notes') notes) {
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
  }

  @HostListener('click', ['$event'])
  onClick(event:MouseEvent) {
    this.clicks.next({x: event.clientX, y: event.clientY});
  }

}
