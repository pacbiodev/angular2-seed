/// <reference path="../../../../typings/tsd.d.ts" />
import {bind, Inject} from 'angular2/di';
import {Store} from './Store';

// Using TypeScript we can define our state interface
interface IRun {
  value: string;
  created_at: Date;
  completed?: boolean;
}
interface IRunState {
  runs: Array<IRun>
}

// We can also make a RunStore to manage cache/localStorage
let initialRunState: IRunState = {
  runs: [
    { value:'sample one', created_at: new Date() },
    { value:'sample two', created_at: new Date() },
    { value:'sample three', created_at: new Date() },
    { value:'sample four',  created_at: new Date() }
  ]
};

// Our Run Service that uses Store helper class for managing our state
export class RunService extends Store {
  // we shouldn't access ._state or ._setState outside of the class
  constructor(@Inject('initialRunState') state: IRunState) {
    // use Store class as a helper
    super(state);
  }

  add(run) {
    // Async call to server then save state
    var runs = this.get('runs');
    runs.push({
      value: run,
      created_at: new Date()
    });

    // Always Replace state
    this.set('runs', runs);
  }

  remove(index) {
    // Async call to server then save state
    var runs = this.get('runs');
    runs.splice(index, 1);

    // Always Replace state
    this.set({
      runs: runs
    });

  }

}//RunService

export var runInjectables = [
  bind('initialRunState').toValue(initialRunState),
  bind(RunService).toClass(RunService)
];
