import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, homeData} from '../data';
import { shopData } from '../../shop/shared/data';

declare var $:any;

@Component({
	selector: 'molla-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

	products = [];
	displayProducts = [];
	loaded = false;
	introSlider = introSlider;
	homeData = homeData;
	shopData = shopData;
	totalCount = 0;
	params = {};
	priceRange: any = [0, 100];
	isToggle = false;
	loadMoreLoading = false;
	perPage = 8;
	isotopeOption = {
		itemSelector: '.product-item',
		layoutMode: 'fitRows',
		masonry: {
			columnWidth: '.grid-sizer'
		}
	}
	curentFilter = 'all';

	@ViewChild('priceSlider') priceSlider: any;
	@ViewChild('isotope') isotope: any;

	constructor(public apiService: ApiService, public utilsService: UtilsService, private modalService: ModalService, public activeRoute: ActivatedRoute, public router: Router) {
		this.modalService.openNewsletter();

		activeRoute.queryParams.subscribe(params => {
			this.loaded = false;
			this.params = params;

			if (params['minPrice'] && params['maxPrice']) {
				this.priceRange = [
					params['minPrice'] / 10,
					params['maxPrice'] / 10
				]
			} else {
				this.priceRange = [0, 100];

				if(this.priceSlider) {
					this.priceSlider.slider.reset({min: 0, max: 100});
				}
			}

			this.apiService.fetchShopData(params, 8).subscribe(result => {
				this.products = result.products;
				this.displayProducts = result.products;
				this.totalCount = result.totalCount;

				this.loaded = true;

				if( this.isotope ) {
					this.isotope.dataChange = true;
					this.isotope.isReset = true;
				}
			})
		})
	}

	ngOnInit(): void {
		if (window.innerWidth < 992) {
			this.isToggle = true;
		} else {
			this.isToggle = false;
		}
	}

	@HostListener('window: resize', ['$event'])
	onResize(event) {
		if (window.innerWidth < 992) {
			this.isToggle = true;
		} else {
			this.isToggle = false;
		}
	}

	containsAttrInUrl(type: string, value: string) {
		const currentQueries = this.params[type] ? this.params[type].split(',') : [];
		return currentQueries && currentQueries.includes(value);
	}

	getUrlForAttrs(type: string, value: string) {
		let currentQueries = this.params[type] ? this.params[type].split(',') : [];
		currentQueries = this.containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];
		return currentQueries.join(',');
	}

	onAttrClick(attr: string, value: string) {
		this.router.navigate([], { queryParams: { [attr]: this.getUrlForAttrs(attr, value), page: 1 }, queryParamsHandling: 'merge' });
	}

	filterPrice() {
		this.router.navigate([], { queryParams: { minPrice: this.priceRange[0] * 10, maxPrice: this.priceRange[1] * 10, page: 1 }, queryParamsHandling: 'merge' });
	}

	changeFilterPrice(value: any) {
		this.priceRange = [value[0], value[1]];
	}

	filterToggle( $event ) {
		$event.preventDefault();
		$event.currentTarget.classList.toggle( "active" );
		if($event.currentTarget.classList.contains('active')) {
			document.querySelector('.toolbox-right').classList.add('d-none');
		} else {
			document.querySelector('.toolbox-right').classList.remove('d-none');
		}

		$( "#product-filter-area" ).slideToggle( 'fast' );
	}

	sortByChange($event, value: string) {
		this.router.navigate([], { queryParams: { orderBy: value, page: 1 }, queryParamsHandling: 'merge' });
	}

	getProductCategory(product: Product) {
		let temp = ['decoration', 'furniture', 'electronics', 'lighting'];
		return product.category.reduce((acc, cur) => {
			return acc + " " + cur.slug;
		}, "product-item col-6 col-md-4 col-lg-3 " + temp[Math.round(product.id % 4)]);
	}

	loadMore( ) {
		if ( this.products.length < this.totalCount ) {
			this.loadMoreLoading = true;

			setTimeout( () => {
				this.apiService.fetchShopData( this.params, 4, 'shop?from=' + this.perPage ).subscribe( result => {
					this.products = [ ...this.products, ...result.products ];
					if(this.curentFilter == 'all') {
						this.displayProducts = [...this.products];
					} else {
						this.displayProducts = this.products.filter(product => this.getProductCategory(product).includes(this.curentFilter));
					}
					this.totalCount = result.totalCount;
					this.loadMoreLoading = false;
					this.isotope.dataChange = true;
					this.isotope.isReset = true;
				} )

				this.perPage += 4;
			}, 500 );
		}
	}

	trackByFn ( index: number, item: any ) {
		if ( !item ) return null;
		return item.slug;
	}

	toggleSidebar ( ) {
        if (
            document
                .querySelector( 'body' )
                .classList.contains( 'sidebar-filter-active' )
        ) {
            document
                .querySelector( 'body' )
                .classList.remove( 'sidebar-filter-active' );
            document
                .querySelector( '#product-filter-area' )
                .classList.remove( 'active' );
        } else {
            document
                .querySelector( 'body' )
                .classList.add( 'sidebar-filter-active' );
            document
                .querySelector( '#product-filter-area' )
                .classList.add( 'active' );
        }
    }

	hideSidebar () {
        document
            .querySelector( 'body' )
            .classList.remove( 'sidebar-filter-active' );

        document
            .querySelector( '#product-filter-area' )
            .classList.remove( 'active' );
    }

	showSidebar ( ) {
        document
            .querySelector( 'body' )
            .classList.add( 'sidebar-filter-active' );
        document
            .querySelector( '#product-filter-area' )
            .classList.add( 'active' );
    }

	filterProducts($event: Event, value: string) {
		this.curentFilter = value;
		let parent = ($event.currentTarget as HTMLElement).parentElement.parentElement;
		parent.querySelector('.active').classList.remove('active');
		($event.currentTarget as HTMLElement).parentElement.classList.add('active');
		$event.preventDefault();

		if(value == 'all') {
			this.displayProducts = [...this.products];
		} else {
			this.displayProducts = this.products.filter(product => this.getProductCategory(product).includes(value));
		}
		this.isotope.isReset = true;
	}

}
