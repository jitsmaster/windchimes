import {Component, Inject, HostBinding, OnDestroy} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';

import {Random} from './random.service';
import {Samples} from './samples.service';

interface WordStats {
  [word: string]: string[]
}
interface MarkovData {
  wordStats: WordStats,
  startWords: string[],
  terminals: string[]
}

const markovData:MarkovData = require('./markov_loader!./markov-fodder.txt');

@Component({
  selector: 'markovchimes',
  template: `
    {{ word }}
  `,
  styles: [require('./markovchimes.component.css').toString()]
})
export class Markovchimes implements OnDestroy {
  private lastChime;
  private word:string;
  private sub:Subscription;


  constructor(private random:Random,
              samples:Samples,
              @Inject('notes') notes,
              @Inject('audioContext') audioCtx) {

    const noteSampler = random.sampler(notes);
    this.sub = random.perlinNoise(0, 400)
      .map(() => ({
        x: random.nextInt(0, 1280),
        y: random.nextInt(0, 680),
        note: noteSampler()
      }))
      .subscribe(chime => {
        this.lastChime = chime;
        this.nextWord();

        samples.sampleCache[chime.note].first().subscribe(sample => {
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
  get noteClass() {
    return this.lastChime ? this.lastChime.note : ''
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  nextWord() {
    if (this.word && markovData.wordStats.hasOwnProperty(this.word)) {
      this.word = this.random.element(markovData.wordStats[this.word]);
    } else {
      this.word = this.random.element(markovData.startWords);
    }
  }

}
