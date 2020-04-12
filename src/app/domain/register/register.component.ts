import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { RegisterService } from './register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {

  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;
  redirectUrl: string;

  submitted: boolean = false;

  constructor(fb: FormBuilder,
              private registerService: RegisterService,
              private router: Router,
              private route: ActivatedRoute) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {
        validator: EqualPasswordsValidator.validate('password', 'repeatPassword')
      })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  OnInit(): void {
    if (localStorage.getItem('Authentication') !== null) {
      this.router.navigate(["register"]);
    }

    this.route.queryParams
              .subscribe(params => this.redirectUrl = params['return'] || '/login');
    
  }

  onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this.registerService.register(values.email, values.name, values.passwords.password).subscribe(
        () => {
          this.router.navigateByUrl('/login');
        },
        err => console.error(err));
      // console.log(values);
    }
  }
}
