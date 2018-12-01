import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    const update = false;
    this.afAuth.user.subscribe(res => {
      console.log(res);
      // res.metadata['apk'] = 'abc';
      // this.afAuth.auth.updateCurrentUser(res);
    }, err => {
      console.log(err);
    });
  }


  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
