import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root'
  })


@Component({
  selector: 'molla-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  form = new FormGroup({
    order: new FormControl( "", [
      Validators.required,
      Validators.minLength(6),

    ] ),
  });

  get order() {
    return this.form.get("order");
  };

  data = null
  status1 = null
  status2 = null
  status3 = null

  constructor(private firebaseService: FirebaseService) { }
  
  ngOnInit(): void {
  }

  checkStatus() {
    if (this.form.valid) {
      if (!(this.data)) {
        this.data = "abc";
        // this.status1 = "Order Received"
        this.status2 = "Shipping"
        // this.status3 = "Delivered"
      }
      else {
        this.data = "None";
      }
    }
    else {
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
