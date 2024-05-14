import { NgModule } from '@angular/core';

import { VisitorManagementRoutingModule } from './visitor-management-routing.module';
import { VisitorManagementComponent } from './components/visitor-management.component';
import { VisitorManagementService } from './services/visitor-management.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
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
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [VisitorManagementComponent],
  imports: [
    ButtonModule,
    CalendarModule,
    CommonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    VisitorManagementRoutingModule
  ],
  providers: [VisitorManagementService]
})
export class VisitorManagementModule { }
