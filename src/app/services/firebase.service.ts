import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import {first} from 'rxjs/operators';
import {CartService} from '../shared/services/cart.service';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  userData: any = {};

  constructor(public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore,  private cartService: CartService) {
    this.firebaseAuth.authState.subscribe(async (user) => {
      if (user) {
        const uid = user.uid;

        this.userData = await this.getData('users', uid);
        this.userData.uid = uid

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

  async handleLogout() {
    await this.firebaseAuth.signOut()
    await this.cartService.clearStore()
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

  addData(docId, value: any) {

    this.firestore.collection('users').doc(docId).set(value)
      .catch((err) => {
        alert(err.message);
      });
  }

  updateData(collection: any, doc: any, value: any) {
    this.firestore.collection(collection).doc(doc).update(value)
      .then(async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully updated!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        alert(err.message);
      });

  }

  async getData(collection: any, doc: any) {
    let result = await this.firestore.collection(collection).doc(doc).ref.get()
    if(result){
      return result.data()
    }

    return null;

  }


}
