import {Component, Input} from 'angular2/core';
import {Location} from './location';

@Component({
  selector: 'bell',
  template: `
    <div class="bell"
         [style.transform]="getTransform()">
    </div>
  `,
  styles: [require('./bell.component.css').toString()]
})
export class Bell {
  @Input() location:Location;

  getTransform() {
    return `translate(${this.location.x}px, ${this.location.y}px)`;
  }

}
