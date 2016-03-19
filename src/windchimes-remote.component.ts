import {Component, Inject, Input} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {AudioUnlock} from './audio-unlock.component';
import {Chime} from './chime.component';
import {InnerChime} from './inner-chime.component';
import {Random} from './random.service';

@Component({
  selector: 'windchimes-remote',
  template: `
    <div [style.display]="unlocked ? 'block': 'none'"
         *forAnyOrder="#chime of chimes | async">
      <chime [chime]="chime" [remote]=true>
      </chime>
      <inner-chime [chime]="chime" [remote]=true>
      </inner-chime>
    </div>
    <audio-unlock *ngIf="!unlocked" (unlock)="onUnlocked()">
    </audio-unlock>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, AudioUnlock, InnerChime, ForAnyOrder]
})
export class WindchimesRemote {
  chimes:Observable<{x: number, y: number}[]>;
  unlocked:boolean;

  constructor(random:Random, @Inject('size') size) {
    this.chimes = random.remote()
      .map((note) => ({
        x: size.width / 2,
        y: size.height / 2,
        note: note
      }))
      .windowTime(5000, 100)
      .flatMap(window => window.toArray());
  }

  onUnlocked() {
    this.unlocked = true;
  }

}
