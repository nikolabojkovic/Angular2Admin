import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'todo',
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class TodoComponent {

  dashboardColors = this._baConfig.get().colors.dashboard;

  todoList: Todo[];
  newTodoText: string = '';
  isActiveShown = true;
  error: any;

  constructor(private _baConfig: BaThemeConfigProvider, private _todoService: TodoService) {
    this.fatchTodos();
  }

  fatchTodos(): void {
    this._todoService.getTodos().subscribe(results => {
      this.todoList = results.data.map((element: any) => Todo.fromObject(element))
                                  .filter((item: Todo) => item.isArchived === !this.isActiveShown);
    }, errorResponse => this.error = "Someting is worng. Not able to load todos.");
  }

  addToDoItem($event) {

    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() !== '') {
      const item = Todo.fromObject({
        description: this.newTodoText
      });
      this._todoService.saveTodo(item).subscribe(() => {
        this.fatchTodos();
        this.newTodoText = '';
      }, errorResponse => this.error = "Someting is worng. Not able to add todo.");
    }
  }

  deleteTodoItem(id: number) {
    this._todoService.deleteTodo(id).subscribe(() => {
      this.fatchTodos();
    }, errorResponse => this.error = "Someting is worng. Not able to delete todo.");
  }

  checkTodoItem(id: number) {
    this._todoService.completeTodo(id).subscribe(() => {
      this.fatchTodos();
    }, errorResponse => this.error = "Someting is worng. Not able to complete todo.");
  }

  uncheckTodoItem(id: number) {
    this._todoService.uncompleteTodo(id).subscribe(() => {
      this.fatchTodos();
    }, errorResponse => this.error = "Someting is worng. Not able to uncomplete todo.");
  }

  archiveTodoItem(id: number) {
    this._todoService.archiveTodo(id).subscribe(() => {
      this.fatchTodos();
    }, errorResponse => this.error = "Someting is worng. Not able to archive todo.");
  }

  switchTodos(): void {
    this.isActiveShown = !this.isActiveShown;
    this.fatchTodos();
  }
}
