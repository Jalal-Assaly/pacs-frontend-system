import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorManagementComponent } from './components/visitor-management.component';

const routes: Routes = [
  { path: '', component: VisitorManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorManagementRoutingModule { }
