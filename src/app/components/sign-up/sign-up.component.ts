import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ActionsService} from './services/actions.service';
import { reqSignUp } from 'src/app/services/req/req-sign-up';
import { resSignUp } from 'src/app/services/res/res-sign-up';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'html//sign-up.component.html',
  styleUrls: ['css/sign-up.component.scss'],
  providers:[ActionsService]
})
export class SignUpComponent  implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private actions: ActionsService, private router: Router, private form: FormService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
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
      if (this.registerForm.invalid) {
          return;
      }
      this.actions.SignUp(new reqSignUp(this.registerForm.value.email,this.registerForm.value.password)).then((res:resSignUp) => {
        console.log('res', res);
        this.router.navigate(['/sign-in']);
      });
  }
}
