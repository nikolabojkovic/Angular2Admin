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
