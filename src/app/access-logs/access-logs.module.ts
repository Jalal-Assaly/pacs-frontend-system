import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessLogsRoutingModule } from './access-logs-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { EmployeeLogsComponent } from './components/employee-logs/employee-logs.component';
import { VisitorLogsComponent } from './components/visitor-access-logs/visitor-logs.component';
import { EmployeeLogsService } from './services/employee-logs.service';
import { VisitorLogsService } from './services/visitor-logs.service';



@NgModule({
  declarations: [EmployeeLogsComponent, VisitorLogsComponent],
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
    AccessLogsRoutingModule
  ],
  providers: [EmployeeLogsService, VisitorLogsService]
})
export class AccessLogsModule { }
