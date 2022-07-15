import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { NouisliderModule } from 'ng2-nouislider';

import { SharedModule } from '../../shared/shared.module';

import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		IndexComponent,
	],

	imports: [
		CommonModule,
		RouterModule,
		NgbModule,
		OwlModule,
		NouisliderModule,
		SharedModule,
    FormsModule,
    ReactiveFormsModule,
	]
})

export class HomeModule { }
