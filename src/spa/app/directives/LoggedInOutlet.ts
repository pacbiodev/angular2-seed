/// <reference path="../../../../typings/tsd.d.ts" />

import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/di';
import {Login} from '../components/login/login';

@Directive({selector: 'router-outlet'})
export class LoggedInOutlet extends RouterOutlet {
  unless: any;
  constructor(elementRef: ElementRef,
              _loader: DynamicComponentLoader,
              _parentRouter: Router,
              _injector: Injector,
              @Attribute('name') nameAttr: string) {
                this.unless = {
                  '/login': true,
                  '/signup': true
                };

                super(elementRef, _loader, _parentRouter, _injector, nameAttr);
              }

  activate(instruction) {
    var url = this._parentRouter
                  .lastNavigationAttempt;
    if ((!this.unless[url]) &&
       (!localStorage.getItem('token'))) {
      instruction.component = Login;
    }
    super.activate(instruction);
  }
}
