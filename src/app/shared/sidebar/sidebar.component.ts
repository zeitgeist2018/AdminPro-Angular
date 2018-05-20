import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  providers: [SidebarService]
})
export class SidebarComponent implements OnInit {

  constructor(private _sidebarService: SidebarService,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }

}
