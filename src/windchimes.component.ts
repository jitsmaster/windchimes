import {Component} from 'angular2/core';
import {Observable} from 'rxjs';
import {Bell} from './bell.component';
import {Random} from './random.service';

@Component({
  selector: 'windchimes',
  template: `
    <bell *ngFor="#bell of bells" [location]="bell">
    </bell>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Bell],
  providers: [Random]
})
export class Windchimes {
  bells:{x: number, y: number}[];

  constructor(private random:Random) {
    Observable.interval(1000)
      .map(() => ({x: random.nextInt(1000), y: random.nextInt(500)}))
      .windowCount(3, 1)
      .mergeMap(window => window.toArray())
      .subscribe((b:{x: number, y: number}[]) => this.bells = b);
  }
}
