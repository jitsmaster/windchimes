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
  selector: 'hero-list-keyframes',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @flyInOut="hero.state">
      {{hero.name}}
    </div>
  `,
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  styles: [
    `
      @keyframes flyIn {
        0%   { opacity: 0; transform: translateX(-100%); }
        30%  { opacity: 1; transform: translateX(15px); }
        100% { opacity: 1; tranfsorm: translateX(0); }
      }
      @keyframes flyOut {
        0%   { opacity: 1; transform: translateX(0); }
        70%  { opacity: 1; transform: translateX(-15px); }
        100% { opacity: 1; transform: translateX(100%); }
      }
    `
  ],
  animations: [
    animation('flyInOut', [
      transition('void => *', [
        animate(300, style('@flyIn'))
      ]),
      transition('* => void', [
        animate(300, style('@flyOut'))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListKeyframesComponent {
  @Input() heroes:Heroes;
}
