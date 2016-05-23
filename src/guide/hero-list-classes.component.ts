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
  selector: 'hero-list-classes',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @heroState="hero.state"
         (click)="hero.toggleActivation()">
      {{hero.name}}
    </div>
  `,
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('heroState', [
      state('inactive', style('.inactive')),
      state('active', style('.active')),
      transition('inactive => active', [
        style(':inactive'),
        animate(100, style(':active'))
      ]),
      transition('active => inactive', [
        style(':active'),
        animate(100, style(':inactive'))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListClassesComponent {
  @Input() heroes:Heroes;
}
