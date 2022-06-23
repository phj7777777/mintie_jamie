import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'molla-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    password: new FormControl('', []),
    newPassword: new FormControl('', []),
    address_line1: new FormControl('', []),
    address_apartment: new FormControl('', []),
    country: new FormControl('', []),
    state: new FormControl('', []),
    zip_code: new FormControl('', []),
  });


  // read data from firebase
  async getData() {
    if (this.firebaseService.userData) {
      const uid = this.firebaseService.userData.uid;

    }
  }

  get firstName() {
    return this.form.get('firstName');
  };

  async update() {
    console.log('Updating');
    if (this.firebaseService.userData) {
      const uid = this.firebaseService.userData.uid;
      console.log(this.form.get('firstName').value)
      console.log(uid)
      await this.firebaseService.updateData('users', uid,
        {
          firstName: this.form.get('firstName').value,
          lastName: this.form.get('lastName').value,
          address_line1: this.form.get('address_line1').value,
          address_apartment: this.form.get('address_apartment').value,
          country: this.form.get('country').value,
          state: this.form.get('state').value,
          zip_code: this.form.get('zip_code').value,
        }
      );
      }
    }

  async logout() {
    await this.firebaseService.handleLogout();
    await this.router.navigate(['/auth/home']);
  }

  constructor(private router: Router, public firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    console.log(this.firebaseService.userData)
    
    // if (this.firebaseService.userData.firstName != null) {
    //   this.form.setValue({
    //     firstName: this.firebaseService.userData.firstName,
    //     lastName: this.firebaseService.userData.lastName,
    //     address_line1: this.firebaseService.userData.address_line1,
    //     address_apartment: this.firebaseService.userData.address_apartment,
    //     country: this.firebaseService.userData.country,
    //     state: this.firebaseService.userData.state,
    //     zip_code: this.firebaseService.userData.zip_code,
    //   });
    // }
  }

}
