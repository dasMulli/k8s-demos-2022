import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoItem } from '../todo-item';
import { TodoRepository } from '../todo-repository.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit, OnDestroy {

  toDoForm: FormGroup;

  public isLoggedIn = false;

  private authSubscription: Subscription;

  constructor(private fb: FormBuilder, private repository: TodoRepository, private oAuthService: OAuthService) {
    this.toDoForm = fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]],
      completeUntil: new Date()
    });
  }

  ngOnInit() {
    this.authSubscription = this.oAuthService.events.subscribe(() => this.updateAuthState());
    this.updateAuthState();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateAuthState() {
    this.isLoggedIn = this.oAuthService.hasValidAccessToken();
  }

  submit() {
    if (!this.toDoForm.valid) {
      return;
    }

    const value = this.toDoForm.value;
    const toDoItem: ToDoItem = {
      id: 0,
      text: value.text,
      completeUntil: value.completeUntil,
      name: null,
      email: null
    };

    this.repository.add(toDoItem).subscribe();

    this.toDoForm.reset();
    this.toDoForm.patchValue({
      completeUntil: new Date()
    });
  }

  get text() {
    return this.toDoForm.get('text');
  }

  get name() {
    return this.toDoForm.get('name');
  }

  get email() {
    return this.toDoForm.get('email');
  }

}
