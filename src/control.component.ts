import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Subscription} from 'rxjs';
import {Remote, ControlState} from './remote.service';

@Component({
  selector: 'control',
  template: `
    <h1>
      {{state?.state}}
      <button *ngIf="isChiming()" (click)="done()">Done</button>
      <button *ngIf="!isChiming()" (click)="start()">Start</button>
    </h1>
    <p>
      Connected clients: {{state?.clientCount}}
    </p>
    <p>
      Chime delay: {{state?.delay}}
      <button (click)="adjustDelay(1)">+1</button>
      <button (click)="adjustDelay(10)">+10</button>
      <button (click)="adjustDelay(-1)">-1</button>
      <button (click)="adjustDelay(-10)">-10</button>
      <button (click)="resetDelay()">Reset</button>
    </p>
    <p>

  `
})
export class Control implements OnInit, OnDestroy {
  private sub:Subscription;
  private state:ControlState;

  constructor(private rmt:Remote) {
  }

  ngOnInit() {
    this.sub = this.rmt.controlEvents()
      .subscribe((state) => this.state = state);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isChiming() {
    return this.state && this.state.state === 'chiming';
  }

  done() {
    this.rmt.done();
  }

  start() {
    this.rmt.start();
  }

  adjustDelay(amt:number) {
    this.rmt.adjustRate(amt);
  }

  resetDelay() {
    this.rmt.resetRate();
  }


}
