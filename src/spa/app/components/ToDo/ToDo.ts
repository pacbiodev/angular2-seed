/// <reference path="../../../../../typings/tsd.d.ts" />

import {NgFor, Component, View, ElementRef} from 'angular2/angular2';
import {appDirectives} from '../../directives/directives';
import {ToDoService, ToDo as ToDoItem, ToDoFactory, FilterByTypes} from '../../services/ToDoService';

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
  directives: [NgFor, appDirectives]})
export class ToDo {
  filterBy: FilterByTypes = FilterByTypes.all;
  filterAllCss = { 'selected': false };
  filterActiveCss = { 'selected': false };
  filterCompletedCss = { 'selected': false };

  toDoEdit: ToDoItem = null;

  constructor(private _elem: ElementRef, public toDoService: ToDoService, public factory: ToDoFactory) {
  }

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
    event.preventDefault();
    this.toDoService
        .removeBy((todo) => todo.completed);
  }

  applyFilter(event, filterBy: string): void {
    event.preventDefault();

    this.filterBy = FilterByTypes[filterBy];

    if (typeof this.filterBy === 'undefined')
      this.filterBy = FilterByTypes.all;

    let filterAll = this._elem.domElement.shadowRoot.getElementById('filter-all');
    let filterActive = this._elem.domElement.shadowRoot.getElementById('filter-active');
    let filterCompleted = this._elem.domElement.shadowRoot.getElementById('filter-completed');

    // Hack: CSSClass not working
    filterAll.classList[(this.filterBy == FilterByTypes.all) ? 'add' : 'remove']('selected');
    filterActive.classList[(this.filterBy == FilterByTypes.active) ? 'add' : 'remove']('selected');
    filterCompleted.classList[(this.filterBy == FilterByTypes.completed) ? 'add' : 'remove']('selected');

    this.toDoService.filter(this.filterBy);
  }
}
