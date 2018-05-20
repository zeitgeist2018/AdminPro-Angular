import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgZone } from '@angular/core';
import { UserService } from '../services/services.index';
import { User } from '../models/User.model';
declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme: boolean = false;
  email: string;

  auth2: any;

  constructor(private _router: Router,
    private _userService: UserService,
    private _ngZone: NgZone) { }

  ngOnInit() {
    initPlugins();
    this.googleInit();
    this.email = this._userService.getSavedEmail();
    if (this.email.length > 0) {
      this.rememberme = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '197100323965-sa2vjn61khv1chk5l930g47gqjpm9c34.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      // We use NgZone as a workaround to the template
      // loading issue, as it won't work properly after
      // Google SignIn otherwise
      this._ngZone.run(() => {
        this._userService.loginWithGoogle(token)
          .subscribe(success => {
            if (success) {
              this._router.navigate(['/dashboard']);
            }
          }, err => {
            console.log(err);
          });
      });
    });
  }

  login(form: NgForm) {
    const user = new User(
      null,
      form.value.email,
      form.value.password
    );
    const rememberme = form.value.rememberme;
    this._userService.login(user, rememberme)
      .subscribe(res => {
        console.log(res);
        this._router.navigate(['/dashboard']);
      }, err => {
        console.log(err);
      });
  }
}
