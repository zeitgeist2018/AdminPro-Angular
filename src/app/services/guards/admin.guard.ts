import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from "../user/user.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.user.role === 'ROLE_ADMIN') {
      return true;
    } else {
      // console.log('Blocked by admin guard');
      this.router.navigate(['/dashbo ard']);
      return false;
    }
  }
}
