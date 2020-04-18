import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  submitted: boolean = false;
  redirectUrl: string;
  errorMessage: string;

  constructor(fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute
    ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit(): void {    
    if (localStorage.getItem('Authentication') !== null) {
      this.router.navigate(["backoffice/dashboard"]);
    }

    this.route.queryParams
              .subscribe(params => this.redirectUrl = params['return'] || '/backoffice/dashboard');
  }

  onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loginService.login(values.email, values.password).subscribe(result => {
        localStorage.setItem('Authentication', result.data.token);        
        this.router.navigateByUrl(this.redirectUrl);
      },
      err => {
        this.errorMessage = '';
        if (err.status === 400) {
          const errorResponse = JSON.parse(err._body);
          if (errorResponse.Message) {
            this.errorMessage = errorResponse.Message;
          } else if (errorResponse.Password) {
            for (const passwordError in errorResponse.Password) {
              if (errorResponse.Password.hasOwnProperty(passwordError)) {             
                this.errorMessage += errorResponse.Password[passwordError] + ' ';
              }
            }
          }
        }

        console.error(err);
      });
    }
  }
}
