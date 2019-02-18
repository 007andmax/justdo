import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { reqSignUp } from 'src/app/services/req/req-sign-up';

@Injectable()
export class ActionsService {
  constructor(private http: HttpService) {}
 public SignUp (data:reqSignUp) {
   return this.http.singUp(data);

 }
}
