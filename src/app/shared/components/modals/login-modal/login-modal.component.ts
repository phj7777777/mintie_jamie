import { Component, OnInit } from '@angular/core';
// import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
  })
  
  export class FirebaseService {
  
	isLoggedIn = false
	constructor(public firebaseAuth : AngularFireAuth) { }
	async signin (email: string, password: string) {
		await this.firebaseAuth.signInWithEmailAndPassword(email,password)
		.then(res=>{
		  this.isLoggedIn = true
		  localStorage.setItem('user', JSON.stringify(res.user))
		})
	}
  
	async signup (email: string, password: string) {
		await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
		.then(res=>{
		  this.isLoggedIn = true
		  localStorage.setItem('user', JSON.stringify(res.user))
		})
	}
  
	logout(){
	  this.firebaseAuth.signOut()
	  localStorage.removeItem('user')
	}
  }

@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

  export class LoginModalComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
}

export class AppComponent {
	title = 'test';
	isSignedIn = false
	constructor(public firebaseService : FirebaseService){}
	ngOnInit() {
	  if(localStorage.getItem('user')!= null)
	  this.isSignedIn = true
	  else
	  this.isSignedIn = false
	}
  
	async onSignup(email:string, password:string) {
	  await this.firebaseService.signup(email,password)
	  if (this.firebaseService.isLoggedIn)
	  this.isSignedIn = true
	}
  
	async onSignin(email:string, password:string) {
	  await this.firebaseService.signin(email,password)
	  if (this.firebaseService.isLoggedIn)
	  this.isSignedIn = true
	}
  
	handleLogout() {
	  this.isSignedIn = false
	}
  }