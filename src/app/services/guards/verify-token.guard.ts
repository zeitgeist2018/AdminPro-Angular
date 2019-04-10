import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../user/user.service";

@Injectable()
export class VerifyTokenGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {

  }

  canActivate(): Promise<boolean> | boolean {
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (this.isExpired(payload.exp)) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return this.needsRenewal(payload.exp);
    }
  }

  needsRenewal(expiryDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExpDate = new Date(expiryDate * 1000);
      const gracePeriod = new Date();
      gracePeriod.setTime(gracePeriod.getTime() + (1 * 60 * 60 * 1000));
      if (tokenExpDate.getTime() > gracePeriod.getTime()) {
        resolve(true);
      } else {
        this.userService.refreshToken().subscribe(() => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false)
        });
      }
    });
  }

  isExpired(expiryDate: number) {
    const now = new Date().getTime() / 1000;
    return expiryDate < now;
  }
}
