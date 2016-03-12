import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {style, animate} from 'angular2/src/animate/worker/animation_definition';
import {Samples} from './samples.service';

@Component({
  selector: 'inner-chime',
  template: `
    <div *ngIf="true"
         class="inner-chime {{chime.note}}"
         [style.left]="chime.x + 'px'"
         [style.top]="chime.y + 'px'">
    </div>
  `,
  styles: [require('./inner-chime.component.css').toString()],
  animations: {
    ngEnter: [
      style('.first'),
      animate('.expanded', '0.5s ease-out'),
      animate('.gone', '2s ease-out')
    ]
  },
  changeDetection: ChangeDetectionStrategy.CheckOnce
})
export class InnerChime {
  @Input() chime:{x: number, y: number, note: string};

  constructor() {
  }


}
