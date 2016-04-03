import {Component, Input, OnInit, ChangeDetectionStrategy, ElementRef} from 'angular2/core';

@Component({
  selector: 'tree-branch',
  template: `
    <tree-branch *ngIf="!isLeaf()"
                 [depth]="depth + 1"
                 class="left-branch">
    </tree-branch>
    <tree-branch *ngIf="!isLeaf()"
                 [depth]="depth + 1"
                 class="right-branch">
    </tree-branch>
  `,
  styles: [`
    :host {
      position: fixed;
      bottom: 0;
      left: 50%;
      height: 130px;
      width: 20px;
      margin-left: -10px;
      background-color: #ccc;
      transform-origin: bottom;
      transform: translate(0, 0) rotate(0) scale(0);
      transition: transform 1s;
    }
    :host(.root-branch) {
      transform: translate(0, 120px);
    }
    :host(.root-branch.start) {
      transform: translate(0, 0);
    }
    .left-branch.start {
      transform: translate(0,-130px) rotate(-30deg) scale(0.75);
    }
    .right-branch.start {
      transform: translate(0,-130px) rotate(30deg) scale(0.75);
    }
  `],
  directives: [TreeBranch],
  changeDetection: ChangeDetectionStrategy.CheckOnce
})
class TreeBranch implements OnInit {
  @Input() depth:number;

  constructor(private el:ElementRef) { }

  ngOnInit() {
    if (!this.isLeaf()) {
      setTimeout(() => this.el.nativeElement.classList.add('start'), this.depth * 200);
    }
  }
  isLeaf() {
    return !this.depth || this.depth >= 13;
  }

}

@Component({
  selector: 'tree',
  template: '<tree-branch [depth]=1 class="root-branch"></tree-branch>',
  directives: [TreeBranch]
})
export class Tree {
}
