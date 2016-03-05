import {Injectable} from 'angular2/core';

@Injectable()
export class Random {

  nextInt(max) {
    return Math.floor(Math.random() * max);
  }

}
