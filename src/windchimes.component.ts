import {Component} from 'angular2/core';
import {Bell} from './bell.component';
import {Location} from './location';

@Component({
  selector: 'windchimes',
  template: `
    <bell *ngFor="#bell of bells" [location]=bell>
    </bell>
  `,
  styles: [require('./app.component.css').toString()],
  directives: [Bell]
})
export class Windchimes {
  bells:Location[] = [{x: 100, y: 100}, {x: 200, y: 200}, {x: 300, y: 300}];
}
