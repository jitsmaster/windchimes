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

  markovProcess(minDelay, maxDelay) {
    return Observable.create((observer) => {
      let running = true;
      let next = () => {
        if (running) {
          observer.next();
          setTimeout(next, this.nextInt(minDelay, maxDelay));
        }
      };
      next();

      return () => running = false;
    });
  }

}
