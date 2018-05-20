import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/services.index';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  providers: [SidebarService]
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(private _sidebarService: SidebarService,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }

}
