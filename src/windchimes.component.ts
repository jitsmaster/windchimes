import {Component, provide, Inject, OnInit} from 'angular2/core';
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
export class Windchimes implements OnInit {
  chimes:Observable<{x: number, y: number}[]>;

  constructor(private random:Random,
              @Inject('notes') private notes) {
  }

  ngOnInit() {
    const noteSampler = this.random.sampler(this.notes);
    this.chimes = this.random.perlinNoise(1, 1000)
      .map(() => ({
        x: this.random.nextInt(0, 1280),
        y: this.random.nextInt(0, 680),
        note: noteSampler()
      }))
      .windowTime(5000, 50)
      .flatMap(window => window.toArray());
  }

}
