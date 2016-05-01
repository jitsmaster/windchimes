import {Component, Input} from 'angular2/core';
import {animation, state, style, animate, transition, group} from 'angular2/animate';
import {Hero, Heroes} from './hero.service';

@Component({
  selector: 'hero-list-multistep',
  template: `
    <div class="hero"
         *ngFor="let hero of heroes.get()"
         @flyInOut="hero.state">
      {{hero.name}}
    </div>
  `,
  styles: [require('./hero-list.component.css').toString()],
  animations: [
    animation('flyInOut', [
      transition('void => ANY', [
        style({opacity: 0, transform: 'translate(-100px)'}),
        animate(200, [
          style({opacity: 1, transform: 'translate(10px)'}),
          style({opacity: 1, transform: 'translate(0)'})
        ])
      ]),
      transition('ANY => void', [
        style({opacity: 1, transform: 'translate(0)'}),
        animate(200, [
          style({opacity: 1, transform: 'translate(-10px)'}),
          style({opacity: 0, transform: 'translate(100px)'})
        ])
      ])
    ])
  ]
})
export class HeroListMultistep {
  @Input() heroes:Heroes;
}
