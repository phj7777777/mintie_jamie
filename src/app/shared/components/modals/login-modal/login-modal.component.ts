import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../../../services/firebase.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Injectable({
	providedIn: 'root'
  })


@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()

  title = 'test';
  isSignedIn = false

  form = new FormGroup({
    email: new FormControl( "", [
      Validators.required,
      Validators.email
    ] ),
    password: new FormControl( "", [
      Validators.required,
      Validators.minLength(6),
    ] )
  }); 

  get email() {
    return this.form.get("email");
  };

  get password() {
    return this.form.get("password")
  }

  constructor(private firebaseService: FirebaseService, private router:Router) { }

  ngOnInit(): void {}

  register () {
    this.firebaseService.handleRegister(this.form.get('email').value, this.form.get('password').value)
    this.firebaseService.addData({ email: this.form.get('email').value, password: this.form.get('password').value})
    this.router.navigate(['/auth/home'])
  }

  login() {
    this.firebaseService.handleLogin(this.form.get('email').value, this.form.get('password').value)
    this.router.navigate(['/auth/home'])

  }

  resetPassword() {
    console.log("Hi")
    this.firebaseService.resetPassword(this.form.get('email').value)
    console.log(this.form.get('email').value)
  }

  closeModal() {
    let modal = document.querySelector('.login-modal') as HTMLElement;
    if (modal)
      modal.click();
  }
}

