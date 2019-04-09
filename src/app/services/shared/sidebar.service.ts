import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";

@Injectable()
export class SidebarService {

  menu: any = [];

  constructor(private userService: UserService) {
    this.menu = this.userService.menu;
  }

}
