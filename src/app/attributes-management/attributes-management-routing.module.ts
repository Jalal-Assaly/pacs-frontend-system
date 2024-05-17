import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPointsComponent } from './components/access-points/access-points.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { VisitorsComponent } from './components/visitors/visitors.component';

const routes: Routes = [
  { path: 'access-points', component: AccessPointsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'visitors', component: VisitorsComponent }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesManagementRoutingModule { }
