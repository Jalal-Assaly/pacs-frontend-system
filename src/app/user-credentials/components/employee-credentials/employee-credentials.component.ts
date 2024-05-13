import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user-credentials.model';
import { EmployeeCredentialsService } from '../../services/employee-credentials.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'employee-credentials',
  templateUrl: './employee-credentials.component.html',
  // styleUrl: './employee-credentials.component.css'
})
export class EmployeeCredentialsComponent {

  employeeCredentialsDialog: boolean = false;

  deleteEmployeeCredentialsDialog: boolean = false;

  deleteEmployeeCredentialsListDialog: boolean = false;

  submitted: boolean = false;

  employeeCredentialsList!: UserCredentials[];

  employeeCredentials!: UserCredentials;

  selectedEmployeeCredentials!: UserCredentials[];

  cols: any[] = [];

  statuses: any[] = [];

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

  openNew() {
    this.employeeCredentials = {} as UserCredentials;
    this.submitted = false;
    this.employeeCredentialsDialog = true;
  }
  
  editEmployeeCredentials(employeeCredentials: UserCredentials) {
    this.employeeCredentials = { ...employeeCredentials };
    this.employeeCredentialsDialog = true;
  }

  deleteSelectedEmployeeCredentialsList() {
    this.deleteEmployeeCredentialsListDialog = true;
  }

  deleteEmployeeCredentials(employeeCredentials: UserCredentials) {
    this.deleteEmployeeCredentialsDialog = true;
    this.employeeCredentials = { ...employeeCredentials };
  }

  hideDialogs() {
    this.employeeCredentialsDialog = false;
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
