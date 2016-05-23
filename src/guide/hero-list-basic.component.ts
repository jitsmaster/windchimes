 // #docregion
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
  selector: 'hero-list-basic',
  // #docregion template
  template: `
    <div *ngFor="let hero of heroes.get()"
         (click)="hero.toggleActivation()"
         @heroState="hero.state"
         class="hero">
      {{hero.name}}
    </div>
  `,
  // #enddocregion template
  styleUrls: ['hero-list.component.css'],
  // #docregion animationdef
  animations: [
    animation('heroState', [
      state('void',     style({})),
      state('inactive', style({backgroundColor: 'blue', transform: 'scale(1)'})),
      state('active',   style({backgroundColor: 'lightblue', transform: 'scale(1.1)'})),
      transition('inactive => active', [
        style(':inactive'),
        animate('100ms ease-in', style(':active'))
      ]),
      transition('active => inactive', [
        style(':active'),
        animate('100ms ease-out', style(':inactive'))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListBasicComponent {
  @Input() heroes:Heroes;
}
