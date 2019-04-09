import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/services.index';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
    this.user = this._userService.user;
  }

  search(search: string) {
    if (search) {
      this._router.navigate(['search', search]);
    }
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }

}
