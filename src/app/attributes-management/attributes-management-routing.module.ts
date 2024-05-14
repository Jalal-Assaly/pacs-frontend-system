import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPointsComponent } from './components/access-points/access-points.component';

const routes: Routes = [
  { path: 'accesspoints', component: AccessPointsComponent }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesManagementRoutingModule { }
