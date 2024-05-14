import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user-credentials.model';
import { EmployeeCredentialsService } from '../../services/employee-credentials.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';

@Component({
  selector: 'employee-credentials',
  templateUrl: './employee-credentials.component.html',
  // styleUrl: './employee-credentials.component.css'
})
export class EmployeeCredentialsComponent {

  deleteEmployeeCredentialsDialog: boolean = false;

  deleteEmployeeCredentialsListDialog: boolean = false;

  submitted: boolean = false;

  employeeCredentialsList!: UserCredentials[];

  employeeCredentials!: UserCredentials;

  selectedEmployeeCredentials!: UserCredentials[];

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private employeeCredentialsService: EmployeeCredentialsService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.employeeCredentialsService.getAllEmployeeCredentials().subscribe({
      next: (response: UserCredentials[]) => {
        this.employeeCredentialsList = response;
        console.log("Works");
        console.log(this.employeeCredentialsList);
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
      { field: 'PW', header: 'Password' }
    ];
  }

  deleteEmployeeCredentials(employeeCredentials: UserCredentials) {
    this.deleteEmployeeCredentialsDialog = true;
    this.employeeCredentials = { ...employeeCredentials };
  }

  deleteSelectedEmployeeCredentials() {
    this.deleteEmployeeCredentialsListDialog = true;
  }

  confirmDelete(employeeCredentials: UserCredentials) {
    this.employeeCredentialsService.deleteEmployeeCredentials(employeeCredentials.ID)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Employee Credentials Deleted Successfully');
          this.employeeCredentialsList = [...this.employeeCredentialsList];
          this.employeeCredentials = {} as UserCredentials;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected coupons and call deleteCoupon for each
    for (const selecteCredentials of this.selectedEmployeeCredentials) {
      const deleteObservable = this.employeeCredentialsService.deleteEmployeeCredentials(selecteCredentials.ID!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.employeeCredentialsList = this.employeeCredentialsList.filter(val => !this.selectedEmployeeCredentials.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Coupons Deleted',
          life: 3000
        });
        this.selectedEmployeeCredentials = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete coupons',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideDialogs() {
    this.submitted = false;
    this.deleteEmployeeCredentialsDialog = false;
    this.deleteEmployeeCredentialsListDialog = false;
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
