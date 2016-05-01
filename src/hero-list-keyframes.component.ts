import {Component, Input} from 'angular2/core';
import {animation, state, style, animate, transition, group} from 'angular2/animate';
import {Hero, Heroes} from './hero.service';

@Component({
  selector: 'hero-list-keyframes',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @flyInOut="hero.state">
      {{hero.name}}
    </div>
  `,
  styles: [
    require('./hero-list.component.css').toString(),
    `
      @keyframes flyIn {
        0%   { opacity: 0; transform: translate(-100px); }
        90%  { opacity: 1; transform: translate(10px); }
        100% { opacity: 1; tranfsorm: translate(0); }
      }
      @keyframes flyOut {
        0%   { opacity: 1; transform: translate(0); }
        10%  { opacity: 1; transform: translate(-10px); }
        100% { opacity: 1; transform: translate(100px); }
      }
    `
  ],
  animations: [
    animation('flyInOut', [
      transition('void => ANY', [
        animate(200, style('@flyIn'))
      ]),
      transition('ANY => void', [
        animate(200, style('@flyOut'))
      ])
    ])
  ]
})
export class HeroListKeyframes {
  @Input() heroes:Heroes;
}
