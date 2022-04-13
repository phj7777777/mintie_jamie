import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { 
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword 
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
    
    constructor( public auth: Auth) {	}
    
    // Auth Logic starts here
	handleRegister(email, password) {
		createUserWithEmailAndPassword(this.auth, email, password)
		.then((response: any)=> {
			console.log(response.user)
		})
		.catch((err) => {
			alert(err.message);
		})
	}

    handleLogin(value:any) {
        signInWithEmailAndPassword(this.auth, value.email, value.password)
        .then((response: any)=> {
			console.log(response.user)
		})
		.catch((err) => {
			alert(err.message);
		})
    }
}

