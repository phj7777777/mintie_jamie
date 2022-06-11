
import { NgModule } from '@angular/core';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Copy from shop.module.ts

@NgModule( {
  declarations: [
    ForgetPasswordComponent,
    AuthComponent
  ],

  imports: [
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],

  exports: [
    ForgetPasswordComponent
  ],

  providers: [

  ]
} )

export class AuthModule { }
