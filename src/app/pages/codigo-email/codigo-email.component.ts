import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-codigo-email',
  templateUrl: './codigo-email.component.html',
  styleUrls: ['./codigo-email.component.scss']
})
export class CodigoEmailComponent implements OnInit {
  formulario!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
