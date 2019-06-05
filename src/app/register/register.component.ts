import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // create variables:
  email: string;
  password: string;
  username: string;
  invalidForm: boolean;

  constructor(public fAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }
  register() {
    this.fAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password)
      // this create built-in method with two arguments : this.email & this.password
      .then(value => {
        // if this sucessful
        console.log(value);
        this.router.navigate(['/wifipoint']);
      })
      .catch(err => {
        this.invalidForm = true; // invalidForm is hard code we write in register.component.html "line 13"
      });

  }



}
