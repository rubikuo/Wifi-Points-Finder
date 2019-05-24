import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  fireUser: any;
  title: '';
  description: '';
  infos: any[];


 constructor(private db: AngularFireDatabase, private auth: AuthService) {
   this.auth.user.subscribe(user => {
     if (user === null) {
       this.fireUser = null;
     } else {
       this.fireUser = user.uid;
       const ref = this.db.list(`/users/${this.fireUser}/contact`);
       ref.valueChanges().subscribe(value => {
         console.log (value);
         this.infos = value;

       });
     }
   });
 }

 ngOnInit() {

 }

 addComment(form: NgForm) {
   const pushComment = this.db.list(`/users/${this.fireUser}/contact`);
   pushComment.push({
     title: this.title,
     description: this.description
   });
 }

}
