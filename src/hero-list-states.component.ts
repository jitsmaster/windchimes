import {Component, Input} from 'angular2/core';
import {animation, state, style, animate, transition, group} from 'angular2/animate';
import {Hero, Heroes} from './hero.service';

@Component({
  selector: 'hero-list-states',
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
      state('inactive', style({backgroundColor: 'white', transform: 'scale(1)'})),
      state('active', style({backgroundColor: 'lightblue', transform: 'scale(1.1)'})),
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
export class HeroListStates {
  @Input() heroes:Heroes;
}
