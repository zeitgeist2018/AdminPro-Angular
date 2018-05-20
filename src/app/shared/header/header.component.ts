import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }

}
