import {Component, provide, Inject, OnInit, OnDestroy} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Bell} from './bell.component';
import {Random} from './random.service';
import {Samples} from './samples.service';

@Component({
  selector: 'windchimes',
  template: `
    <bell *forAnyOrder="#bell of bells"
          [bell]="bell">
    </bell>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Bell, ForAnyOrder],
  providers: [
    Random,
    Samples,
    AudioContext,
    provide('notes', {useValue: ['C', 'D', 'E', 'G', 'A']})
  ]
})
export class Windchimes implements OnInit, OnDestroy {
  bells:{x: number, y: number}[];
  windSub:Subscription;

  constructor(private random:Random,
              @Inject('notes') private notes) {
  }

  ngOnInit() {
    this.windSub = this.random.perlinNoise(1, 1000)
      .map(() => ({
        x: this.random.nextInt(0, 1280),
        y: this.random.nextInt(0, 680),
        note: this.random.element(this.notes)
      }))
      .windowTime(5000, 50)
      .flatMap(window => window.toArray())
      .subscribe((b:{x: number, y: number}[]) => this.bells = b);
  }

  ngOnDestroy() {
    this.windSub.unsubscribe();
  }
}
