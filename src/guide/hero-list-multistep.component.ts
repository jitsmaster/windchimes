import {
  Component,
  Input,
  animation,
  state,
  style,
  animate,
  transition,
  group,
  keyframes
} from '@angular/core';
import {Hero, Heroes} from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-list-multistep',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @flyInOut="'in'">
      {{hero.name}}
    </div>
  `,
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
        ]))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListMultistepComponent {
  @Input() heroes:Heroes;
}
