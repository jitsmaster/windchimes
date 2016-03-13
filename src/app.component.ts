import {Component, Inject, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Windchimes} from './windchimes.component';
import {WindchimesRemote} from './windchimes-remote.component';
import {Random} from './random.service';
import {Samples} from './samples.service';

@Component({
  selector: 'windchimes-app',
  template: `
    <div (window:resize)="onWindowResize()">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    Random,
    Samples,
    AudioContext,
    provide('size', {useValue: {width: 1280, height: 780}}),
    provide('notes', {useValue: ['C4', 'G4', 'C5', 'D5', 'E5']})
  ]
})
@RouteConfig([
  {path: '/local', name: 'LocalChimes', component: Windchimes},
  {path: '/remote', name: 'RemoteChimes', component: WindchimesRemote, useAsDefault: true}
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
