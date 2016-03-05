import {Component, Input, OnInit, OnDestroy} from 'angular2/core';

@Component({
  selector: 'bell',
  template: `
    <div class="bell {{bell.note}}"
         [style.transform]="getTransform()"
         [style.opacity]="getOpacity()">
    </div>
  `,
  styles: [require('./bell.component.css').toString()]
})
export class Bell implements OnInit, OnDestroy {
  @Input() bell:{x: number, y: number, note: string};
  fade:boolean;
  oscillator:OscillatorNode;
  gain:GainNode;

  constructor(private audioCtx:AudioContext) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.fade = true;

      this.oscillator = this.audioCtx.createOscillator();
      this.oscillator.frequency.value = this.getNoteFrequency();

      this.gain = this.audioCtx.createGain();
      this.gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
      this.gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 5);

      this.oscillator.connect(this.gain);
      this.gain.connect(this.audioCtx.destination);

      this.oscillator.start();

    }, 200);
  }

  ngOnDestroy() {
    this.oscillator.stop();
    this.oscillator.disconnect();
  }

  getTransform() {
    const translate = `translate3d(${this.bell.x}px, ${this.bell.y}px, 0)`;
    const scale = this.fade ? 'scale3d(400, 400, 400)' : 'scale3d(1, 1, 1)';
    return `${translate} ${scale}`;
  }

  getOpacity() {
    return this.fade ? 0 : 0.7;
  }

  getNoteFrequency() {
    switch (this.bell.note) {
      case 'C':
        return 261.63;
      case 'D':
        return 293.66;
      case 'E':
        return 329.63;
      case 'G':
        return 392.00;
      case 'A':
        return 440.00;
    };
  }

}
