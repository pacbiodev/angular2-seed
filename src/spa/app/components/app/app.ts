/// <reference path="../../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

// We use a folder if we want separate files
import {Home} from '../home/home';
// Otherwise we only use one file for a component
import {Dashboard} from '../dashboard';
// A simple example of a Component using a Service
import {Run} from '../run';

// Import all of our custom app directives
import {appDirectives} from '../../directives/directives';

let styles   = require('./app.css');
let template = require('./app.html');

// App: Top Level Component
@Component({
  selector: 'app' // without [ ] means we are selecting the tag directly,
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [RouterLink, coreDirectives, appDirectives],
  template:
  `
    <style>
      ${styles}
    </style>
    ${template}
  `
})
@RouteConfig([
  { path: '/', as: 'root', component: Home },
  { path: '/home', as: 'home', component: Home },
  { path: '/dashboard', as: 'dashboard', component: Dashboard },
  { path: '/run', as: 'run', component: Run }
])
export class App {
  name: string;
  constructor(router: Router, browserLocation: BrowserLocation) {
    this.name = 'PacBio Angular 2 Seed';

    // we need to manually go to the correct uri until the router is fixed
    let uri = browserLocation.path();
    router.navigate(uri);
  }
}
