import { Component } from '@angular/core';
import { Visitor } from '../../models/visitors.model';
import { VisitorsService } from '../../services/visitors.service';
import { MessageService } from 'primeng/api';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  // styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent {
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
    private visitorsService: VisitorsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.visitorsService.getAllVisitors().subscribe({
      next: (response: Visitor[]) => {
        this.visitors = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'RL', header: 'Role' },
      { field: 'DP', header: 'Department' },
      { field: 'TS', header: 'Time Schedule' },
      { field: 'CL', header: 'Clearance Level' },
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

  confirmDelete(visitor: Visitor) {
    this.visitorsService.deleteVisitor(visitor.ID)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Visitor Attributes Deleted Successfully');
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
    for (const selectedVisitors of this.selectedVisitors) {
      const deleteObservable = this.visitorsService.deleteVisitor(selectedVisitors.ID!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.visitors = this.visitors.filter(val => !this.selectedVisitors.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Visitors Attributes Deleted',
          life: 3000
        });
        this.selectedVisitors = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete visitor attributes',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideDialogs() {
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
