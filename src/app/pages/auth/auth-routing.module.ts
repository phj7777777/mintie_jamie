import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component'


const routes: Routes = [
    {
        path:'forgetPassword',
        component: ForgetPasswordComponent
    },
    // {
    //     path:'login',
    //     component: ForgetPasswordComponent
    // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule{}
