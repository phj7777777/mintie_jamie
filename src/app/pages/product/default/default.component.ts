import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
	selector: 'product-default-page',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss']
})

export class DefaultPageComponent implements OnInit {

	product: Product;
  products: Product[];
	prev: Product;
	next: Product;
	related = [];
	loaded = false;
  isMobile: boolean;

  isotopeOption = {
    itemSelector: '.product-item',
    layoutMode: 'fitRows',
    masonry: {
      columnWidth: '.grid-sizer'
    }
  }

	constructor(
		public apiService: ApiService,
		private activeRoute: ActivatedRoute,
		public router: Router
	) {
		activeRoute.params.subscribe(params => {
			this.loaded = false;

			this.apiService.getSingleProduct(params['slug']).subscribe(result => {
				if (result === null) {
					this.router.navigate(['/pages/404']);
				}

				this.product = result.product;
				this.prev = result.prevProduct;
				this.next = result.nextProduct;
				this.related = result.relatedProducts;
				this.loaded = true;
			});

      this.apiService.fetchElementData().subscribe(items => {
        this.products = items;
        this.loaded = true;
      })
		});
	}

	ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
