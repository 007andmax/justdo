import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from './services/actions.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'html//forgot-password.component.html',
  styleUrls: ['css/forgot-password.component.scss'],
  providers:[Actions]
})
export class ForgotPasswordComponent implements OnInit  {
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
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}

}
