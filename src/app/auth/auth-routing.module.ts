import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginModalComponent } from '../shared/components/modals/login-modal/login-modal.component'
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component'
import { IndexComponent } from '../pages/home/index/index.component';



const routes: Routes = [
    {
        path:'home',
        component: IndexComponent
    },
    {
        path:'forgetPassword',
        component: IndexComponent
    },
    // {
    //     path:'login',
    //     component: ForgetPasswordComponent
    // },
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )

export class AuthRoutingModule { }