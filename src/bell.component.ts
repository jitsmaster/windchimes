import {Component, Input, OnInit} from 'angular2/core';

@Component({
  selector: 'bell',
  template: `
    <div class="bell"
         [style.transform]="getTransform()"
         [style.opacity]="getOpacity()">
    </div>
  `,
  styles: [require('./bell.component.css').toString()]
})
export class Bell implements OnInit {
  @Input() location:{x: number, y: number};
  fade:boolean;

  ngOnInit() {
    setTimeout(() => this.fade = true, 200);
  }
  getTransform() {
    const translate = `translate3d(${this.location.x}px, ${this.location.y}px, 0)`;
    const scale = this.fade ? 'scale3d(400, 400, 400)' : 'scale3d(1, 1, 1)';
    return `${translate} ${scale}`;
  }
  getOpacity() {
    return this.fade ? 0 : 0.7;
  }

}
