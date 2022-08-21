import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core'
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'molla-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: any;
  isUpdate = false;

  form = new FormGroup({
    first_name: new FormControl('', []),
    last_name: new FormControl('', []),
    address_line1: new FormControl('', []),
    address_apartment: new FormControl('', []),
    country: new FormControl('', []),
    state: new FormControl('', []),
    zip_code: new FormControl('', []),
  });

  constructor(private router: Router, public firebaseService: FirebaseService,private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {

    this.userData = this.firebaseService.userData;
    this.form.setValue({
      first_name: this.firebaseService.userData.first_name ?? '',
      last_name: this.firebaseService.userData.last_name ?? '',
      address_line1: this.firebaseService.userData.address_line1 ?? '',
      address_apartment: this.firebaseService.userData.address_apartment ?? '',
      country: this.firebaseService.userData.country ?? '',
      state: this.firebaseService.userData.state ?? '',
      zip_code: this.firebaseService.userData.zip_code ?? '',
    });

  }

  viewTab($event: Event, prevId: number, nextId: number) {
		$event.preventDefault();
		let nodes = this.el.nativeElement.querySelectorAll(".nav-dashboard .nav-link");
		this.renderer.removeClass(nodes[prevId], 'active');
		this.renderer.addClass(nodes[nextId], 'active');
	}


  async update(submit = false) {

      const uid = this.userData.uid;

      // Initial form variable
      const firstName = this.form.get('first_name').value;
      const lastName = this.form.get('last_name').value;
      const addressLine1 = this.form.get('address_line1').value;
      const addressApartment = this.form.get('address_apartment').value;
      const country = this.form.get('country').value;
      const state = this.form.get('state').value;
      const zipCode = this.form.get('zip_code').value;

      // Check if form change
      const firstNameChange = this.userData.first_name != firstName && firstName;
      const lastNameChange = this.userData.last_name != lastName && lastName;
      const addressLine1Change = this.userData.address_line1 != addressLine1 && addressLine1;
      const addressApartmentChange = this.userData.address_apartment != addressApartment && addressApartment;
      const countryChange = this.userData.country != country && country;
      const stateChange = this.userData.state != state && state;
      const zipCodeChange = this.userData.zip_code != zipCode && zipCode;


      let tempUserData = {};

      if (firstNameChange) {
        tempUserData['first_name'] = firstName;
      }
      if (lastNameChange) {
        tempUserData['last_name'] = lastName;
      }
      if (addressLine1Change) {
        tempUserData['address_line1'] = addressLine1;
      }
      if (addressApartmentChange) {
        tempUserData['address_apartment'] = addressApartment;
      }
      if (countryChange) {
        tempUserData['country'] = country;
      }
      if (stateChange) {
        tempUserData['state'] = state;
      }
      if (zipCodeChange) {
        tempUserData['zip_code'] = zipCode;
      }

      this.isUpdate = firstNameChange || lastNameChange || addressLine1Change || addressApartmentChange || countryChange || stateChange || zipCodeChange;

      // Pass in data field into tempUserData if form updated
      if (this.isUpdate && submit) {
        this.firebaseService.updateData('users', uid,
          tempUserData
        );

        this.firebaseService.userData = await this.firebaseService.getData('users', uid);
        this.firebaseService.userData.uid = uid;
        this.userData = this.firebaseService.userData;

      }

      console.log(this.isUpdate)


  }

  async logout() {
    await this.firebaseService.handleLogout();
    await this.router.navigate(['/auth/home']);
  }


}
