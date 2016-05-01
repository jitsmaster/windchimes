import {Component, Inject, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {animation, state, transition, style, animate} from 'angular2/animate';
import {NgIfDeferred} from './ngIfDeferred.directive';
import {LoadingIndicator} from './loading-indicator.component';
import {Windchimes} from './windchimes.component';
import {WindchimesRemote} from './windchimes-remote.component';
import {WindchimesInteractive} from './windchimes-interactive.component';
import {HeroTeamBuilder} from './hero-team-builder.component';
import {Control} from './control.component';
import {Remote} from './remote.service';
import {Random} from './random.service';
import {Samples} from './samples.service';
import {Audio} from './audio.service';

@Component({
  selector: 'wind-chimes-app',
  template: `
    <div (window:resize)="onWindowResize()">
      <router-outlet [hidden]="isLoading()"></router-outlet>
      <loading-indicator *ngIf="isLoading()" animate-flyOut="lol" [progress]="getLoadProgress()"></loading-indicator>
    </div>
  `,
  styles: [''],
  animations: [
    animation('flyOut', [
      //state('*', style({opacity: 1, transform:'perspective(100px) translateZ(0)'})),
      transition('lol => void', [
        style({"opacity": 1, "transform": 'perspective(100px) translateZ(-20px)'}),
        animate(1000, style({"opacity": 0, "transform": 'perspective(100px) translateZ(101px)'}))
      ])
    ])
  ],
  directives: [ROUTER_DIRECTIVES, LoadingIndicator, NgIfDeferred],
  providers: [
    Remote,
    Random,
    Samples,
    Audio,
    provide('audioContext', {useValue: new (window['AudioContext'] || window['webkitAudioContext'])}),
    provide('size', {useValue: {width: 1280, height: 780}}),
    provide('notes', {useValue: ['C4', 'G4', 'C5', 'D5', 'E5']})
  ]
})
@RouteConfig([
  {path: '/', name: 'InteractiveChimes', component: WindchimesInteractive, useAsDefault: true},
  {path: '/remote', name: 'RemoteChimes', component: WindchimesRemote},
  {path: '/play', name: 'LocalChimes', component: Windchimes},
  {path: '/ctrl', name: 'Control', component: Control},
  {path: '/animations', name: 'HeroTeamBuilder', component: HeroTeamBuilder}
])
export class AppComponent {
  bufferLoaded = false;
  constructor(@Inject('size') private size, private samples:Samples) {
    this.onWindowResize();
    setTimeout(() => this.bufferLoaded = true, 4200); // 5 secs minus approx reaction time
  }
  onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }
  getLoadProgress() {
    const bfrCount = this.bufferLoaded ? 1 : 0;
    return 100 * (this.samples.loadedSampleCount + bfrCount) / (this.samples.totalSampleCount + 1);
  }
  isLoading() {
    return false;
    /*return this.getLoadProgress() < 100;*/
  }
}
