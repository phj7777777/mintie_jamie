import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';
import {switchMap} from 'rxjs/operators';
import {StripeService} from 'ngx-stripe';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

declare var $: any;
declare var Stripe;

@Component({
	selector: 'shop-checkout-page',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {

	cartItems = [];

	private subscr: Subscription;

	constructor(public cartService: CartService,private http: HttpClient,
              private stripeService: StripeService) {

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

  checkout(): void {

    const stripe = Stripe(environment.STRIPE_PUBLIC_KEY);

    this.http.post('http://localhost:8080/create-checkout-session', {carts: this.cartItems})
      .subscribe(result => {
        stripe.redirectToCheckout({
          sessionId: result['id'],
        }).then(function (result) {
          alert(result.error.message);
        });
      });
  }


}
