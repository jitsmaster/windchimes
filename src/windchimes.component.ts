import {Component} from 'angular2/core';
import {Bell} from './bell.component';
import {Random} from './random.service';
import {Location} from './location';

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
    this.bells = [
      {x: random.nextInt(1000), y: random.nextInt(500)},
      {x: random.nextInt(1000), y: random.nextInt(500)},
      {x: random.nextInt(1000), y: random.nextInt(500)}
    ];
  }
}
