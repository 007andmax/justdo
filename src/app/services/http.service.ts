import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { reqSignIn } from './req/req-sign-in';
import { resSignIn } from './res/res-sign-in';
import { resSignUp } from './res/res-sign-up';
import { reqSignUp } from './req/req-sign-up';
import { reqForgotPassword } from './req/req-forgot-password';
import { resForgotPassword } from './res/res-forgot-password';
import { reqResetPassword } from './req/req-reset-password';
import { resResetPassword } from './res/res-reset-password';

@Injectable()
export class HttpService {
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Cache-Control': 'no-cache'
});
  constructor(private http: HttpClient) {}

  singIn(data: reqSignIn) {

    return new Promise((resolve, reject) => {
      this.http
        .post('/sign-in', data,{ headers: this.httpHeaders})
        .toPromise()
        .then((res: resSignIn) => {
          resolve(res);
        },err => {
          alert('Неверный логи или пороль');
        });
    });
  }
  singUp(data: reqSignUp) {

    return new Promise((resolve, reject) => {
      this.http
        .post('/sign-up', data,{ headers: this.httpHeaders})
        .toPromise()
        .then((res: resSignUp) => {
          resolve(res);
        },err => {
          alert('Такой пользователь уже есть');
        });
    });
  }
  forgotPassword(data: reqForgotPassword) {

    return new Promise((resolve, reject) => {
      this.http
        .post('/forgot-password', data,{ headers: this.httpHeaders})
        .toPromise()
        .then((res: resForgotPassword) => {
          resolve(res);
        },err => {
          alert('Неверный имейл');
        });
    });
  }
  resetPassword(data: reqResetPassword) {

    return new Promise((resolve, reject) => {
      this.http
        .post('/reset-password', data,{ headers: this.httpHeaders})
        .toPromise()
        .then((res: resResetPassword) => {
          resolve(res);
        },err => {
          alert('Неверный код');
        });
    });
  }
}
