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

  randomWalk(startStep, minChange, maxChange) {
    return Observable.create((observer) => {
      let running = true;
      let step = startStep;
      let next = () => {
        if (running) {
          step += this.nextInt(minChange, maxChange);
          observer.next();
          setTimeout(next, step);
        }
      };
      next();

      return () => running = false;
    });
  }

  constrainedRandomWalk(startStep, minStep, maxStep, minChange, maxChange) {
    return Observable.create((observer) => {
      let running = true;
      let step = startStep;
      (async () => {
        while (running) {
          step += this.nextInt(minChange, maxChange);
          step = Math.min(step, maxStep);
          step = Math.max(step, minStep);
          observer.next();
          await this.sleep(step);
        }
      })();
      return () => running = false;
    });
  }

  randomWalkInterp(min, max, stepsPerInterval) {
    return Observable.create((observer) => {
      let running     = true;
      let current     = this.nextInt(min, max);
      let next        = this.nextInt(min, max);
      let step        = 0;
      (async () => {
        while (running) {
          const diff         = next - current;
          const stepFraction = step / stepsPerInterval;
          const val          = current + stepFraction * diff;

          console.log(current, next, step, val);

          observer.next();
          await this.sleep(val);

          step++;
          if (step === stepsPerInterval) {
            current = next;
            next = this.nextInt(min, max);
            step = 0;
          }
        }
      })();
      return () => running = false;
    });
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
