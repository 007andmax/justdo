import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionsService } from './services/actions.service';
import { reqForgotPassword } from 'src/app/services/req/req-forgot-password';
import { resForgotPassword } from 'src/app/services/res/res-forgot-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'html//forgot-password.component.html',
  styleUrls: ['css/forgot-password.component.scss'],
  providers:[ActionsService]
})
export class ForgotPasswordComponent implements OnInit  {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private actions: ActionsService, private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
      });

  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.actions.forgotPassword(new reqForgotPassword(this.registerForm.value.email)).then((res:resForgotPassword) => {
      console.log('res', res);
      localStorage.setItem('email',this.registerForm.value.email);
      this.router.navigate(['/reset-password']);
    });
}

}
