import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
   fireUser: any;
   title: '';
   description: '';
   todos: any[];


  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.user.subscribe(user => {
      if (user === null) {
        this.fireUser = null;
      } else {
        this.fireUser = user.uid;
        const ref = this.db.list(`/users/${this.fireUser}/todos`);
        ref.valueChanges().subscribe(value => {
          console.log (value);
          this.todos = value;

        });
      }
    });
  }

  ngOnInit() {

  }

  addTodo(form: NgForm) {
    const pushToDb = this.db.list(`/users/${this.fireUser}/todos`);
    pushToDb.push({
      title: this.title,
      description: this.description
    });
  }

}
