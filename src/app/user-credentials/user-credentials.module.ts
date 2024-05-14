import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCredentialsRoutingModule } from './user-credentials-routing.module';
import { EmployeeCredentialsComponent } from './components/employee-credentials/employee-credentials.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { EmployeeCredentialsService } from './services/employee-credentials.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { VisitorCredentialsComponent } from './components/visitor-credentials/visitor-credentials.component';


@NgModule({
  declarations: [EmployeeCredentialsComponent, VisitorCredentialsComponent],
  imports: [
    CommonModule,
    UserCredentialsRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule
  ],
  providers: [EmployeeCredentialsService]
})
export class UserCredentialsModule { }
