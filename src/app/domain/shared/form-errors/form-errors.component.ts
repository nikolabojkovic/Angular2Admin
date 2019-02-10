import { Component, OnInit, Input } from '@angular/core';
import { FormErrors } from './form-errors.model';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {
  @Input() formErrors: FormErrors;

  get errors() {
    return this.formErrors.errors;
  }
}
