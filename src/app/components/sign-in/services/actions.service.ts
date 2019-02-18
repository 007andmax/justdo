
import { HttpService } from 'src/app/services/http.service';
import { reqSignIn } from 'src/app/services/req/req-sign-in';
import { Injectable } from '@angular/core';
@Injectable()
export class ActionsService {
  constructor(private http: HttpService) {}
 public SignIn (data:reqSignIn) {
   return this.http.singIn(data);

 }
}
