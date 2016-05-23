import {
  Component,
  Input,
  animation,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/core';
import {Hero, Heroes} from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-list-timings',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @flyInOut="'in'"
         (click)="hero.toggleActivation()">
       {{hero.name}}
    </div>
  `,
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translate(-100px)'}),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({opacity: 0, transform: 'translate(100px)'}))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListTimingsComponent {
  @Input() heroes:Heroes;
}
