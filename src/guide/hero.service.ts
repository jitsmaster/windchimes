import {Injectable} from '@angular/core';

export class Hero {
  constructor(public name:string, public state = 'inactive') { }

  toggleActivation() {
    if (this.state === 'active') {
      this.state = 'inactive';
    } else {
      this.state = 'active';
    }
  }

}




@Injectable()
export class Heroes {

  private allHeroes = [
    'Wolverine',
    'Thing',
    'Kitty Pryde',
    'Magneto',
    'Nightcrawler',
    'Juggernaut',
    'Emma Frost',
    'Beast',
    'Captain America',
    'Spider-Man',
    'Puck',
    'Alex Wilder',
    'Doctor Strange'
  ].map(name => new Hero(name));

  currentHeroes = this.allHeroes.slice(0, 3);

  constructor() {
    this.currentHeroes[1].toggleActivation();
  }

  get() {
    return this.currentHeroes;
  }

  canAdd() {
    return this.currentHeroes.length < this.allHeroes.length;
  }

  canRemove() {
    return this.currentHeroes.length > 0;
  }

  add() {
    this.currentHeroes.push(this.allHeroes[this.currentHeroes.length]);
  }

  remove() {
    this.currentHeroes.splice(this.currentHeroes.length - 1, 1);
  }

}
