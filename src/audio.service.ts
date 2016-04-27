import {Injectable, Inject} from 'angular2/core';

@Injectable()
export class Audio {

  compressor:DynamicsCompressorNode;

  constructor(@Inject('audioContext') private audioCtx) {
    this.compressor = audioCtx.createDynamicsCompressor();
    this.compressor.threshold.value = -20;
    this.compressor.knee.value = 10;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0;
    this.compressor.release.value = 0.25;
    // Try for lulz:
    // this.compressor.release.value = 0;
    this.compressor.connect(audioCtx.destination);
  }

  play(sample, panVal = 0) {
    const source = this.audioCtx.createBufferSource();
    source.buffer = sample;

    const pan = this.audioCtx.createStereoPanner();
    pan.pan.value = panVal;

    source.connect(pan);
    pan.connect(this.compressor);

    source.start(0);

    return () => {
      source.stop(0);
      source.disconnect();
      pan.disconnect();
    }
  }
}
