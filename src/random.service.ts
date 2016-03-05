import {Injectable} from 'angular2/core';

@Injectable()
export class Random {

  nextInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }

  element<T>(array:T[]) {
    return array[this.nextInt(0, array.length)];
  }

}
