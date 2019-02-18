import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { reqForgotPassword } from 'src/app/services/req/req-forgot-password';

@Injectable()
export class ActionsService {
  constructor(private http: HttpService) {}
 public forgotPassword (data:reqForgotPassword) {
   return this.http.forgotPassword(data);

 }
}
