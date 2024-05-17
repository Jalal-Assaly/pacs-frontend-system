import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPoliciesComponent } from './components/access-policies/access-policies.component';

const routes: Routes = [
  { path: '', component: AccessPoliciesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessPoliciesRoutingModule { }
