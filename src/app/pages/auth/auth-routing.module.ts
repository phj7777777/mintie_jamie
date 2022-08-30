import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component'
import { IndexComponent } from '../home/index/index.component';
import { ProfileComponent } from '../../pages/profile/profile.component'
import { LoginModalComponent } from 'src/app/shared/components/modals/login-modal/login-modal.component';

const routes: Routes = [
    {
      path:'forgetPassword',
      component: ForgetPasswordComponent
    },
    {
      path:'home',
      component: IndexComponent
    },
    {
      path:'profile',
      component: ProfileComponent
    },
    {
      path: 'login',
      component: LoginModalComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule{}
