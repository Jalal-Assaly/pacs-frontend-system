import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user-credentials', loadChildren: () => import('./user-credentials/user-credentials.module').then(m => m.UserCredentialsModule) },
  { path: 'attributes-management', loadChildren: () => import('./attributes-management/attributes-management.module').then(m => m.AttributesManagementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
