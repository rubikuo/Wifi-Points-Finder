import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  invalidForm: boolean;
  constructor(public router: Router, public fAuth: AngularFireAuth) { }

  ngOnInit() {
  }


  login() {
    this.fAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(value => {
    this.router.navigate(['/todo']);
    })
    .catch(err => {
      this.invalidForm = true;
    });
  }
}
