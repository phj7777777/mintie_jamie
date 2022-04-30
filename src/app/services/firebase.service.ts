import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc
} from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor( public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {	}

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

  async handleLogin(email, password) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((response: any)=> {
        return response.user;
      })
      .catch((err) => {
        alert(err.message);
        return null;
      })
  }

  resetPassword(email) {
    this.firebaseAuth.sendPasswordResetEmail(email)
      // .then(() => {
      //   alert('Data Sent')
      // })
  }

  addData(value:any) {
    this.firestore.collection('users').add(value)
     .then(() => {
          alert('Data Sent')
        })
        .catch((err) => {
          alert(err.message)
        })
      console.log("hi")

  }

}
