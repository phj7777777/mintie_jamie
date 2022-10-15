import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService} from "../../../services/firebase.service";

@Component({
	selector: 'pages-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPageComponent implements OnInit {

  userData: any;

	constructor(private router: Router, public firebaseService: FirebaseService) {
    this.userData = this.firebaseService.userData;
    console.log(this.userData)

    if(this.userData?.uid != null){
      this.router.navigate(['/auth/profile']);
    }

	}

	ngOnInit(): void {
	}
}
