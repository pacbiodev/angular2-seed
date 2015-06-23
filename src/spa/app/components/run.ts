/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {formDirectives, FormBuilder, Control, ControlGroup, Validators} from 'angular2/forms';

// App
import {appDirectives} from '../directives/directives';
import {RunService} from '../services/RunService';

// Simple component
@Component({
  selector: 'todo'
})
    // <fieldset ng-control-group="runs">
    // </fieldset>
@View({
  directives: [ coreDirectives, formDirectives, appDirectives ],
  template: `
  <style>
    .error-message {
      color: red;

    }
  </style>

  <form [ng-form-model]="runForm" (submit)="runForm.valid && addRun($event, runForm.value.run)"
  novalidate>

    <input type="text" [ng-form-control]="runInput" autofocus required>

    <button>Add Run</button>

    <span class="error-message" *ng-if="
      runForm.errors?.required &&
      runForm.dirty &&
      runForm.controls.run.touched
    ">
      Run is required
    </span>

  </form>

  <ul>
    <li *ng-for="var run of runService.state.runs; var $index = index">
      <p>
        {{ run.value }}
        <br>
        <button (click)="removeRun($event, $index)">Remove</button>
        <small>{{ run.created_at }}</small>
      </p>
    </li>
  </ul>
  `
})
export class Run {
  runForm: ControlGroup;
  runInput: Control;
  state: any;
  constructor(
    public formBuilder: FormBuilder,
    public runService: RunService
  ) {

    this.runForm = formBuilder.group({
      'run': ['', Validators.required]
    })
    this.runInput = this.runForm.controls.run

  }

  addRun(event, run) {
    event.preventDefault(); // prevent native page refresh

    this.runService.add(run);
    // update the view/model
    this.runInput.updateValue('');
  }

  removeTodo(event, index) {
    event.preventDefault(); // prevent native page refresh

    this.runService.remove(index);
  }

}
