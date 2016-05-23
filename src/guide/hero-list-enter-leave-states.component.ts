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
  selector: 'hero-list-enter-leave-states',
  // #docregion template
  template: `
    <div class="hero" *ngFor="let hero of heroes.get()"
         (click)="hero.toggleActivation()"
         @heroState="hero.state">
      {{hero.name}}
    </div>
  `,
  // #enddocregion template
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('heroState', [
      state('void', style({})),
      state('inactive', style({transform: 'translateX(0) scale(1)'})),
      state('active',   style({transform: 'translateX(0) scale(1.1)'})),
      transition('inactive => active', [
        style(':inactive'),
        animate('100ms ease-in', style(':active'))
      ]),
      transition('active => inactive', [
        style(':active'),
        animate('100ms ease-out', style(':inactive'))
      ]),
      transition('void => inactive', [
        style({transform: 'translateX(-100%) scale(1)'}),
        animate(100, style(':inactive'))
      ]),
      transition('inactive => void', [
        style(':inactive'),
        animate(100, style({transform: 'translateX(100%) scale(1)'}))
      ]),
      transition('void => active', [
        style({transform: 'translateX(0) scale(0)'}),
        animate(200, style(':active'))
      ]),
      transition('active => void', [
        style(':active'),
        animate(200, style({transform: 'translateX(0) scale(0)'}))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListEnterLeaveStatesComponent {
  @Input() heroes:Heroes;
}
