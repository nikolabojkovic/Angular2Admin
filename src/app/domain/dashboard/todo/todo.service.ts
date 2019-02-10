import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpService } from 'app/domain/shared/services/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {

  private todosEndPoint = 'todos';

  constructor(
    private httpService: HttpService
  ) {
  }

  private _todoList = [
    Todo.fromObject({ id: 1, description: 'Check me out' }),
    Todo.fromObject({ id: 2,
      description: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' }),
    Todo.fromObject({ id: 3, description: 'Ex has semper alterum, expetenda dignissim' }),
    Todo.fromObject({ id: 4, description: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' }),
    Todo.fromObject({ id: 5, description: 'Simul erroribus ad usu' }),
    Todo.fromObject({ id: 6, description: 'Ei cum solet appareat, ex est graeci mediocritatem' }),
    Todo.fromObject({ id: 7, description: 'Get in touch with akveo team' }),
    Todo.fromObject({ id: 8, description: 'Write email to business cat' }),
    Todo.fromObject({ id: 9, description: 'Have fun with blur admin' }),
    Todo.fromObject({ id: 10, description: 'What do you think?' }),
  ];

  // getTodoList(): Todo[] {
  //   // return this._todoList;
  // }

  getTodos(): Observable<any> {
    return this.httpService.get(this.todosEndPoint)
                           .map((res: Response) => res.json());
  }

  saveTodo(todo: Todo):  Observable<any> {
    return this.httpService.post(this.todosEndPoint, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.httpService.delete(`${this.todosEndPoint}/${id}`);
  }

  completeTodo(id: number): Observable<any> {
    return this.httpService.put(`${this.todosEndPoint}/complete/${id}`, {});
  }

  uncompleteTodo(id: number): Observable<any> {
    return this.httpService.put(`${this.todosEndPoint}/uncomplete/${id}`, {});
  }

  archiveTodo(id: number): Observable<any> {
    return this.httpService.put(`${this.todosEndPoint}/archive/${id}`, {});
  }
}
