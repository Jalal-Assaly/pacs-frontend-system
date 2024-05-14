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

  accessPointDialog: boolean = false;

  submitted: boolean = false;

  submittedAccessPoint: boolean = false;

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

  openNewAccessPoint() {
    this.submittedAccessPoint = false;
    this.accessPointDialog = true;
    this.accessPoint = {} as AccessPoint;
}

saveAccessPoint() {
  this.submittedAccessPoint = true;

  if (this.validateAccessPoint(this.accessPoint)) {
      if (this.accessPoint.ID) {
          this.acessPointsService.updateAccessPoint(this.accessPoint, this.accessPoint.ID!)
          .pipe((err) => this.handleObservableError(err))
          .subscribe({
              next: () => {
                  this.handleSuccess("Access Point Updated");
                  this.AccessPointsList[this.findIndexById(this.accessPoint.ID)] = this.accessPoint;
              }
          });
      } else {
          this.accessPoint.IT = false;
          this.accessPoint.OL = 0;
          this.acessPointsService.addAccesspoint(this.accessPoint).pipe((err) => this.handleObservableError(err))
          .subscribe({
              next: () => this.handleSuccess("Access Point Created")
          });
      }

      this.AccessPointsList = [...this.AccessPointsList];
      this.accessPointDialog = false;

  }
}

private validateAccessPoint(accessPoint: AccessPoint): boolean {
  return (
      accessPoint &&
      accessPoint.LC != null &&
      accessPoint.MOL != null 
  );
}

editAccessPoint(accessPoint: AccessPoint) {
  this.accessPoint = { ...accessPoint };
  this.accessPointDialog = true;
}

findIndexById(id: String): number {
  let index = -1;
  for (let i = 0; i < this.AccessPointsList.length; i++) {
      if (this.AccessPointsList[i].ID === id) {
          index = i;
          break;
      }
  }
  return index;
}

  deleteAccessPoint(accessPoint: AccessPoint) {
    this.deleteAccessPointDialog = true;
    this.accessPoint = { ...accessPoint };
  }

  deleteSelectedAccessPoints() {
    this.deleteAccessPointsListDialog = true;
  }
  
  confirmDelete(accessPoint: AccessPoint) {
    this.acessPointsService.deleteAccessPoint(accessPoint.ID)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Access Point Deleted Successfully');
          this.AccessPointsList = [...this.AccessPointsList];
          this.accessPoint = {} as AccessPoint;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    const deleteObservables = [];

    for (const selectedAccessPoint of this.selectedAccessPoints) {
      const deleteObservable = this.acessPointsService.deleteAccessPoint(selectedAccessPoint.ID!);
      deleteObservables.push(deleteObservable);
    }

    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.AccessPointsList = this.AccessPointsList.filter(val => !this.selectedAccessPoints.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Acccess Point Deleted',
          life: 3000
        });
        this.selectedAccessPoints = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete access point',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideAccessPointDialog() {
    this.accessPointDialog = false;
    this.submittedAccessPoint = false;
}

  hideDialogs() {
    this.submitted = false;
    this.deleteAccessPointDialog = false;
    this.deleteAccessPointsListDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // Handle successful and error message service
  private handleSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
  }

  private handleObservableError(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: `${error.error.message}`, life: 3000 });
        return throwError(() => error);
      })
    );
  }

}
