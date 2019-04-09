import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/services.index';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  image: File;
  tempImage: string;

  constructor(private _userService: UserService) {
    this.user = _userService.user;
  }

  ngOnInit() {

  }

  private imageChanged(file: File) {
    if (!file) {
      this.image = null;
      return;
    }
    if (file.type.indexOf('image') === -1) {
      swal('Oops!', 'The file selected is not an image!', 'error');
      this.image = null;
      return;
    }
    const fileReader = new FileReader();
    const url = fileReader.readAsDataURL(file);
    fileReader.onloadend = () => this.tempImage = fileReader.result;
    this.image = file;
  }

  private updateImage() {
    this._userService.updateImage(this.image, this.user._id)
      .then((res: any) => {
        if (res.ok === true) {
          swal('Success!', 'Your picture has been updated', 'success');
          this._userService.saveOnStorage(res.user._id, this._userService.token, res.user);
        }
      }).catch(err => {
        console.log(err);
      });
  }

  private updateProfile(user: User) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this._userService.updateUser(this.user)
      .subscribe((success: any) => {
        if (success === true) {
          swal('Success!', 'Your user information has been updated', 'success');
        }
      }, err => {
        console.log(err);
      });
  }

}
