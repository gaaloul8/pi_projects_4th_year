import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationsRoutingModule } from './reclamations-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {OverlayModule} from "@angular/cdk/overlay";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReclamationsRoutingModule,
      MatTableModule,
      MatSnackBarModule,
      OverlayModule,
      ReactiveFormsModule,
  ]
})
export class ReclamationsModule { }
