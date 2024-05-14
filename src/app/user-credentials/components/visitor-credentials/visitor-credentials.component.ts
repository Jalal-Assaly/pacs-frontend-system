import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin, Observable, catchError, throwError } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials.model';
import { VisitorCredentialsService } from '../../services/visitor-credentials.service';

@Component({
  selector: 'visitor-credentials',
  templateUrl: './visitor-credentials.component.html',
})
export class VisitorCredentialsComponent {

  deleteVisitorCredentialsDialog: boolean = false;

  deleteVisitorCredentialsListDialog: boolean = false;

  submitted: boolean = false;

  visitorCredentialsList!: UserCredentials[];

  visitorCredentials!: UserCredentials;

  selectedVisitorCredentials!: UserCredentials[];

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private visitorCredentialsService: VisitorCredentialsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.visitorCredentialsService.getAllVisitorCredentials().subscribe({
      next: (response: UserCredentials[]) => {
        this.visitorCredentialsList = response;
        console.log("Works");
        console.log(this.visitorCredentialsList);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'ID', header: 'ID'},
      { field: 'SSN', header: 'SSN' },
      { field: 'FN', header: 'First Name' },
      { field: 'LN', header: 'Last Name' },
      { field: 'EM', header: 'Email' },
      { field: 'PW', header: 'Password' }
    ];
  }

  deleteVisitorCredentials(visitorCredentials: UserCredentials) {
    this.deleteVisitorCredentialsDialog = true;
    this.visitorCredentials = { ...visitorCredentials };
  }

  deleteSelectedVisitorCredentials() {
    this.deleteVisitorCredentialsListDialog = true;
  }

  confirmDelete(visitorCredentials: UserCredentials) {
    this.visitorCredentialsService.deleteVisitorCredentials(visitorCredentials.ID)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Visitor Credentials Deleted Successfully');
          this.visitorCredentialsList = [...this.visitorCredentialsList];
          this.visitorCredentials = {} as UserCredentials;
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected coupons and call deleteCoupon for each
    for (const selecteCredentials of this.selectedVisitorCredentials) {
      const deleteObservable = this.visitorCredentialsService.deleteVisitorCredentials(selecteCredentials.ID!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.visitorCredentialsList = this.visitorCredentialsList.filter(val => !this.selectedVisitorCredentials.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Coupons Deleted',
          life: 3000
        });
        this.selectedVisitorCredentials = [];
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
    this.deleteVisitorCredentialsDialog = false;
    this.deleteVisitorCredentialsListDialog = false;
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
