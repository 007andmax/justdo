import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Actions} from './services/actions.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'html//sign-up.component.html',
  styleUrls: ['css/sign-up.component.scss'],
  providers:[Actions]
})
export class SignUpComponent  implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private actions: Actions) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      }, {
          validator: this.actions.MustMatch('password', 'confirmPassword')
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

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
