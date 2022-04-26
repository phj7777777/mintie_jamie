
import { NgModule } from '@angular/core';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule( {
  declarations: [
    ForgetPasswordComponent,
    AuthComponent
  ],

  imports: [
    AuthRoutingModule
  ],

  exports: [
    ForgetPasswordComponent
  ],

  providers: [

  ]
} )

export class AuthModule { }
