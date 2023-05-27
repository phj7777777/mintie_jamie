import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError } from 'rxjs/operators';
import Swal from "sweetalert2";
import { ContactService } from 'src/app/contact.service';


@Injectable({
	providedIn: 'root'
  })

@Component({
	selector: 'pages-contact-one',
	templateUrl: './contact-one.component.html',
	styleUrls: ['./contact-one.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactOnePageComponent implements OnInit {
	apiLoaded: Observable<boolean>;

	constructor(httpClient: HttpClient, private builder: FormBuilder, private contact:
		ContactService) {

	}

	form = new FormGroup({
		name: new FormControl( "", [
			Validators.required
		]),
		email: new FormControl( "", [
			Validators.required,
			Validators.email
		]),
		phone: new FormControl( "", []),
		subject: new FormControl( "", [
			Validators.required
		]),
		message: new FormControl( "", [
			Validators.required
		])
	});

	get name() {
		return this.form.get("name")
	};
	get email() {
		return this.form.get("email");
	};
	get phone() {
		return this.form.get("phone");
	};
	get subject() {
		return this.form.get("subject");
	};
	get message() {
		return this.form.get("message");
	};

	async contactUs(FormData) {
		if (this.form.valid) {
			this.contact.PostMessage(FormData)
			.subscribe( async response => {
        await Swal.fire({
          icon: 'success',
          title: 'Enquiry Sent Successfully!',
          text: 'Thank you! We will contact you shortly :)',
          showConfirmButton: false,
          timer: 3000
        });
        this.form.reset();
        console.log(response)
      }, error => {
				console.warn(error.responseText)
				console.log( { error })
			})

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

	ngOnInit(): void {
	}
}
