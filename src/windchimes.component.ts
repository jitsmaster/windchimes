import {Component, provide, Inject} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Bell} from './bell.component';
import {InnerChime} from './inner-chime.component';
import {Random} from './random.service';
import {Samples} from './samples.service';

@Component({
  selector: 'windchimes',
  template: `
    <div *forAnyOrder="#chime of chimes | async">
      <bell [bell]="chime">
      </bell>
      <inner-chime [bell]="chime">
      </inner-chime>
    </div>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Bell, InnerChime, ForAnyOrder],
  providers: [
    Random,
    Samples,
    AudioContext,
    provide('notes', {useValue: ['C', 'D', 'E', 'G', 'A']})
  ]
})
export class Windchimes {
  chimes:Observable<{x: number, y: number}[]>;

  constructor(random:Random,
              @Inject('notes') notes) {
    const noteSampler = random.sampler(notes);
    this.chimes = random.perlinNoise()
      .map(() => ({
        x: random.nextInt(0, 1280),
        y: random.nextInt(0, 680),
        note: noteSampler()
      }))
      .windowTime(5000, 100)
      .flatMap(window => window.toArray());
  }

}
