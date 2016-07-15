import {Component, Inject, HostListener} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ForAnyOrder} from './forAnyOrder.directive';
import {Chime} from './chime.component';
import {Random} from './random.service';
import {Spacial} from './spacial.service';
import { Audio } from './audio.service';

@Component({
  selector: 'wind-chimes',
  template: `
    <chime *forAnyOrder="let chime of chimes | async"
           [chime]=chime>
    </chime>
  `,
  styles: [require('./windchimes.component.css').toString()],
  directives: [Chime, ForAnyOrder]
})
export class Windchimes {
  chimes: Observable<{ x: number, y: number, note: string }[]>;
  size;

  noteSampler;
  spaceSampler = this.spacial.sampler([1, 2, 3, 4, 5], true);
  pos: number = 200;

  constructor(private random: Random,
    private spacial: Spacial,
    private audio: Audio,
    @Inject('notes') notes,
    @Inject('size') size) {
    this.size = size;
    this.noteSampler = random.sampler(notes);
    this.chimes = random.dynaNoise(2000, () => {
      return this.pos;
    }, 5)
      .map(() => ({
        x: random.nextInt(0, size.width),
        y: random.nextInt(0, size.height),
        note: this.noteSampler()
      }))
      .bufferTime(5000, 10);
  }

  @HostListener('click', ['$event'])

  onClick(event: MouseEvent) {
    var i = this.spaceSampler(event.screenY, window.screen.availHeight);
    this.pos = 210 / i;
    this.windVolume.gain.value = i / 14 + 0.1;
    console.log(this.pos);
  }

  windNoise;
  windVolume;
  ngOnInit() {
    setTimeout(() => {
      this.windNoise = this.audio.brownNoiseNode();
      this.windVolume = this.audio.gainFor(this.windNoise);
      this.windVolume.gain.value = this.pos / 1000;
      this.audio.startNode(this.windVolume);
    }, 2000);
  }

  ngOnDestroy() {
    this.audio.stopNode(this.windVolume);
    this.audio.stopNode(this.windNoise);
  }
}
