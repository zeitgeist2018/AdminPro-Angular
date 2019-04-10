import {Injectable} from '@angular/core';
import {User} from '../../models/User.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UploadFileService} from '../uploadFile/upload-file.service';
import * as swal from "sweetalert";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  user: User;
  token: string;
  menu: any = [];

  constructor(private _http: HttpClient,
              private _uploadFileService: UploadFileService,
              private router: Router) {
    this.loadLocalStorage();
  }

  refreshToken() {
    let url = BASE_URL + '/login/refresh-token?token=' + this.token;
    return this._http.get(url)
      .map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        console.log('Token refreshed');
        return true;
      })
      .catch(err => {
        this.router.navigate(['/login']);
        const message = err.error.errors.message;
        swal('Session error', 'We couldn\'t renew your session', 'warning');
        return Observable.throw(err);
      });
  }

  private loadLocalStorage() {
    if (localStorage.getItem('token')) {
      this.loadToken();
      this.loadUser();
      this.loadMenu();
    } else {
      this.user = null;
      this.token = '';
      this.menu = null;
    }
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

  private loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }

  saveOnStorage(id: string, token: string, user: User, menu: any = this.menu) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.loadLocalStorage();
  }

  isAuthenticated(): boolean {
    return this.token && this.token.length > 5 ? true : false;
  }

  register(user: User) {
    const url = BASE_URL + '/users';
    return this._http.post(url, user)
      .map((res: any) => {
        this.saveOnStorage(res.user._id, res.token, res.user, res.menu);
        return res.user;
      })
      .catch(err => {
        const message = err.error.errors.message;
        swal(err.error.message, message, 'warning');
        return Observable.throw(err);
      });
  }

  getHeaders(token: string): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return headers;
  }

  loginWithGoogle(token: string) {
    const url = BASE_URL + '/login/google';
    return this._http.post(url, null, {headers: this.getHeaders(token)})
      .map((res: any) => {
        this.saveOnStorage(res.user._id, res.token, res.user, res.menu);
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
        this.saveOnStorage(res.user._id, res.token, res.user, res.menu);
        return res;
      })
      .catch(err => {
        const message = err.error.message;
        swal('Login error', message, 'error');
        return Observable.throw(err);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.token = null;
    this.user = null;
    this.menu = null;
  }

  getSavedEmail(): string {
    return localStorage.getItem('email') || '';
  }

  updateUser(user: User) {
    const url = BASE_URL + '/users/' + user._id;
    return this._http.put(url, user, {headers: this.getHeaders(this.token)})
      .map((res: any) => {
        if (this.user._id === user._id) {
          this.saveOnStorage(user._id, this.token, res.user, this.menu);
        }
        return true;
      })
      .catch(err => {
        const message = err.error.errors.message;
        swal(err.error.message, message, 'warning');
        return Observable.throw(err);
      });
  }

  updateImage(image: File, userId: string) {
    return this._uploadFileService.uploadFile(image, 'users', userId)
      .then((res: any) => {
        this.user.image = res.user.image;
        swal('Picture updated', 'Picture updated successfully', 'success');
        this.saveOnStorage(userId, this.token, this.user, this.menu);
      }).catch(err => {
        console.error(err);
      });
  }

  getUsers(from: number = 0) {
    const url = BASE_URL + '/users?from=' + from;
    return this._http.get(url);
  }

  searchUsers(search: string) {
    const url = BASE_URL + '/search/collection/users/' + search;
    return this._http.get(url)
      .map((res: any) => res.users);
  }

  deleteUser(user: User) {
    const url = BASE_URL + '/users/' + user._id;
    return this._http.delete(url, {headers: this.getHeaders(this.token)});
  }

}
