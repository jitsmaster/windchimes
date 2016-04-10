import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'web-animations-js';
import './webkit-audio-context-monkeypatch';
require('stereo-panner-node').polyfill();

require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/windowTime');
require('rxjs/add/operator/toArray');
