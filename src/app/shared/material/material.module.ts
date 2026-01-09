import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'
import { BadgeModule } from 'primeng/badge';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    DropdownModule,
    ToastModule,
    CardModule,
    ButtonModule,
    BadgeModule


  ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    DropdownModule,
    ToastModule,
    CardModule,
    ButtonModule,
    BadgeModule
  ]
})
export class MaterialModule { }
