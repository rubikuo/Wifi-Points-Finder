import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { SWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core/src/metadata/ng_module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user = fireAuth.authState;
   }


signUp(email: string, password: string) {
  this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
  .then(value => {
    console.log(value);

    return value;
  })
  .catch(err => {
    console.log(err);

    return err;
  });
  }
  login(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {


    })
    .catch(err => {
      console.log(err);

    });
  }

  signOut() {
    this.fireAuth.auth.signOut();
  }
}
