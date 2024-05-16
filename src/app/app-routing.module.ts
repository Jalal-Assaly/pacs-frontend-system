import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user-credentials', loadChildren: () => import('./user-credentials/user-credentials.module').then(m => m.UserCredentialsModule) },
  { path: 'visitor-management', loadChildren: () => import('./visitor-management/visitor-management.module').then(m => m.VisitorManagementModule) },
  { path: 'access-logs', loadChildren: () => import('./access-logs/access-logs.module').then(m => m.AccessLogsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
