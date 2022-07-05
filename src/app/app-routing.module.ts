import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { ComingSoonPageComponent } from './pages/others/coming-soon/coming-soon.component';
import { IndexComponent } from './pages/home/index/index.component';
import {AuthGuard} from './shared/guard/auth.guard';

const routes: Routes = [
	{
		path: 'pages/coming-soon',
		component: ComingSoonPageComponent
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: IndexComponent,
			},
			{
				path: 'auth',
				loadChildren: () => import( './pages/auth/auth.module' ).then( m => m.AuthModule )
			},
			{
				path: 'admin',
				loadChildren: () => import( './pages/admin/admin.module' ).then( m => m.AdminModule )
			},
			{
				path: 'elements',
				loadChildren: () => import( './pages/elements/elements.module' ).then( m => m.ElementsModule )
			},
			{
				path: 'blog',
				loadChildren: () => import( './pages/blog/blog.module' ).then( m => m.BlogModule )
			},
			{
				path: 'pages',
				loadChildren: () => import( './pages/others/pages.module' ).then( m => m.PagesModule )
			},
			{
				path: 'shop',
				loadChildren: () => import( './pages/shop/shop.module' ).then( m => m.ShopModule )
			},
			{
				path: 'product',
				loadChildren: () => import( './pages/product/product.module' ).then( m => m.ProductModule )
			},
			// {
			// 	path: 'shared',
			// 	loadChildren: () => import( './shared/shared.module' ).then( m => m.SharedModule )
			// },
		]
	},
	{
		path: '**',
		redirectTo: '/pages/404'
	}
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes, { useHash: false, anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' } ) ],
	exports: [ RouterModule ]
} )

export class AppRoutingModule { }
