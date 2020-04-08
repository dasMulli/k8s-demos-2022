import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoRepository } from './todo-repository.service';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginStatusComponent } from './login-status/login-status.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCreateComponent,
    LoginStatusComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    TodoRepository,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
