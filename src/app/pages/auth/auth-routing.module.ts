import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component'
import { IndexComponent } from '../home/index/index.component';

const routes: Routes = [
    {
      path:'forgetPassword',
      component: ForgetPasswordComponent
    },
    {
      path:'home',
      component: IndexComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule{}
