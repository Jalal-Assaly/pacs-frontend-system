import { NgModule } from '@angular/core';

import { UserCredentialsRoutingModule } from './user-credentials-routing.module';
import { EmployeeCredentialsComponent } from './components/employee-credentials/employee-credentials.component';
import { EmployeeCredentialsService } from './services/employee-credentials.service';
import { VisitorCredentialsComponent } from './components/visitor-credentials/visitor-credentials.component';
import { VisitorCredentialsService } from './services/visitor-credentials.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [EmployeeCredentialsComponent, VisitorCredentialsComponent],
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    UserCredentialsRoutingModule
  ],
  providers: [EmployeeCredentialsService, VisitorCredentialsService]
})
export class UserCredentialsModule { }
