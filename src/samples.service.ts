import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';
import {Http, ResponseBuffer} from 'angular2/http';

const NOTES = {
  C: require("file!./samples/n_C5.mp3"),
  D: require("file!./samples/n_D4.mp3"),
  E: require("file!./samples/n_D5.mp3"),
  G: require("file!./samples/n_F4.mp3"),
  A: require("file!./samples/n_G4.mp3")
};

@Injectable()
export class Samples {
  sampleCache:{[s: string]: AudioBuffer} = {};

  constructor(private http:Http, audioCtx:AudioContext) {
    for (const note of Object.keys(NOTES)) {
      this.getSample(NOTES[note]).subscribe(blob => {
        audioCtx.decodeAudioData(blob, (buf) => {
          this.sampleCache[note] = buf;
        });
      });
    }
  }

  getSample(path:string) {
    return this.http.get(path, {
      buffer: ResponseBuffer.ArrayBuffer
    }).map((r) => r.arrayBuffer());
  }

}
