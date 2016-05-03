import {Component} from 'angular2/core';
import {Hero, Heroes} from './hero.service';
import {HeroListBasic} from './hero-list-basic.component';
import {HeroListClasses} from './hero-list-classes.component';
import {HeroListGroups} from './hero-list-groups.component';
import {HeroListKeyframes} from './hero-list-keyframes.component';
import {HeroListMultistep} from './hero-list-multistep.component';
import {HeroListStates} from './hero-list-states.component';
import {HeroListTimings} from './hero-list-timings.component';

@Component({
  selector: 'hero-team-builder',
  template: `
    <button [disabled]="!heroes.canAdd()" (click)="heroes.add()">Add</button>
    <button [disabled]="!heroes.canRemove()" (click)="heroes.remove()">Remove</button>
    <div class="columns">
      <hero-list-basic [heroes]=heroes></hero-list-basic>
      <hero-list-states [heroes]=heroes></hero-list-states>
      <hero-list-timings [heroes]=heroes></hero-list-timings>

      <!-- Error: "State based animations cannot contain references to other states" -->
      <!--hero-list-classes [heroes]=heroes></hero-list-classes-->

      <!-- Error: "Animation states via styles must be prefixed with a ":"" -->
      <!--hero-list-keyframes [heroes]=heroes></hero-list-keyframes-->

      <!-- Error: "Partial keyframes are not supported" -->
      <!--hero-list-multistep [heroes]=heroes></hero-list-multistep-->

      <!-- TypeError: Cannot read property 'visit' of null -->
      <hero-list-groups [heroes]=heroes></hero-list-groups>
    </div>
  `,
  styles: [`
    .columns {
      display: flex;
      flex-direction: row;
    }
  `],
  directives: [
    HeroListBasic,
    HeroListStates,
    HeroListTimings,
    HeroListClasses,
    HeroListKeyframes,
    HeroListMultistep,
    HeroListGroups
  ],
  providers: [Heroes]
})
export class HeroTeamBuilder {
  constructor(private heroes:Heroes) { }
}
