/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, ElementRef} from 'angular2/angular2';
import {appDirectives} from '../directives/directives';

// Simple component
@Component({
  selector: 'dashboard'
})
@View({
  directives: [appDirectives],
  template: `
  <style> span[x-large] { color: red; } </style>

  <div>
    <h2>Dashboard</h2>
    <span x-large>Extra Large Font Directive</span>
  </div>
  `
})
export class Dashboard {
  constructor() {

  }
}
