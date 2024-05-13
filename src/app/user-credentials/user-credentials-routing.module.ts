import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCredentialsComponent } from './components/employee-credentials/employee-credentials.component';

const routes: Routes = [
  { path: '', component: EmployeeCredentialsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCredentialsRoutingModule { }
