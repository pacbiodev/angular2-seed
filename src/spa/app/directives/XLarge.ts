/// <reference path="../../../../typings/tsd.d.ts" />
import {Directive, ElementRef} from 'angular2/angular2';

@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
export class XLarge {
  constructor(public el: ElementRef) {
    // simple dom manipulation to set font size to x-large
    this.el.domElement.style.fontSize = 'x-large';
  }
}
