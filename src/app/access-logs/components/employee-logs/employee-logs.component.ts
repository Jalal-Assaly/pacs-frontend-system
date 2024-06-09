import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin, Observable, catchError, throwError } from 'rxjs';
import { EmployeeLog } from '../../models/employee-logs';
import { EmployeeLogsService } from '../../services/employee-logs.service';

@Component({
  selector: 'access-logs',
  styleUrls: ['./employee-logs.component.css'],
  templateUrl: './employee-logs.component.html',
})
export class EmployeeLogsComponent {

  deleteEmployeeLogDialog: boolean = false;

  deleteEmployeeLogsDialog: boolean = false;

  submitted: boolean = false;

  employeeLogs!: EmployeeLog[];

  employeeLog!: EmployeeLog;

  selectedEmployeeLogs!: EmployeeLog[];

  cols: any[] = [];

  // Boolean values to control opening and closing of dialogs
  showAccessRequestDialog: boolean = false;
  showAccessPolicyDialog: boolean = false;

  // Variables to hold data to be displayed in the dialogs
  accessRequestData: any;
  accessPolicyData: any;

  constructor(
    private employeeLogsService: EmployeeLogsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.employeeLogsService.getAllEmployeeLogs().subscribe({
      next: (response: EmployeeLog[]) => {
        this.employeeLogs = response;
        console.log("Works");
        console.log(this.employeeLogs);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'id', header: 'Log ID' },
      { field: 'timestamp', header: 'Timestamp' },
      { field: 'accessRequest', header: 'Access Request' },
      { field: 'accessPolicy', header: 'Access Policy' },
      { field: 'accessResponse.decision', header: 'Access Decision' }
    ];
  }

  deleteEmployeeLogs(employeeLog: EmployeeLog) {
    this.deleteEmployeeLogDialog = true;
    this.employeeLog = { ...employeeLog };
  }

  deleteSelectedEmployeeLogs() {
    this.deleteEmployeeLogsDialog = true;
  }

  confirmDelete(employeeLog: EmployeeLog) {
    this.employeeLogsService.deleteEmployeeLogs(employeeLog.id)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Employee Logs Deleted Successfully');
          this.employeeLogs = [...this.employeeLogs];
          this.employeeLog = {} as EmployeeLog;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected logs and call deleteEmployeeLogs for each
    for (const selecteLogs of this.selectedEmployeeLogs) {
      const deleteObservable = this.employeeLogsService.deleteEmployeeLogs(selecteLogs.id!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.employeeLogs = this.employeeLogs.filter(val => !this.selectedEmployeeLogs.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Logs Deleted',
          life: 3000
        });
        this.selectedEmployeeLogs = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete employee logs',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideDialogs() {
    this.submitted = false;
    this.deleteEmployeeLogDialog = false;
    this.deleteEmployeeLogsDialog = false;
  }

  openAccessRequestDialog(accessRequest: any) {
    this.accessRequestData = accessRequest;
    this.showAccessRequestDialog = true;
  }

  openAccessPolicyDialog(accessPolicy: any) {
    this.accessPolicyData = accessPolicy;
    console.log(accessPolicy);
    this.showAccessPolicyDialog = true;
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
