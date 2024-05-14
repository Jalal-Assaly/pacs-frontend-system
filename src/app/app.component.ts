import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'PACS App';
  tabItems!: MenuItem[];
  loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.tabItems = [
      {
        label: 'Home',
        routerLink: 'home'
      },
      {
        label: 'User Credentials',
        icon: 'pi pi-fw pi-user',
        items: [
          { label: 'Employee Credentials', icon: 'pi pi-fw pi-user', routerLink: '/user-credentials/employees' },
          { label: 'Visitor Credentials', icon: 'pi pi-fw pi-users', routerLink: '/user-credentials/visitors' }
        ]
      },
      {
        label: 'Attributes',
        icon: 'pi pi-objects-column',
        items: [
          { label: 'Access Point Attributes', icon: 'pi pi-fw pi-user', routerLink: '/attributes-management/accesspoints' }
        ]
      },
      {
        label: 'Access Policies',
        icon: 'pi pi-file',
        routerLink: '/access-policies'
      },
      {
        label: 'Visitor Management',
        icon: 'pi pi-id-card',
        routerLink: '/visitor-management'
      }
    ];
  }
}