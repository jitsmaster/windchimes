import {Component, provide, Inject} from 'angular2/core';
import {Observable} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Bell} from './bell.component';
import {Random} from './random.service';
import {Samples} from './samples.service';

@Component({
  selector: 'windchimes',
  template: `
    <bell *forAnyOrder="#bell of bells"
          [bell]="bell">
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
  bells:{x: number, y: number}[];

  constructor(random:Random, @Inject('notes') notes) {
    Observable.interval(2000)
      .map(() => ({
        x: random.nextInt(1280),
        y: random.nextInt(680),
        note: random.element(notes)
      }))
      .windowTime(5000, 50)
      .flatMap(window => window.toArray())
      .subscribe((b:{x: number, y: number}[]) => this.bells = b);
  }
}
