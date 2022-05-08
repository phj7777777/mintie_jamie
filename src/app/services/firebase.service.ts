import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc
} from '@angular/fire/firestore';
import {setDoc} from 'firebase/firestore';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  userData: any;

  constructor(public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
      } else {
        this.userData = null;
      }
    });

  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    return this.userData != null && this.userData != undefined;
  }

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
      });

    return res.user;
  }

  async handleLogin(email, password) {
    const res = await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: err.message.replace('Firebase:', ''),
          showConfirmButton: false,
          timer: 3000
        });
        return null;
      });

    return res.user;

  }

  async handleLogout(){
    await this.firebaseAuth.signOut()
  }

  async resetPassword(email) {
    if (email) {

      let success = true;
      await this.firebaseAuth.sendPasswordResetEmail(email).catch((err) => {
        success = false;
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: err.message.replace('Firebase:', ''),
          showConfirmButton: false,
          timer: 3000
        });
        return null;
      });

      if (success) {
        await Swal.fire({
          icon: 'success',
          title: 'Reset email sent!',
          text: 'Please check your email now!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    }

  }

  addData(value: any) {
    this.firestore.collection('users').add(value)
      .then(() => {
        alert('Data Sent');
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log('hi');

  }

}
