import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutOneComponent} from './about-one/about-one.component';
import {AboutTwoPageComponent} from './about-two/about-two.component';
import {LoginPageComponent} from './login/login.component';
import {FaqsPageComponent} from './faqs/faqs.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ContactOnePageComponent} from './contact-one/contact-one.component';
import {ContactTwoPageComponent} from './contact-two/contact-two.component';
import {ProfileComponent} from '../profile/profile.component';
import {AuthGuard} from '../../shared/guard/auth.guard';
import {PaymentCancelComponent} from "./payment-cancel/payment-cancel.component";
import {PaymentSuccessComponent} from "./payment-success/payment-success.component";
import { AdminComponent } from '../admin/admin.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutOneComponent
  },
  {
    path: 'about-2',

    component: AboutTwoPageComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: 'payment-cancel',
    component: PaymentCancelComponent
  }, {
    path: 'payment-success',
    component: PaymentSuccessComponent
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [!AuthGuard]
  },
  {
    path: 'faq',
    component: FaqsPageComponent
  },
  {
    path: 'contact',
    component: ContactOnePageComponent
  },
  {
    path: 'contact-2',
    component: ContactTwoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {
};


