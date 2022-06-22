import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TrackingComponent } from './tracking/tracking.component';


@NgModule({
  declarations: [
    AdminComponent,
    TrackingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    TrackingComponent,
  ]
})
export class AdminModule { }
