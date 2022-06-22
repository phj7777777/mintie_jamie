import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TrackingComponent } from './tracking/tracking.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminComponent,
  },
  {
    path: 'tracking',
    component: TrackingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
