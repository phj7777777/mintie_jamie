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
  errorMessage = false

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  async checkStatus() {
    if (this.form.valid) {

      try {
        let order = await this.firebaseService.getData('orders', this.order.value);
        if (order) {
          this.data = order
          this.errorMessage = false
        } else {
          this.data = null
          this.errorMessage = true
        }

      } catch (e) {
        this.validateAllFormFields(this.form);
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
