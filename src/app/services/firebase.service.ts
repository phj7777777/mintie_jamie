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
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor( public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {	}

  // Auth Logic starts here
  async handleRegister(email, password) {
    const res = await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Register Failed!',
          text: err.message.replace('Firebase:', ''),
          showConfirmButton: false,
          timer: 3000
        });
        return null;
      })

    return res.user;
  }

  async handleLogin(email, password) {
    const res =  await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: err.message.replace('Firebase:', ''),
          showConfirmButton: false,
          timer: 3000
        });
        return null;
      })

    return res.user

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
