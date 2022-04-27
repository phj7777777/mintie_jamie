import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root'
  })


@Component({
  selector: 'molla-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl( "", [
      Validators.required,
      Validators.email
    ] ),
  });

  get email() {
    return this.form.get("email");
  };

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  forgetPassword() {
    console.log("Reset password")
    this.firebaseService.resetPassword(this.form.get('email').value)
    console.log(this.form.get('email').value)
  }
}
