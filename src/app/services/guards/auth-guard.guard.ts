import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService,
    private _router: Router) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const can = this._userService.isAuthenticated();
    if (!can) {
      console.log('Not authenticated. Redirecting to /login');
      this._router.navigate(['/login']);
    }
    return can;
  }

}
