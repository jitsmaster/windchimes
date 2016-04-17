import {Injectable, Inject} from 'angular2/core';
const loader = require('webaudio-buffer-loader');

const NOTE_SAMPLES = {
  C4: require("file!./samples/n_C4.mp3"),
  G4: require("file!./samples/n_G4.mp3"),
  C5: require("file!./samples/n_C5.mp3"),
  D5: require("file!./samples/n_D5.mp3"),
  E5: require("file!./samples/n_E5.mp3")
};

@Injectable()
export class Samples {
  private sampleCache = {};

  constructor(@Inject('audioContext') private audioCtx) {
    for (const note of Object.keys(NOTE_SAMPLES)) {
      this.getSample(note);
    }
  }

  getSample(note:string) {
    if (!this.sampleCache[note]) {
      this.sampleCache[note] = new Promise((resolve, reject) => {
        loader(NOTE_SAMPLES[note], this.audioCtx, (err, loadedBuffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(loadedBuffer);
          }
        });
      });
    }
    return this.sampleCache[note];
  }

}
