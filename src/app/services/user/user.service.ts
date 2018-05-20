import { Injectable } from '@angular/core';
import { User } from '../../models/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import 'rxjs/add/operator/map';
import { UploadFileService } from '../uploadFile/upload-file.service';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor(private _http: HttpClient,
    private _uploadFileService: UploadFileService) {
    this.loadToken();
    this.loadUser();
  }

  private loadUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.user = user;
    } else {
      // If user is already set, we just update its properties,
      // so we keep the same object reference in all components
      this.user._id = user._id;
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.google = user.google;
      this.user.password = user.password;
      this.user.role = user.role;
      this.user.image = user.image;
    }
  }

  private loadToken() {
    this.token = localStorage.getItem('token');
  }

  saveOnStorage(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.loadToken();
    this.loadUser();
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

  getHeaders(token: string): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return headers;
  }

  loginWithGoogle(token: string) {
    const url = BASE_URL + '/login/google';
    return this._http.post(url, null, { headers: this.getHeaders(token) })
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

  updateUser(user: User) {
    const url = BASE_URL + '/users/' + user._id;
    return this._http.put(url, user, { headers: this.getHeaders(this.token) })
      .map((res: any) => {
        this.saveOnStorage(this.token, res.user);
        return true;
      });
  }

  updateImage(image: File, userId: string) {
    return this._uploadFileService.uploadFile(image, 'users', userId);
  }

}
