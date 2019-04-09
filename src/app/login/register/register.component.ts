import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function initPlugins();
import * as swal from 'sweetalert';
import { UserService } from '../../services/services.index';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
    initPlugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      terms: new FormControl(false)
    }, { validators: this.equals('password', 'password2') });

    this.fillSampleData();
  }

  fillSampleData(){
    this.form.setValue({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      terms: false
    });
  }

  equals(field1: string, field2: string) {
    return (group: FormGroup) => {
      const _field1 = group.controls[field1].value;
      const _field2 = group.controls[field2].value;
      if (_field1 === _field2) {
        return null;
      }
      return {
        equals: true
      };
    };
  }

  register() {
    if (!this.form.valid) {
      return;
    }
    if (!this.form.value.terms) {
      swal('Oops!', 'You must accept our terms and conditions', 'warning');
      return;
    }
    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );
    this._userService.register(user)
      .subscribe(res => {
        console.log(res);
        swal('Congratulations!', `Congratulations ${user.name}, you are now registered!`, 'success');
        this._router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
  }
}
