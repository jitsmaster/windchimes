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
  selector: 'hero-list-groups',
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
      state('in', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(-100%)'}),
        group([
          animate('0.2s ease-in', style({transform: 'translateX(0)'})),
          animate('0.2s linear',  style({opacity: 1}))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.2s ease-out', style({transform: 'translateX(100px)'})),
          animate('0.2s linear',   style({opacity: 0}))
        ])
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListGroupsComponent {
  @Input() heroes:Heroes;
}
