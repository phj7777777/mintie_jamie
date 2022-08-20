import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { CartService } from 'src/app/shared/services/cart.service';

declare var $: any;

@Component({
	selector: 'shop-checkout-page',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {

	form = new FormGroup({
		first_name: new FormControl('', [
			Validators.required,
		]),
		last_name: new FormControl('', [
			Validators.required,
		]),
		address_line1: new FormControl('', [
			Validators.required,
		]),
		country: new FormControl('', [
			Validators.required,
		]),
		state: new FormControl('', [
			Validators.required,
		]),
		city: new FormControl('', [
			Validators.required,
		]),
		zip_code: new FormControl('', [
			Validators.required,
		]),
		phone: new FormControl('', [
			Validators.required,
		]),
		email: new FormControl('', [
			Validators.required,
			Validators.email
		]),
	  });

	get first_name() {
	return this.form.get("first_name")
	};
	get last_name() {
		return this.form.get("last_name");
	};
	get address_line1() {
		return this.form.get("address_line1");
	};
	get address_apartment() {
		return this.form.get("address_apartment");
	};
	get country() {
		return this.form.get("country");
	};
	get state() {
		return this.form.get("state");
	};
	get city() {
		return this.form.get("city");
	};
	get zip_code() {
		return this.form.get("zip_code");
	};
	get phone() {
		return this.form.get("phone");
	};
	get email() {
		return this.form.get("email");
	};

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


	form2 = new FormGroup(
		{
			coupon: new FormControl('', []),
		}
	)
	coupun() {

	}

	checkout() {
		if (this.form.valid) {
			console.log("Checkout successful")
		}
		else {
			this.validateAllFormFields(this.form);
		}

	}
	cartItems = [];

	private subscr: Subscription;

	constructor(public cartService: CartService) {
	}

	ngOnInit(): void {
		this.subscr = this.cartService.cartStream.subscribe(items => {
			this.cartItems = items;
		});

		document.querySelector('body').addEventListener("click", () => this.clearOpacity())
	}

	ngOnDestroy(): void {
		this.subscr.unsubscribe();
		document.querySelector('body').removeEventListener("click", () => this.clearOpacity())
	}

	clearOpacity() {
		let input: any = document.querySelector('#checkout-discount-input');
		if (input && input.value == "") {
			let label: any = document.querySelector('#checkout-discount-form label');
			label.removeAttribute('style');
		}
	}

	addOpacity(event: any) {
		event.target.parentElement.querySelector("label").setAttribute("style", "opacity: 0");
		event.stopPropagation();

	}

	formToggle(event: any) {
		const parent: HTMLElement = event.target.closest('.custom-control');
		const submenu: HTMLElement = parent.closest('.form-group').querySelector('.shipping-info');

		if (parent.classList.contains('open')) {
			$(submenu).slideUp(300, function () {
				parent.classList.remove('open');
			});
		}
		else {
			$(submenu).slideDown(300, function () {
				parent.classList.add('open');
			});
		}

		event.preventDefault();
		event.stopPropagation();
	}
}
