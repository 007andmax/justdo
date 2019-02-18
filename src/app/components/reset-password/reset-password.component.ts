import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from './services/actions.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'html/reset-password.component.html',
  styleUrls: ['css/reset-password.component.scss'],
  providers:[Actions]
})
export class ResetPasswordComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private actions: Actions) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      code: ['', [Validators.required]],
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
