import {Component, Inject} from 'angular2/core';

@Component({
  selector: 'thank-you',
  template: `
    <div class="ty"
         [style.transform]="getTransform()"
         [style.webkitTransform]="getTransform()">
      Thank you
    </div>
  `,
  styles: [require('./thank-you.component.css').toString()]
})
export class ThankYou {

  constructor(@Inject('size') private size) {
  }

  getTransform() {
    return `translate(${this.size.width / 2}px, ${this.size.height / 2}px)`;
  }

}
