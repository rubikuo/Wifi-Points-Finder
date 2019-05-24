import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
// tslint:disable-next-line: max-line-length
   user: Observable<firebase.User>; // Observable is a syncronize way to looking for a value, in this case is to look for the authenticated user
  // this need to load before the page loads
  constructor(public fAuth: AngularFireAuth, public router: Router) {
    this.user = this.fAuth.authState; // to sense if the user is log in or not
    console.log(this.user);
  }

  ngOnInit() {
  }
  // we create a signOut method
  signOut() {
    this.fAuth.auth.signOut(); // this "auth.signOut()" is a built-in method
    this.router.navigate(['/']); // after signOut this means to direct the page to the HOME page
  }

}
