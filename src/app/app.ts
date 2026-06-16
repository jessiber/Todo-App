import { Component } from '@angular/core';

import { TodoAppComponent } from './todo/todo-app.component';

@Component({
  selector: 'app-root',
  imports: [TodoAppComponent],
  templateUrl: './app.root.html',
  styleUrl: './app.css'
})
export class App { }
