import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User.model';
import {ModalUploadService, UserService} from '../../services/services.index';
import {Type} from "../../components/modal-upload/modal-upload.service";
//import * as swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  count: number = 0;
  loading: boolean = true;

  constructor(private _userService: UserService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();

    this.modalUploadService.eventEmitter.subscribe(event => {
      this.loadUsers();
    });
  }

  showModal(id: string){
    this.modalUploadService.showModal(Type.USERS, id);
  }

  loadUsers() {
    this.loading = true;
    this._userService.getUsers(this.from)
      .subscribe((res: any) => {
        this.count = res.totalCount;
        this.users = res.users;
        this.loading = false;
      }, err => {
        console.log(err);
      });
  }

  paginate(amount: number) {
    const from = this.from + amount;
    if (from >= this.count) {
      return;
    }
    if (from < 0) {
      return;
    }
    this.from += amount;
    this.loadUsers();
  }

  searchUsers(search: string) {
    this.loading = true;
    if (search.length <= 0) {
      this.loadUsers();
      return;
    }
    this._userService.searchUsers(search)
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

  saveUser(user: User) {
    this._userService.updateUser(user)
      .subscribe((res: any) => {
        if (res === true) {
          swal('Success!', 'User updated successfully', 'success');
        }
      });
  }

  deleteUser(user: User) {
    if (this._userService.user._id === user._id) {
      swal('Oops!', 'You can\'t delete your own user!', 'error');
      return;
    }
    swal({
      title: 'Delete user',
      text: 'Are you sure you want to delete ' + user.name + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((confirm) => {
      if (confirm) {
        this._userService.deleteUser(user)
          .subscribe((res: any) => {
            if (res.ok === true) {
              this.loadUsers();
              swal('User deleted successfully', 'User deleted', 'success');
            }
          }, err => {
            console.log(err);
          });
      }
    });
  }

}
