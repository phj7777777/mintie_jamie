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
          firstName: this.form.get('firstName').value
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
  }


}
