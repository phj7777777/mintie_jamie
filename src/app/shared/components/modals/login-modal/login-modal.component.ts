import { Component, OnInit } from '@angular/core';
import { FirebaseService } from  'src/app/shared/services/firebase.service'
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

	userForm = new FormGroup({
		email: new FormControl(),
		password: new FormControl()
	});

	constructor(private FirebaseService: FirebaseService) { }

	ngOnInit(): void {}

	register () {
		this.FirebaseService.handleRegister(this.userForm.get('email').value, this.userForm.get('password').value)
	}

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}

}
