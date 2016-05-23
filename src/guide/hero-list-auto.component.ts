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
  selector: 'hero-list-auto',
  // #docregion template
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @shrinkOut="'in'">
      {{hero.name}}
    </div>
  `,
  // #enddocregion template
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('shrinkOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListAutoComponent {
  @Input() heroes:Heroes;
}
