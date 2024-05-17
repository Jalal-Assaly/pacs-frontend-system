import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLogsComponent } from './components/employee-logs/employee-logs.component';
import { VisitorLogsComponent } from './components/visitor-access-logs/visitor-logs.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeLogsComponent },
  { path: 'visitors', component: VisitorLogsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessLogsRoutingModule { }
