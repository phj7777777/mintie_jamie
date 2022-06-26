import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'angular-owl-carousel';
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from './pages/admin/admin-routing.module';
import { TrackingComponent } from './pages/shop/tracking/tracking.component';
// Auth

import { AuthRoutingModule } from './pages/auth/auth-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp } from 'firebase/app';
import { FirebaseService } from './services/firebase.service';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ElementsModule } from './pages/elements/elements.module';
import { PagesModule } from './pages/others/pages.module';
import { HomeModule } from './pages/home/home.module';

// reducers
import { appReducers, metaReducers } from './core/reducers/app.reducer';
import { wishlistReducer } from './core/reducers/wishlist.reducer';
import { compareReducer } from './core/reducers/compare.reducer';
import { cartReducer } from './core/reducers/cart.reducer';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileModule } from './pages/profile/profile.module';
import {AdminModule} from "./pages/admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyCDjvfxZwbOMjMv2dysbQEsm-Z2VYVfjH8",
      authDomain: "mintiejamie-f0fe3.firebaseapp.com",
      projectId: "mintiejamie-f0fe3",
      storageBucket: "mintiejamie-f0fe3.appspot.com",
      messagingSenderId: "108262154428",
      appId: "1:108262154428:web:fa94295565045550d730b9",
      measurementId: "G-RJBSR946WW"
    }),
    AppRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    NgbModule,
    HttpClientModule,
    OwlModule,
    ElementsModule,
    PagesModule,
    SharedModule,
    HomeModule,
    AdminModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: false,
      enableHtml: true,
    }),
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('wishlist', wishlistReducer),
    StoreModule.forFeature('compare', compareReducer),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    AngularFirestoreModule,
    CommonModule,
  ],

  providers: [FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }
