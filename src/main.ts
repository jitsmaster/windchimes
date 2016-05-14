import {provide} from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app.component';

function main() {
  bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]);
}

function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

if (module['hot']) {
  console.log('hot');
  if (document.readyState === 'complete') {
    console.log('main');
    main();
  } else {
    console.log('boot');
    bootstrapDomReady();
  }
  module['hot']['accept']();
} else {
  bootstrapDomReady();
}
