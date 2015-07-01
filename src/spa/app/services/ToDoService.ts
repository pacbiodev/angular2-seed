/// <reference path="../../../../typings/tsd.d.ts" />

import {bind, Inject} from 'angular2/angular2';
import {ListWrapper} from 'angular2/src/facade/collection';

// base model for RecordStore
export class KeyModel {
  constructor(public key: number) {
  }
}

export class ToDo extends KeyModel {
  constructor(key: number, public title: string, public completed: boolean, public created: Date) {
    super(key);
  }
}

export class ToDoFactory {
  private _uid: number = 0;
  private nextUid(): number { return ++this._uid; }

  create(title: string, isCompleted: boolean): ToDo {
    return new ToDo(this.nextUid(), title, isCompleted, new Date());
  }
}

// Store manages any generic item that inherits from KeyModel
export class ToDoService {
  list: List<KeyModel> = [];

  add(record: KeyModel): void {
    this.list.push(record);
  }

  remove(record: KeyModel): void {
    this._spliceOut(record);
  }

  removeBy(callback: Function): void {
    var records = ListWrapper.filter(this.list, callback);
    ListWrapper.removeAll(this.list, records);
  }

  private _spliceOut(record: KeyModel) {
    var i = this._indexFor(record);
    if (i > -1) {
      return ListWrapper.splice(this.list, i, 1)[0];
    }
    return null;
  }

  private _indexFor(record: KeyModel) {
    return this.list.indexOf(record);
  }
}

export var toDoInjectables = [
  bind(ToDoFactory).toClass(ToDoFactory),
  bind(ToDoService).toClass(ToDoService)
];
