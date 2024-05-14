import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPointsComponent } from './components/access-points/access-points.component';

const routes: Routes = [
  // { path: 'accesspoints', component: AccessPointsComponent }
];

@NgModule({

  imports: [RouterModule.forChild([
		{ path: 'accesspoints', component: AccessPointsComponent }
	])],
  exports: [RouterModule]
})
export class AttributesManagementRoutingModule { }
