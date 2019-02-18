import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reqSignIn } from './req/req-sign-in';
import { resSignIn } from './res/res-sign-in';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  singIn(data: reqSignIn) {
    return new Promise((resolve, reject) => {
      this.http
        .post('/sign-in', data)
        .toPromise()
        .then((res: resSignIn) => {
          console.log('res', res);
          resolve(res);
        });
    });
  }
}
