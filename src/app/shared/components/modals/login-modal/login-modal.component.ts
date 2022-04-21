import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../../../services/firebase.service';

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
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {}

  register () {
    this.firebaseService.handleRegister(this.form.get('email').value, this.form.get('password').value)
    this.firebaseService.addData({ email: 'email', password: 'password'})
  }

  login () {
    this.firebaseService.handleLogin(this.form.get('email').value, this.form.get('password').value)
    // console.log(this.form.get('email').value)
    // console.log(this.form.get('password').value)
    
  }

  closeModal() {
    let modal = document.querySelector('.login-modal') as HTMLElement;
    if (modal)
      modal.click();
  }
}

