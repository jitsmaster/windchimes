import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {animate, style} from 'angular2/animate';
import {Samples} from './samples.service';

@Component({
  selector: 'inner-chime',
  template: `
    <div *ngIf="true"
         class="inner-chime {{chime.note}}"
         [class.remote]="remote"
         [style.left]="(chime.x - 300) + 'px'"
         [style.top]="(chime.y - 300) + 'px'">
    </div>
  `,
  styles: [require('./inner-chime.component.css').toString()],
  animations: {
    ngEnter: [
      style('.first'),
      animate('.expanded', '0.05s ease-in'),
      animate('.gone', '1s ease-out')
    ]
  },
  changeDetection: ChangeDetectionStrategy.CheckOnce
})
export class InnerChime {
  @Input() chime:{x: number, y: number, note: string};
  @Input() remote:boolean;

  constructor() {
  }


}
