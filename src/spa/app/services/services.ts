/// <reference path="../../../../typings/tsd.d.ts" />
import {runInjectables} from './RunService';
import {toDoInjectables} from './ToDoService';


export var appServicesInjectables:Array<any> = [
  runInjectables, toDoInjectables
];
