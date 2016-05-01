import {Directive, ViewContainerRef, TemplateRef} from 'angular2/core';
import {isBlank} from 'angular2/src/facade/lang';

@Directive({selector: '[ngIfDeferred]', inputs: ['ngIfDeferred']})
export class NgIfDeferred {
  private _prevCondition: boolean = null;

  constructor(private _viewContainer: ViewContainerRef, private _templateRef: TemplateRef<Object>) {}

  set ngIfDeferred(newCondition: any /* boolean */) {
    if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
      this._prevCondition = true;
      setTimeout(() => this._viewContainer.createEmbeddedView(this._templateRef), 0);
    } else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
      this._prevCondition = false;
      setTimeout(() => this._viewContainer.clear(), 0);
    }
  }
}
