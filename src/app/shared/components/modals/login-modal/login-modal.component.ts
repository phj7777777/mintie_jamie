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
    ] ),
  });

  get email() {
    return this.form.get("email");
  };

  get password() {
    return this.form.get("password")
  }

  constructor(private firebaseService: FirebaseService, private router:Router) { }

  ngOnInit(): void {}

  async register() {
    if (this.form.valid) {
      const userInfo = await this.firebaseService.handleRegister(this.form.get('email').value, this.form.get('password').value)
      if (userInfo != null) {
        await this.router.navigate(['/auth/home'])
        await this.firebaseService.addData({ email: this.form.get('email').value, password: this.form.get('password').value})
      }
      else {
        this.validateAllFormFields(this.form);
      }
    }

  }

  async login() {
    if (this.form.valid) {
      const userInfo = await this.firebaseService.handleLogin(this.form.get('email').value, this.form.get('password').value)
      if (userInfo != null){
        await this.router.navigate(['/auth/home'])
      }
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }




}

