import {Observable, ReplaySubject} from 'rxjs';
import {Injectable, Inject} from 'angular2/core';
import {Http, ResponseBuffer} from 'angular2/http';

const NOTES = {
  C4: require("file!./samples/n_C4.mp3"),
  G4: require("file!./samples/n_G4.mp3"),
  C5: require("file!./samples/n_C5.mp3"),
  D5: require("file!./samples/n_D5.mp3"),
  E5: require("file!./samples/n_E5.mp3")
};
const PIANO_NOTES = {
  C4: require("file!./samples/piano_C4.mp3"),
  G4: require("file!./samples/piano_G4.mp3"),
  C5: require("file!./samples/piano_C5.mp3"),
  D5: require("file!./samples/piano_D5.mp3"),
  E5: require("file!./samples/piano_E5.mp3")
};

@Injectable()
export class Samples {
  sampleCache = {
    chimes: {},
    piano: {}
  };

  constructor(private http:Http, @Inject('audioContext') audioCtx) {
    for (const note of Object.keys(NOTES)) {
      const chimeSub = new ReplaySubject(1);
      this.sampleCache.chimes[note] = chimeSub;
      this.getSample(audioCtx, NOTES[note])
        .subscribe(chimeSub);

      const pianoSub = new ReplaySubject(1);
      this.sampleCache.piano[note] = pianoSub;
      this.getSample(audioCtx, PIANO_NOTES[note])
        .subscribe(pianoSub);
    }
  }

  getSample(audioCtx:AudioContext, path:string) {
    return this.http.get(path, {
      buffer: ResponseBuffer.ArrayBuffer
    }).map((r) => r.arrayBuffer())
      .flatMap(blob => {
        return Observable.create(obs => {
          audioCtx.decodeAudioData(blob, (data) => obs.next(data));
        });
      });
  }

}
