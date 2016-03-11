import {Component, provide, Inject} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Bell} from './bell.component';
import {Random} from './random.service';
import {Samples} from './samples.service';

@Component({
  selector: 'windchimes',
  template: `
    <bell *forAnyOrder="#chime of chimes | async"
          [bell]="chime">
    </bell>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Bell, ForAnyOrder],
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
    this.chimes = random.perlinNoise(1, 1000)
      .map(() => ({
        x: random.nextInt(0, 1280),
        y: random.nextInt(0, 680),
        note: noteSampler()
      }))
      .windowTime(5000, 50)
      .flatMap(window => window.toArray());
  }

}
