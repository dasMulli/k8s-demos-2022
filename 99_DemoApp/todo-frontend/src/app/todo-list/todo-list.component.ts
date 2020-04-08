import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../todo-item';
import { TodoRepository } from '../todo-repository.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public toDoItems$: Observable<ToDoItem[]>;

  constructor(private toDoRepository: TodoRepository) {
    this.toDoItems$ = toDoRepository.todoItems$;
  }

  ngOnInit() {
  }

  deleteToDoItem(id: number) {
    this.toDoRepository.delete(id).subscribe();
  }

}
