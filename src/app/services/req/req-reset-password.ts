export class reqResetPassword {
  code: Number;
  email: String;
  password:String;
  constructor (code,email,password) {
this.code = code;
this.email = email;
this.password = password;
  }
}
