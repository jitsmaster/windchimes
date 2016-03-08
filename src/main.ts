import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ChangeDetectorGenConfig} from 'angular2/src/core/change_detection/interfaces';
import {HTTP_PROVIDERS} from 'angular2/http';

import {Windchimes} from './windchimes.component';

bootstrap(Windchimes, [
  provide(ChangeDetectorGenConfig, { useValue: new ChangeDetectorGenConfig(true, false, false)}),
  HTTP_PROVIDERS
]);
