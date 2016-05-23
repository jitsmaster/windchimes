import {Component} from '@angular/core';
import {Hero, Heroes} from './hero.service';
import {HeroListBasicComponent} from './hero-list-basic.component';
import {HeroListEnterLeaveComponent} from './hero-list-enter-leave.component';
import {HeroListEnterLeaveStatesComponent} from './hero-list-enter-leave-states.component';
import {HeroListAutoComponent} from './hero-list-auto.component';
import {HeroListClassesComponent} from './hero-list-classes.component';
import {HeroListGroupsComponent} from './hero-list-groups.component';
import {HeroListKeyframesComponent} from './hero-list-keyframes.component';
import {HeroListMultistepComponent} from './hero-list-multistep.component';
import {HeroListTimingsComponent} from './hero-list-timings.component';

@Component({
  selector: 'hero-team-builder',
  template: `
    <button [disabled]="!heroes.canAdd()" (click)="heroes.add()">Add</button>
    <button [disabled]="!heroes.canRemove()" (click)="heroes.remove()">Remove</button>
    <div class="columns">
      <hero-list-basic [heroes]=heroes></hero-list-basic>
      <hero-list-enter-leave [heroes]=heroes></hero-list-enter-leave>
      <hero-list-enter-leave-states [heroes]=heroes></hero-list-enter-leave-states>
      <hero-list-auto [heroes]=heroes></hero-list-auto>
      <hero-list-timings [heroes]=heroes></hero-list-timings>
      <hero-list-multistep [heroes]=heroes></hero-list-multistep>
      <hero-list-groups [heroes]=heroes></hero-list-groups>

      <!-- Error: "State based animations cannot contain references to other states" -->
      <!--hero-list-classes [heroes]=heroes></hero-list-classes-->

      <!-- Error: "Animation states via styles must be prefixed with a ":"" -->
      <!--hero-list-keyframes [heroes]=heroes></hero-list-keyframes-->
    </div>
  `,
  styles: [`
    .columns {
      display: flex;
      flex-direction: row;
    }
  `],
  directives: [
    HeroListBasicComponent,
    HeroListEnterLeaveComponent,
    HeroListEnterLeaveStatesComponent,
    HeroListAutoComponent,
    HeroListTimingsComponent,
    HeroListClassesComponent,
    HeroListKeyframesComponent,
    HeroListMultistepComponent,
    HeroListGroupsComponent
  ],
  providers: [Heroes]
})
export class HeroTeamBuilderComponent {
  constructor(private heroes:Heroes) { }
}
