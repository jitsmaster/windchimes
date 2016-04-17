import {Component, Inject, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Windchimes} from './windchimes.component';
import {WindchimesRemote} from './windchimes-remote.component';
import {WindchimesInteractive} from './windchimes-interactive.component';
import {Control} from './control.component';
import {Remote} from './remote.service';
import {Random} from './random.service';
import {Samples} from './samples.service';

@Component({
  selector: 'wind-chimes-app',
  template: `
    <div (window:resize)="onWindowResize()">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [''],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    Remote,
    Random,
    Samples,
    provide('audioContext', {useValue: new (window['AudioContext'] || window['webkitAudioContext'])}),
    provide('size', {useValue: {width: 1280, height: 780}}),
    provide('notes', {useValue: ['C4', 'G4', 'C5', 'D5', 'E5']})
  ]
})
@RouteConfig([
  {path: '/', name: 'InteractiveChimes', component: WindchimesInteractive, useAsDefault: true},
  {path: '/remote', name: 'RemoteChimes', component: WindchimesRemote},
  {path: '/local', name: 'LocalChimes', component: Windchimes},
  {path: '/ctrl', name: 'Control', component: Control}
])
export class AppComponent {
  constructor(@Inject('size') private size) {
    this.onWindowResize()
  }
  onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }
}
