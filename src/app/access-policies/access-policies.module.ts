import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessPoliciesRoutingModule } from './access-policies-routing.module';

import { AccessPoliciesComponent } from './components/access-policies/access-policies.component';

import { AccessPoliciesService } from './services/access-policies.service';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [AccessPoliciesComponent],
  imports: [
    CommonModule,
    AccessPoliciesRoutingModule,
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
    DialogModule,
    HttpClientModule
  ],
  providers: [AccessPoliciesService]
})
export class AccessPoliciesModule { }
