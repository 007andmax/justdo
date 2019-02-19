import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionsService } from './services/actions.service';
import { FormService } from 'src/app/services/form-service';
import { reqResetPassword } from 'src/app/services/req/req-reset-password';
import { resResetPassword } from 'src/app/services/res/res-reset-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'html/reset-password.component.html',
  styleUrls: ['css/reset-password.component.scss'],
  providers:[ActionsService]
})
export class ResetPasswordComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private actions: ActionsService, private form: FormService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      code: ['', [Validators.required,Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: this.form.MustMatch('password', 'confirmPassword')
  });
  }

  // convenience getter for easy access to form fields
  toogleField (event) {
    let toogle: HTMLElement =  event.target;
    if (toogle.classList.contains('hide-value')){
     toogle.classList.remove('hide-value');
     toogle.parentNode.querySelector('input').setAttribute('type','password');
    } else {
     toogle.classList.add('hide-value');
     toogle.parentNode.querySelector('input').setAttribute('type','text');
    }

   }
   checkField (event) {

     if (event.target.value === '')
     {
       event.target.parentNode.querySelector('.visible-field').style.display = 'none';
     } else {
       event.target.parentNode.querySelector('.visible-field').style.display = 'block';
     }

   }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid && localStorage.getItem('email')) {
          return;
      }
      this.actions.resetPassword(new reqResetPassword(this.registerForm.value.code,localStorage.getItem('email'),this.registerForm.value.password)).then((res:resResetPassword) => {
        console.log('res', res);
        this.router.navigate(['/sign-in']);
      });

  }
}
