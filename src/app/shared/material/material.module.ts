import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialModule { }
