import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';

@Injectable()
export class Random {

  nextInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }

  element<T>(array:T[]) {
    return array[this.nextInt(0, array.length)];
  }

  randomDelayOf(minDelay, maxDelay) {
    const delay = this.nextInt(minDelay, maxDelay);
    return Observable.of(delay)
      .delay(delay);
  }

  markovProcess(minDelay, maxDelay) {
    return Observable.of(1)
      .flatMap(x => this.randomDelayOf(minDelay, maxDelay) )
      .repeat();
  }

}
