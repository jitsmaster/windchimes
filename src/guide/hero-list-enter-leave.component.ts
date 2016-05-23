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
  selector: 'hero-list-enter-leave',
  // #docregion template
  template: `
    <div class="hero" *ngFor="let hero of heroes.get()"
         @flyInOut="'in'">
      {{hero.name}}
    </div>
  `,
  // #enddocregion template
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListEnterLeaveComponent {
  @Input() heroes:Heroes;
}
