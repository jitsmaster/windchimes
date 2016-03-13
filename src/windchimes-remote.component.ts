import {Component, Inject, Input} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Chime} from './chime.component';
import {InnerChime} from './inner-chime.component';
import {Random} from './random.service';

@Component({
  selector: 'windchimes-remote',
  template: `
    <div *forAnyOrder="#chime of chimes | async">
      <chime [chime]="chime" [remote]=true>
      </chime>
      <inner-chime [chime]="chime" [remote]=true>
      </inner-chime>
    </div>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, InnerChime, ForAnyOrder]
})
export class WindchimesRemote {
  chimes:Observable<{x: number, y: number}[]>;

  constructor(random:Random, @Inject('size') size) {
    this.chimes = random.remote()
      .map((note) => ({
        x: size.width / 2,
        y: size.height / 2,
        note: note
      }))
      .windowTime(5000, 100)
      .flatMap(window => window.toArray());
  }

}
