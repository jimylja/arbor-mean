import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
} from '@angular/material';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ]
})
export class AdminPanelModule { }
