import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ChangeDetectorGenConfig} from 'angular2/src/core/change_detection/interfaces';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  provide(ChangeDetectorGenConfig, { useValue: new ChangeDetectorGenConfig(true, false, false)}),
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
