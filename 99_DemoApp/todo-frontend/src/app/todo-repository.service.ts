import { Injectable, Inject } from '@angular/core';
import { ToDoItem } from './todo-item';
import { Subject } from 'rxjs';
import { map, tap, repeatWhen } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/baseUrl';

@Injectable()
export class TodoRepository {
  private refreshSubject = new Subject<any>();

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

  public get todoItems$() {
    return this.http.get<ToDoItem[]>(`${this.baseUrl}api/todos`)
      .pipe(
        tap(items => {
          items.forEach(item => item.completeUntil = new Date(item.completeUntil));
        }),
        repeatWhen(_ => this.refreshSubject.asObservable())
      );
  }

  public add(item: ToDoItem) {
    return this.http.post(`${this.baseUrl}api/todos`, item)
    .pipe(
      tap(item => this.refreshSubject.next(item))
    )
    ;
  }

  public remove(itemId: number) {
    return this.http.delete(`${this.baseUrl}api/todos/${itemId}`)
      .pipe(
        tap(item => this.refreshSubject.next(item))
      );
  }

  public findItem(itemId: number) {
    return this.http.get<ToDoItem>(`${this.baseUrl}api/todos/${itemId}`)
    .pipe(
      map(item => item.completeUntil = new Date(item.completeUntil))
    );
  }

  public delete(itemId: number) {
    return this.http.delete(`${this.baseUrl}api/todos/${itemId}`)
    .pipe(
      tap(item => this.refreshSubject.next(item))
    );
  }
}
