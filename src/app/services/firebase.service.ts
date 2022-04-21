import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  addDoc,
  Firestore
} from '@angular/fire/firestore';

import { collection } from 'firebase/firestore';

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

  handleLogin(email, password) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((response: any)=> {
        console.log(response.user)
      })
      .catch((err) => {
        alert(err.message);
      })
  }

}

export class FirestoreData {
  constructor ( public firestore: Firestore ) { }

  addData(value: any) {
    const dbInstance = collection(this.firestore, 'users');
    addDoc(dbInstance, value)
      .then( () => {
        alert('Data sent')
      })
      .catch( (err) => {
        alert(err.message)
      })
  }
}
