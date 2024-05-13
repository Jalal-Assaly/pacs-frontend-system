import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'E-Commerce App';
  tabItems!: MenuItem[];
  loggedIn: boolean = false;

  constructor(
    private router: Router) { }

  ngOnInit(): void {

    this.tabItems = [
      {
        label: 'Home',
        routerLink: 'home'
      },
      {
        label: 'User Credentials',
        icon: 'pi pi-fw pi-user',
        routerLink: '/user-credentials'
      },
      {
        label: 'Attributes',
        icon: 'pi pi-objects-column',
        routerLink: '/products',
      },
      {
        label: 'Access Policies',
        icon: 'pi pi-file',
        routerLink: '/'
      },
    ];
  }
}