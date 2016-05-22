Note: This project currently requires a weird-ass setup with a local Angular source clone to build (see `tsconfig.json` and `webpack.config.js`):

1. Clone git@github.com:matsko/angular.git to a sibling directory
2. Checkout branch `ng_animate`
3. `npm install` and `./build.sh` there. See https://github.com/angular/angular/issues/8637 if you run into problems.

This situation will resolve itself as soon as animation support if finished and gets
merged into Angular 2.
