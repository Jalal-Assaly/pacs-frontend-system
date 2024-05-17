import { Component } from '@angular/core';
import { AccessPoliciesService } from '../../services/access-policies.service';
import { AccessPolicy } from '../../models/access-policies.model';

import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { UserAttributes } from '../../models/user-attributes.mode';


@Component({
  selector: 'app-access-policies',
  templateUrl: './access-policies.component.html',
  // styleUrl: './access-policies.component.css'
})
export class AccessPoliciesComponent {

  deleteAccessPolicyDialog: boolean = false;

  deleteAccessPoliciesListDialog: boolean = false;

  accessPolicyDialog: boolean = false;

  editAccessPolicyDialog: boolean = false;

  userAttributesAddDialog: boolean = false;

  userAttributesDeleteDialog: boolean = false;

  submitted: boolean = false;

  submittedAccessPolicy: boolean = false;

  submittedUserAttributes: boolean = false;

  submittedUserRole: boolean = false;

  submittedUserClearanceLevel: boolean = false;

  submittedUserEmploymentStatus: boolean = false;

  isEditMode: boolean = false;

  newUserAttributesExistingPolicy: boolean = false;

  AccessPoliciesList!: AccessPolicy[];

  accessPolicy!: AccessPolicy;

  selectedAccessPolicies!: AccessPolicy[];

  userAttributesOptions!: UserAttributes[];

  selectedUASDepartment!: UserAttributes;

  allowedRole!: string;

  allowedClearanceLevel!: string;

  allowedEmploymentStatus!: string;

  allowedUserAttributes!: UserAttributes;

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private accessPoliciesService: AccessPoliciesService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.accessPoliciesService.getAllAccessPolicies().subscribe({
      next: (response: AccessPolicy[]) => {
        this.AccessPoliciesList = response;
        console.log(this.AccessPoliciesList);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'APA', header: 'Access Point Attributes' },
      { field: 'UAS', header: 'User Attributes' }
    ];
  }

  openNewAccessPolicy() {
    this.submittedAccessPolicy = false;
    this.accessPolicyDialog = true;
    this.accessPolicy = {} as AccessPolicy;
    this.accessPolicy = {
      ID: '',
      APA: { ALC: '', AOL: 1 },
      UAS: []
    };
  }

  openNewUserAttributes() {
    this.userAttributesAddDialog = true;
    if (this.isEditMode && !this.newUserAttributesExistingPolicy) {
      this.allowedUserAttributes = this.selectedUASDepartment;

    } else {
      this.allowedUserAttributes = {
        ADP: '',
        ARL: [],
        ACL: [],
        AES: []
      } as UserAttributes;
    }

    this.allowedRole = '';
    this.allowedClearanceLevel = '';
    this.allowedEmploymentStatus = '';
    this.submittedUserRole = false;
    this.submittedUserClearanceLevel = false;
    this.submittedUserEmploymentStatus = false;
    this.submittedUserAttributes = false;;

  }

  openNewUserAttributesExistingPolicy() {
    this.newUserAttributesExistingPolicy = true;
    this.openNewUserAttributes();
  }


  addUserAttributes() {

    if (this.isEditMode && this.newUserAttributesExistingPolicy) {
      this.submittedUserAttributes = true;
    } else if (!this.isEditMode) {
      this.submittedUserAttributes = true;
    }

    // Check for null values in sets within UserAttributes
    if (
      this.allowedUserAttributes.ADP.length > 0 &&
      Array.from(this.allowedUserAttributes.ARL).some(value => value.length > 0) &&
      Array.from(this.allowedUserAttributes.ACL).some(value => value.length > 0) &&
      Array.from(this.allowedUserAttributes.AES).some(value => value.length > 0)
    ) {

      if (this.isEditMode && this.newUserAttributesExistingPolicy) {
        this.accessPolicy.UAS.push(this.allowedUserAttributes);
        this.handleSuccess(`User attributes for department ${this.allowedUserAttributes.ADP} added`);
      } else if (this.isEditMode && !this.newUserAttributesExistingPolicy) {
          this.accessPolicy.UAS.filter(value => {
            if (value.ADP === this.allowedUserAttributes.ADP) {
              value = this.allowedUserAttributes;
            }
          });
        this.handleSuccess(`User attributes for department ${this.allowedUserAttributes.ADP} updated`);
      } else {
        this.accessPolicy.UAS.push(this.allowedUserAttributes);
        this.handleSuccess(`User attributes for department ${this.allowedUserAttributes.ADP} added`);
      }

      this.hideUserAttributesAddDialog();
    }
  }

  openNewDeleteUserAttributes() {
    this.userAttributesDeleteDialog = true;
  }

  saveDeletedUserAttributes() {
    this.accessPolicy.UAS.filter(value => {
      if (value.ADP === this.selectedUASDepartment.ADP) {
        value = this.selectedUASDepartment;
      }
    });
  this.handleSuccess(`User attributes for department ${this.selectedUASDepartment.ADP} updated`);
  this.hideUserAttributesDeleteDialog();
  }

  saveAccessPolicy() {
    this.submittedAccessPolicy = true;

    if (this.validateAccessPolicy(this.accessPolicy)) {
      if (this.accessPolicy.ID) {
        this.accessPoliciesService.updateAccessPolicy(this.accessPolicy, this.accessPolicy.ID!)
          .pipe((err) => this.handleObservableError(err))
          .subscribe({
            next: () => {
              this.handleSuccess("Access Policy Updated");
              this.AccessPoliciesList[this.findIndexById(this.accessPolicy.ID)] = this.accessPolicy;
            }
          });
      } else {
        this.accessPoliciesService.addAccessPolicy(this.accessPolicy).pipe((err) => this.handleObservableError(err))
          .subscribe({
            next: () => this.handleSuccess("Access Policy Created")
          });
      }

      this.AccessPoliciesList = [...this.AccessPoliciesList];
      this.accessPolicyDialog = false;
      this.editAccessPolicyDialog = false;

    }
  }

  private validateAccessPolicy(accessPolicy: AccessPolicy): boolean {
    if (
      !accessPolicy ||
      accessPolicy.APA.ALC == null ||
      accessPolicy.APA.AOL == null ||
      accessPolicy.UAS == null
    ) {
      return false;
    }
    return true;
  }

  editAccessPolicy(accessPolicy: AccessPolicy) {
    this.accessPolicy = { ...accessPolicy };
    this.editAccessPolicyDialog = true;
    this.userAttributesOptions = accessPolicy.UAS;
    this.isEditMode = true;
  }

  addRoleToUserAttributes() {
    this.submittedUserRole = true;

    if (this.allowedRole.length > 0) {
      this.allowedUserAttributes.ARL.push(this.allowedRole);
      this.handleSuccess(`Role ${this.allowedRole} added`);
    }

  }

  addClearanceLevelToUserAttributes() {
    this.submittedUserClearanceLevel = true;

    if (this.allowedClearanceLevel.length > 0) {
      this.allowedUserAttributes.ACL.push(this.allowedClearanceLevel);
      this.handleSuccess(`Clearance Level ${this.allowedClearanceLevel} added`);
    }

  }

  addEmploymentStatusToUserAttributes() {
    this.submittedUserEmploymentStatus = true;

    if (this.allowedEmploymentStatus.length > 0) {
      this.allowedUserAttributes.AES.push(this.allowedEmploymentStatus);
      this.handleSuccess(`Employment Status ${this.allowedEmploymentStatus} added`);
    }

  }

  deleteDepartmentFromUserAttributes() {

    if (this.selectedUASDepartment) {
      const index = this.accessPolicy.UAS.indexOf(this.selectedUASDepartment);
      if(this.accessPolicy.UAS.length>1) {
        if (index > -1) {
          this.accessPolicy.UAS.splice(index, 1);
          this.handleSuccess(`Department ${this.selectedUASDepartment.ADP} removed`);
        }
      } else {
        this.handleNormalError(`Department ${this.selectedUASDepartment.ADP} Can not be deleted, minimum one Department need to be available `);
      }
    }
  }

  deleteRoleFromUserAttributes() {
    if (this.allowedRole.length > 0) {
      const index = this.selectedUASDepartment.ARL.indexOf(this.allowedRole);
      if(this.selectedUASDepartment.ARL.length>1) {
        if (index > -1) {
          this.selectedUASDepartment.ARL.splice(index, 1);
          this.handleSuccess(`Role ${this.allowedRole} removed`);
        }
      } else {
        this.handleNormalError(`Role ${this.allowedRole} Can not be deleted, minimum one Role need to be available `);
      }
    }
  }

  deleteClearanceLevelFromUserAttributes() {

    if (this.allowedClearanceLevel.length > 0) {
      const index = this.selectedUASDepartment.ACL.indexOf(this.allowedClearanceLevel);
      if(this.selectedUASDepartment.ACL.length>1) {
        if (index > -1) {
          this.selectedUASDepartment.ACL.splice(index, 1);
          this.handleSuccess(`Clearance Level ${this.allowedClearanceLevel} removed`);
        }
      } else {
        this.handleNormalError(`Clearance Level ${this.allowedClearanceLevel} Can not be deleted, minimum one Clearance Level need to be available `);
      }
    }
  }

  deleteEmploymentStatusFromUserAttributes() {

    if (this.allowedEmploymentStatus.length > 0) {
      const index = this.selectedUASDepartment.AES.indexOf(this.allowedEmploymentStatus);
      if(this.selectedUASDepartment.AES.length>1) {
        if (index > -1) {
          this.selectedUASDepartment.AES.splice(index, 1);
          this.handleSuccess(`Employment Status ${this.allowedEmploymentStatus} removed`);
        }
      } else {
        this.handleNormalError(`Employment Status ${this.allowedEmploymentStatus} Can not be deleted, minimum one Employment Status need to be available `);
      }
    }
  }

  findIndexById(id: String): number {
    let index = -1;
    for (let i = 0; i < this.AccessPoliciesList.length; i++) {
      if (this.AccessPoliciesList[i].ID === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  deleteAccessPolicy(accessPolicy: AccessPolicy) {
    this.deleteAccessPolicyDialog = true;
    this.accessPolicy = { ...accessPolicy };
  }

  deleteSelectedAccessPolicies() {
    this.deleteAccessPoliciesListDialog = true;
  }

  confirmDelete(accessPolicy: AccessPolicy) {
    this.accessPoliciesService.deleteAccessPolicy(accessPolicy.ID!)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Access Policy Deleted Successfully');
          this.AccessPoliciesList = [...this.AccessPoliciesList];
          this.accessPolicy = {
            ID: '',
            APA: { ALC: '', AOL: 1 },
            UAS: []
          };
          this.hideDialogs();
        }
      });
  }

  confirmDeleteSelected() {
    const deleteObservables = [];

    for (const selectedAccessPolicies of this.selectedAccessPolicies) {
      const deleteObservable = this.accessPoliciesService.deleteAccessPolicy(selectedAccessPolicies.ID!);
      deleteObservables.push(deleteObservable);
    }

    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.AccessPoliciesList = this.AccessPoliciesList.filter(val => !this.selectedAccessPolicies.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Acccess Policies Deleted',
          life: 3000
        });
        this.selectedAccessPolicies = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete access policy',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  hideAccessPolicyDialog() {
    this.accessPolicyDialog = false;
    this.submittedAccessPolicy = false;
  }

  hideEditAccessPolicyDialog() {
    this.editAccessPolicyDialog = false;
    this.selectedUASDepartment = {
      ADP: '',
      ARL: [],
      ACL: [],
      AES: []
    } as UserAttributes;
  }

  hideDialogs() {
    this.submitted = false;
    this.deleteAccessPolicyDialog = false;
    this.deleteAccessPoliciesListDialog = false;
  }

  hideUserAttributesAddDialog() {
    this.userAttributesAddDialog = false;
    this.newUserAttributesExistingPolicy = false;
  }

  hideUserAttributesDeleteDialog() {
    this.userAttributesDeleteDialog = false;
    this.selectedUASDepartment = {
      ADP: '',
      ARL: [],
      ACL: [],
      AES: []
    } as UserAttributes;
    this.allowedRole = '';
    this.allowedClearanceLevel = '';
    this.allowedEmploymentStatus = '';
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

  private handleNormalError(error: string) {
    this.messageService.add({ severity: 'error', summary: 'Failed', detail: `${error}`, life: 3000 });
  }


}
