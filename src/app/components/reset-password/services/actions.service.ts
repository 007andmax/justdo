
import { reqResetPassword } from 'src/app/services/req/req-reset-password';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class ActionsService {
  constructor(private http: HttpService) {}
 public resetPassword (data:reqResetPassword) {
   return this.http.resetPassword(data);

 }
}
