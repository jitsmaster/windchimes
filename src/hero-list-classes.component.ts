import {Component, Input} from 'angular2/core';
import {animation, state, style, animate, transition, group} from 'angular2/animate';
import {Hero, Heroes} from './hero.service';

@Component({
  selector: 'hero-list-classes',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @heroState="hero.state"
         (click)="hero.toggleActivation()">
      {{hero.name}}
    </div>
  `,
  styles: [require('./hero-list.component.css').toString()],
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
})
export class HeroListClasses {
  @Input() heroes:Heroes;
}
