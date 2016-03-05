import {Component} from 'angular2/core';
import {Observable} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Bell} from './bell.component';
import {Random} from './random.service';

@Component({
  selector: 'windchimes',
  template: `
    <bell *forAnyOrder="#bell of bells"
          [location]="bell">
    </bell>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Bell, ForAnyOrder],
  providers: [Random]
})
export class Windchimes {
  bells:{x: number, y: number}[];

  constructor(private random:Random) {
    Observable.interval(500)
      .map(() => ({x: random.nextInt(1280), y: random.nextInt(680)}))
      .windowTime(5000, 50)
      .flatMap(window => window.toArray())
      .subscribe((b:{x: number, y: number}[]) => this.bells = b);
  }
}
