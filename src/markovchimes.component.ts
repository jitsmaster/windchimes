import {Component, Inject, HostBinding, OnDestroy} from 'angular2/core';
import {animation, transition, style, animate} from 'angular2/animate';
import {Observable, Subscription} from 'rxjs';

import {Random} from './random.service';
import {Samples} from './samples.service';
import {Audio} from './audio.service';

const markovData = require('./markov_loader!./data/markov-fodder.txt');

@Component({
  selector: 'markovchimes',
  template: `
    <span class="word" *ngFor="let word in getWords()" @flyOut="any">
      {{ word }}
    </span>
  `,
  styles: [require('./markovchimes.component.css').toString()],
  animations: [
    animation('flyOut', [
      transition('ANY => void', [
        style({perspective: 300, transform: 'translateZ(0)'}),
        animate('50ms ease-in', style({perspective: 300, transform: 'translateZ(-100)'}))
      ])
    ])
  ]
})
export class MarkovChimes implements OnDestroy {
  private lastNote:string = '';
  private words;
  private wordIdx:number;
  private sub:Subscription;

  constructor(private random:Random,
              samples:Samples,
              audio:Audio,
              @Inject('notes') notes) {

    const noteSampler = random.sampler(notes);
    this.sub = random.perlinNoise(0, 450, 2)
      .map(noteSampler)
      .subscribe(note => {
        this.lastNote = note;
        this.nextWord();
        samples.getSample(`PIANO_${note}`).then(sample => {
          const stopSample = audio.play(sample);
          setTimeout(stopSample, 5000);
        });
      });
  }

  @HostBinding('class')
  get hostClass() {
    return `${this.lastNote} ${this.getLengthClass()}`;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getWords() {
    if (this.words) {
      return [this.words[this.wordIdx]];
    } else {
      return [];
    }
  }

  nextWord() {
    if (this.words && this.wordIdx === 0) {
      this.wordIdx = 1;
      return;
    } else if (this.words) {
      const [k1, k2] = this.words;
      for (const [[w1, w2], nexts] of markovData) {
        if (k1 === w1 && k2 === w2 && Math.random() < 0.9) {
          this.words.shift();
          this.words.push(this.random.element(nexts));
          return;
        }
      }
    }
    this.words = this.random.element(markovData)[0].slice(0);
    this.wordIdx = 0;
  }

  getLengthClass() {
    const len = this.getWords().length ? this.words()[0].length : 0;
    if (len <= 3) {
      return 'short';
    } else if (len <= 6) {
      return 'medium';
    } else if (len <= 8) {
      return 'long';
    } else if (len <= 10) {
      return 'longer';
    } else {
      return 'longest'
    }
  }

}
