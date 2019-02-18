import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form-service';
import { ActionsService } from './services/actions.service';
import { reqSignIn } from 'src/app/services/req/req-sign-in';
import { resSignIn } from 'src/app/services/res/res-sign-in';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: 'html//sign-in.component.html',
  styleUrls: ['css/sign-in.component.scss'],
  providers: [ActionsService]

})
export class SignInComponent  implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private form: FormService, private actions: ActionsService,   private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          password: ['', [Validators.required, Validators.minLength(8)]]
      });
  }

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
      if (this.registerForm.invalid) {
          return;
      }
    this.actions.SignIn(new reqSignIn(this.registerForm.value.email,this.registerForm.value.password)).then((res:resSignIn) => {
      console.log('res', res);
      this.router.navigate(['/']);
    });
  }
}
