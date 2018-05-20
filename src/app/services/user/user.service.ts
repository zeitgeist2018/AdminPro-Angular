import { Injectable } from '@angular/core';
import { User } from '../../models/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor(private _http: HttpClient) {
    this.loadToken();
    this.loadUser();
  }

  private loadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private loadToken() {
    this.token = localStorage.getItem('token');
  }

  private saveOnStorage(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return this.token && this.token.length > 5 ? true : false;
  }

  register(user: User) {
    const url = BASE_URL + '/users';
    return this._http.post(url, user)
      .map((res: any) => {
        this.saveOnStorage(res.token, res.user);
        return res.user;
      });
  }

  loginWithGoogle(token: string) {
    const url = BASE_URL + '/login/google';
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this._http.post(url, null, { headers: headers })
      .map((res: any) => {
        this.saveOnStorage(res.token, res.user);
        return true;
      });
  }

  login(user: User, rememberme: boolean = false) {
    const url = BASE_URL + '/login';
    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    return this._http.post(url, user)
      .map((res: any) => {
        this.saveOnStorage(res.token, res.user);
        this.loadToken();
        this.loadUser();
        return res;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
  }

  getSavedEmail(): string {
    return localStorage.getItem('email') || '';
  }

}
