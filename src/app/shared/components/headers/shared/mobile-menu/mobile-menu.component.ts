import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import {FirebaseService} from '../../../../../services/firebase.service';


declare var $: any;

@Component({
	selector: 'molla-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class MobileMenuComponent implements OnInit, OnDestroy {

	searchTerm = "";

	current = '/';

  isLoggedIn = false

	private subscr: Subscription;

	// constructor(private router: Router) {
	// 	this.subscr = this.router.events.subscribe(event => {
	// 		if (event instanceof NavigationStart) {
	// 			this.hideMobileMenu();
	// 		}
	// 	});
	// }
	constructor(private router: Router, public firebaseService: FirebaseService) {



		this.subscr = this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
        this.hideMobileMenu();
			} else if (event instanceof NavigationEnd) {
				this.current = event.url;
			}
		});
	}


	ngOnInit(): void {

	}

	ngOnDestroy(): void {
		this.subscr.unsubscribe();

	}

	submenuToggle(e) {
		const parent: HTMLElement = e.target.closest('li');
		const submenu: HTMLElement = parent.querySelector('ul');

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

		e.preventDefault();
		e.stopPropagation();
	}

	hideMobileMenu() {
		document.querySelector('body').classList.remove('mmenu-active');
		document.querySelector('html').removeAttribute('style');
	}

	submitSearchForm(e: any) {

    const val = e.currentTarget.querySelector('.form-control').value;

    if (val.length >= 2){
      e.preventDefault();

      this.searchTerm = e.currentTarget.querySelector('.form-control').value;
      this.router.navigate(['/shop/sidebar/list'], { queryParams: { searchTerm: this.searchTerm } });
    }
    e.currentTarget.querySelector('.form-control').value = null

	}
}
