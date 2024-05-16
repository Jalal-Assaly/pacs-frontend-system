import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin, Observable, catchError, throwError } from 'rxjs';
import { VisitorLog } from '../../models/visitor-logs';
import { VisitorLogsService } from '../../services/visitor-logs.service';

@Component({
  selector: 'access-logs',
  styleUrls: ['./visitor-logs.component.css'],
  templateUrl: './visitor-logs.component.html',
})
export class VisitorLogsComponent {

  deleteVisitorLogDialog: boolean = false;

  deleteVisitorLogsDialog: boolean = false;

  submitted: boolean = false;

  visitorLogs!: VisitorLog[];

  visitorLog!: VisitorLog;

  selectedVisitorLogs!: VisitorLog[];

  cols: any[] = [];

  // Boolean values to control opening and closing of dialogs
  showAccessRequestDialog: boolean = false;
  showAccessPolicyDialog: boolean = false;

  // Variables to hold data to be displayed in the dialogs
  accessRequestData: any;
  accessPolicyData: any;

  constructor(
    private visitorLogsService: VisitorLogsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.visitorLogsService.getAllVisitorLogs().subscribe({
      next: (response: VisitorLog[]) => {
        this.visitorLogs = response;
        console.log("Works");
        console.log(this.visitorLogs);
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

  deleteVisitorLogs(visitorLog: VisitorLog) {
    this.deleteVisitorLogsDialog = true;
    this.visitorLog = { ...visitorLog };
  }

  deleteSelectedVisitorLogs() {
    this.deleteVisitorLogsDialog = true;
  }

  confirmDelete(visitorLog: VisitorLog) {
    this.visitorLogsService.deleteVisitorLogs(visitorLog.id)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Visitor Logs Deleted Successfully');
          this.visitorLogs = [...this.visitorLogs];
          this.visitorLog = {} as VisitorLog;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected logs and call deleteVisitorLogs for each
    for (const selecteLogs of this.selectedVisitorLogs) {
      const deleteObservable = this.visitorLogsService.deleteVisitorLogs(selecteLogs.id!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.visitorLogs = this.visitorLogs.filter(val => !this.selectedVisitorLogs.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Visitor Logs Deleted',
          life: 3000
        });
        this.selectedVisitorLogs = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete visitor logs',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideDialogs() {
    this.submitted = false;
    this.deleteVisitorLogDialog = false;
    this.deleteVisitorLogsDialog = false;
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
