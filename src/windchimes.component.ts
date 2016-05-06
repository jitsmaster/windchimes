import {Component, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Chime} from './chime.component';
import {Random} from './random.service';

@Component({
  selector: 'wind-chimes',
  template: `
    <chime *forAnyOrder="let chime of chimes | async"
           [chime]=chime>
    </chime>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, ForAnyOrder]
})
export class Windchimes {
  chimes:Observable<{x: number, y: number}[]>;

  constructor(random:Random,
              @Inject('notes') notes) {
    const noteSampler = random.sampler(notes);
    this.chimes = random.perlinNoise(5000)
      .map(() => ({
        x: random.nextInt(0, 1280),
        y: random.nextInt(0, 680),
        note: noteSampler(),
        state: 'chiming'
      }))
      .bufferTime(5000, 10);
  }

}
