/// <reference path="../../../../../typings/tsd.d.ts" />

import {NgFor, Component, View} from 'angular2/angular2';
import {ToDoService, ToDo as ToDoItem, ToDoFactory} from '../../services/ToDoService';

let styles   = require('./todo.css');
let template = require('./todo.html');

@Component({
  selector: 'todo'})
@View({
  template:
    `
    <style>
      ${styles}
    </style>
    ${template}
  `,
  directives: [NgFor]})
export class ToDo {
  toDoEdit: ToDoItem = null;

  constructor(public toDoService: ToDoService, public factory: ToDoFactory) {}

  enterToDo(inputElement): void {
    this.addToDo(inputElement.value);
    inputElement.value = '';
  }

  editToDo(todo: ToDoItem): void {
    this.toDoEdit = todo;
  }

  doneEditing($event, todo: ToDoItem): void {
    var which = $event.which;
    var target = $event.target;
    if (which === 13) {
      todo.title = target.value;
      this.toDoEdit = null;
    } else if (which === 27) {
      this.toDoEdit = null;
      target.value = todo.title;
    }
  }

  addToDo(newTitle: string): void {
    this.toDoService.add(this.factory.create(newTitle, false));
  }

  completeMe(todo: ToDoItem): void {
    todo.completed = !todo.completed;
  }

  deleteMe(todo: ToDoItem): void {
    this.toDoService.remove(todo);
  }

  toggleAll($event): void {
    var isComplete = $event.target.checked;
    this.toDoService
        .list
        .forEach((todo: ToDoItem) => {
                   todo.completed = isComplete;
      });
  }

  clearCompleted(): void {
    this.toDoService
        .removeBy((todo) => todo.completed);
  }
}
