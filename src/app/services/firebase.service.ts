import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor( public firebaseAuth : AngularFireAuth) {	}

  // Auth Logic starts here
  handleRegister(email, password) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((response: any)=> {
        console.log(response.user)
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  handleLogin(value:any) {
    this.firebaseAuth.signInWithEmailAndPassword(value.email, value.password)
      .then((response: any)=> {
        console.log(response.user)
      })
      .catch((err) => {
        alert(err.message);
      })
  }
}
