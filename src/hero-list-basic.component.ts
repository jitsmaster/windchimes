import {Component, Input} from 'angular2/core';
import {animation, state, style, animate, transition, group} from 'angular2/animate';
import {Hero, Heroes} from './hero.service';

@Component({
  selector: 'hero-list-basic',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @flyInOut="any">
      {{hero.name}}
    </div>
  `,
  styles: [require('./hero-list.component.css').toString()],
  animations: [
    animation('flyInOut', [
      transition('void => ANY', [
        style({opacity: 0, transform: 'translate(-100px)'}),
        animate(100, style({opacity: 1, transform: 'translate(0)'}))
      ]),
      transition('ANY => void', [
        style({opacity: 1, transform: 'translate(0)'}),
        animate(100, style({opacity: 0, transform: 'translate(100px)'}))
      ])
    ])
  ]
})
export class HeroListBasic {
  @Input() heroes:Heroes;
}
