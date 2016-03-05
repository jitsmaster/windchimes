import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {Windchimes} from './windchimes.component';

bootstrap(Windchimes, [
  HTTP_PROVIDERS
]);
