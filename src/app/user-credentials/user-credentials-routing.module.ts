import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCredentialsComponent } from './components/employee-credentials/employee-credentials.component';
import { VisitorCredentialsComponent } from './components/visitor-credentials/visitor-credentials.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeCredentialsComponent },
  { path: 'visitors', component: VisitorCredentialsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCredentialsRoutingModule { }
