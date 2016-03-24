import {Component, Inject, HostBinding, OnDestroy} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';

import {Random} from './random.service';
import {Samples} from './samples.service';



const markovData = require('./markov_loader!./markov-fodder.txt');

@Component({
  selector: 'markovchimes',
  template: `
    {{ word() }}
  `,
  styles: [require('./markovchimes.component.css').toString()]
})
export class Markovchimes implements OnDestroy {
  private lastChime;
  private words;
  private wordIdx:number;
  private sub:Subscription;


  constructor(private random:Random,
              samples:Samples,
              @Inject('notes') notes,
              @Inject('audioContext') audioCtx) {

    const noteSampler = random.sampler(notes);
    this.sub = random.perlinNoise(0, 400, 2)
      .map(() => ({
        x: random.nextInt(0, 1280),
        y: random.nextInt(0, 680),
        note: noteSampler()
      }))
      .subscribe(chime => {
        this.lastChime = chime;
        this.nextWord();

        samples.sampleCache.piano[chime.note].first().subscribe(sample => {
          const source = audioCtx.createBufferSource();
          source.buffer = sample;
          source.connect(audioCtx.destination);
          source.start();
          setTimeout(() => {
            source.stop();
            source.disconnect();
          }, 5000);
        });

      });
  }

  @HostBinding('class')
  get hostClass() {
    const noteClass = this.lastChime ? this.lastChime.note : '';
    const length = this.word().length;
    let lengthClass;
    if (length <= 3) {
      lengthClass = 'short';
    } else if (length <= 6) {
      lengthClass = 'medium';
    } else if (length <= 8) {
      lengthClass = 'long';
    } else if (length <= 10) {
      lengthClass = 'longer';
    } else {
      lengthClass = 'longest'
    }
    return `${noteClass} ${lengthClass}`;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  word() {
    if (this.words) {
      return this.words[this.wordIdx];
    } else {
      return '';
    }
  }

  nextWord() {
    if (this.words && this.wordIdx === 0) {
      this.wordIdx = 1;
      console.log('second', this.word());
      return;
    } else if (this.words) {
      const [k1, k2] = this.words;
      for (const [[w1, w2], nexts] of markovData) {
        if (k1 === w1 && k2 === w2) {
          this.words.shift();
          this.words.push(this.random.element(nexts));
          console.log('found', k1, k2, this.word());
          return;
        }
      }
    }
    this.words = this.random.element(markovData)[0].slice(0);
    this.wordIdx = 0;
    console.log('new', this.word());
  }

}
