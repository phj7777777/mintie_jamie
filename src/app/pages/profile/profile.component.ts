import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'molla-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  async logout(){
    await this.firebaseService.handleLogout();
    await this.router.navigate(['/auth/home'])
  }

}
