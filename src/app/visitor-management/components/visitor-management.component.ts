import { Component } from '@angular/core';
import { Visitor } from '../models/visitor';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitorManagementService } from '../services/visitor-management.service';
import { MessageService } from 'primeng/api';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'visitor-management',
  templateUrl: './visitor-management.component.html',
})
export class VisitorManagementComponent {

  visitorDialog: boolean = false;

  deleteVisitorDialog: boolean = false;

  deleteVisitorsDialog: boolean = false;

  submitted: boolean = false;

  visitors!: Visitor[];

  visitor!: Visitor;

  selectedVisitors!: Visitor[];

  cols: any[] = [];

  daysOfWeekOptions: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  startTime!: Date;

  endTime!: Date;

  constructor(
    private visitorManagementService: VisitorManagementService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.visitorManagementService.getAllVisitors().subscribe({
      next: (response: Visitor[]) => {
        this.visitors = response;
        console.log("Works");
        console.log(this.visitors);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'SSN', header: 'SSN' },
      { field: 'FN', header: 'First Name' },
      { field: 'LN', header: 'Last Name' },
      { field: 'EM', header: 'Email' },
      { field: 'DP', header: 'Department' },
      { field: 'TS', header: 'Time Schedule' },
      { field: 'CL', header: 'Clearance Level' }
    ];

    this.daysOfWeekOptions = [
      { label: 'Sunday', value: 'Sun' },
      { label: 'Monday', value: 'Mon' },
      { label: 'Tuesday', value: 'Tue' },
      { label: 'Wednesday', value: 'Wed' },
      { label: 'Thursday', value: 'Thu' },
      { label: 'Friday', value: 'Fri' },
      { label: 'Saturday', value: 'Sat' }
    ];
  }

  deleteVisitor(visitor: Visitor) {
    this.deleteVisitorDialog = true;
    this.visitor = { ...visitor };
  }

  deleteSelectedVisitors() {
    this.deleteVisitorsDialog = true;
  }

  openNew() {

    this.visitor = {
      ID: '',
      SSN: '',
      FN: '',
      LN: '',
      EM: '',
      DP: '',
      TS: { ST: '', ET: '', DW: [] }, // Initialize Time Schedule with default values
      CL: ''
    };
    this.submitted = false;
    this.visitorDialog = true;
  }

  editVisitor(visitor: Visitor) {
    this.visitor = { ...visitor };
    this.visitorDialog = true;
  }

  saveVisitor() {
    this.submitted = true;

    if (this.visitor.ID !== '') {
      this.updateVisitor();
    } else {
      // Handles create requests
      this.addVisitor();
    }
  }

  private addVisitor() {
    this.submitted = true;

    // Extract time from the date-time string
    this.visitor.TS.ST = this.startTime.toString();
    this.visitor.TS.ET = this.endTime.toString();

    this.visitorManagementService.addVisitor(this.visitor)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (createdVisitor) => {
          this.handleSuccess('Visitor Created');
          this.visitors.push(createdVisitor);
          this.hideDialogs();
          this.visitor = {} as Visitor;
        }
      });
  }

  private updateVisitor() {
    this.submitted = true;

    // Extract time from the date-time string
    this.visitor.TS.ST = this.startTime.toString();
    this.visitor.TS.ET = this.endTime.toString();

    console.log(this.visitor);

    this.visitorManagementService.updateVisitor(this.visitor.ID, this.visitor)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Visitor Updated');
          const index = this.visitors.findIndex((visitor) => visitor.ID === this.visitor.ID);
          if (index !== -1) {
            // Assuming this.visitor contains the updated data after the update operation
            this.visitors[index] = { ...this.visitor };
          }
          this.hideDialogs();
          this.visitor = {} as Visitor;
        }
      });
  }

  confirmDelete(visitor: Visitor) {
    this.visitorManagementService.deleteVisitor(visitor.ID)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Visitor Data Deleted Successfully');
          this.visitors = [...this.visitors];
          this.visitor = {} as Visitor;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected visitors and call deleteVisitor for each
    for (const selectedVisitor of this.selectedVisitors) {
      const deleteObservable = this.visitorManagementService.deleteVisitor(selectedVisitor.ID!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.visitors = this.visitors.filter(val => !this.selectedVisitors.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Visitors Deleted',
          life: 3000
        });
        this.selectedVisitors = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete visitors',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideDialogs() {
    this.visitorDialog = false;
    this.submitted = false;
    this.deleteVisitorDialog = false;
    this.deleteVisitorsDialog = false;
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
