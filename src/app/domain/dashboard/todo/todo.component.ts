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
  isLoading = false;
  isSaving = false;
  isUpdating = false;
  isDeleting = false;
  error: any;
  fatchTodoErrorMessage = "Something went worng. Not able to load todos.";
  addTodoErrorMessage = "Something went worng. Not able to add todo.";
  deleteTodoErrorMessage = "Something went worng. Not able to delete todo.";
  completeTodoErrorMessage = "Something went worng. Not able to complete todo.";
  uncompleteTodoErrorMessage = "Something went worng. Not able to uncomplete todo." ;
  archiveTodoErrorMessage = "Something went worng. Not able to archive todo.";

  constructor(private _baConfig: BaThemeConfigProvider, private _todoService: TodoService) {
    this.fatchTodos();
  }

  fatchTodos(): void {
    this.isLoading = true;
    this._todoService.getTodos().subscribe(results => {
      this.todoList = results.data.map((element: any) => Todo.fromObject(element))
                                  .filter((item: Todo) => item.isArchived === !this.isActiveShown);
      this.isLoading = false;
    }, errorResponse => this.handleError({
      response: errorResponse, message: this.fatchTodoErrorMessage
    }));
  }

  addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() !== '') {
      this.isSaving = true;
      const item = Todo.fromObject({
        description: this.newTodoText
      });
      this._todoService.saveTodo(item).subscribe(() => {
        this.isSaving = false;
        this.fatchTodos();
        this.newTodoText = '';
      }, errorResponse => this.handleError({
        response: errorResponse, message: this.addTodoErrorMessage
      }));
    }
  }

  deleteTodoItem(id: number) {
    this.isDeleting = true;
    this._todoService.deleteTodo(id).subscribe(() => {
      this.isDeleting = false;
      this.fatchTodos();
    }, errorResponse => this.handleError({
      response: errorResponse, message: this.deleteTodoErrorMessage
    }));
  }

  checkTodoItem(id: number) {
    this.isUpdating = true;
    this._todoService.completeTodo(id).subscribe(() => {
      this.isUpdating = false;
      this.fatchTodos();
    }, errorResponse => this.handleError({
      response: errorResponse, message: this.completeTodoErrorMessage
    }));
  }

  uncheckTodoItem(id: number) {
    this.isUpdating = true;
    this._todoService.uncompleteTodo(id).subscribe(() => {
      this.isUpdating = false;
      this.fatchTodos();
    }, errorResponse => this.handleError({
       response: errorResponse, message: this.uncompleteTodoErrorMessage
      }));
  }

  archiveTodoItem(id: number) {
    this.isUpdating = true;
    this._todoService.archiveTodo(id).subscribe(() => {
      this.isUpdating = false;
      this.fatchTodos();
    }, errorResponse => this.handleError({
       response: errorResponse, message: this.archiveTodoErrorMessage
      }));
  }

  switchTodos(): void {
    this.isActiveShown = !this.isActiveShown;
    this.fatchTodos();
  }

  private handleError(error: any) {
    console.log(error.response);
    this.error = error.message;
    this.isLoading = false;
    this.isSaving = false;
    this.isUpdating = false;
    this.isDeleting = false;
  }
}
