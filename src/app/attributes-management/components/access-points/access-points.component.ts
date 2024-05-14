import { Component } from '@angular/core';
import { AccessPoint } from '../../models/access-points.model';
import { AccessPointsService } from '../../services/access-points.service';

import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';

@Component({
  selector: 'app-access-points',
  templateUrl: './access-points.component.html',
  // styleUrls: ['./access-points.component.css']
})
export class AccessPointsComponent {

  deleteAccessPointDialog: boolean = false;

  deleteAccessPointsListDialog: boolean = false;

  submitted: boolean = false;

  AccessPointsList!: AccessPoint[];

  accessPoint!: AccessPoint;

  selectedAccessPoints!: AccessPoint[];

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private acessPointsService: AccessPointsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.acessPointsService.getAllAccessPoints().subscribe({
      next: (response: AccessPoint[]) => {
        this.AccessPointsList = response;
        console.log(this.AccessPointsList);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'LC', header: 'Location' },
      { field: 'IT', header: 'Tamper Status' },
      { field: 'OL', header: 'Current Occupancy Level' },
      { field: 'MOL', header: 'Maximum Occupancy Level' }
    ];
  }

  deleteAccessPoint(accessPoint: AccessPoint) {
    this.deleteAccessPointDialog = true;
    this.accessPoint = { ...accessPoint };
  }

  deleteSelectedAccessPoints() {
    this.deleteAccessPointsListDialog = true;
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
