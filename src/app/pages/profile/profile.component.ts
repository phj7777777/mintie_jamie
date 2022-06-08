import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'molla-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  form = new FormGroup({

    // firstName: new FormControl( "", [
    //   Validators.required,
    //   Validators.minLength(6),
    // ] ),
  });

  get firstName() {
    return this.form.get("firstName");
  };

  async update() {
    console.log("Updating")
    await this.firebaseService.updateData({ firstName: this.form.get('firstName').value } )
  }

  async logout(){
    await this.firebaseService.handleLogout();
    await this.router.navigate(['/auth/home'])
  }
  constructor(private router: Router, public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }



}
