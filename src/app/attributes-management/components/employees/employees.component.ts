import { Component } from '@angular/core';
import { Employee } from '../../models/employees.model';
import { EmployeesService } from '../../services/employees.service';
import { MessageService } from 'primeng/api';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  // styleUrls: ['./employees.component.css']
})

export class EmployeesComponent {

  deleteEmployeeDialog: boolean = false;

  deleteEmployeesDialog: boolean = false;

  submitted: boolean = false;

  employees!: Employee[];

  employee!: Employee;

  selectedEmployees!: Employee[];

  cols: any[] = [];

  daysOfWeekOptions: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  startTime!: Date;

  endTime!: Date;



  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.employeesService.getAllEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
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
      { field: 'ES', header: 'Employment Status' },
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

  deleteEmployee(employee: Employee) {
    this.deleteEmployeeDialog = true;
    this.employee = { ...employee };
  }

  deleteSelectedEmployees() {
    this.deleteEmployeesDialog = true;
  }

  confirmDelete(employee: Employee) {
    this.employeesService.deleteEmployee(employee.ID)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Employee Attributes Deleted Successfully');
          this.employees = [...this.employees];
          this.employee = {} as Employee;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected visitors and call deleteVisitor for each
    for (const selectedEmployees of this.selectedEmployees) {
      const deleteObservable = this.employeesService.deleteEmployee(selectedEmployees.ID!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.employees = this.employees.filter(val => !this.selectedEmployees.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employees Attributes Deleted',
          life: 3000
        });
        this.selectedEmployees = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete employee attributes',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideDialogs() {
    this.submitted = false;
    this.deleteEmployeeDialog = false;
    this.deleteEmployeesDialog = false;
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
