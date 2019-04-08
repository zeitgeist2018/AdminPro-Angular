import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../config/config";
import {UserService} from "../user/user.service";
import * as swal from 'sweetalert';
import {Doctor} from "../../models/doctor.model";

@Injectable()
export class DoctorService {

  public totalCount: number = 0;

  constructor(private _http: HttpClient,
              private userService: UserService) {
  }

  search(search: string) {
    const url = BASE_URL + '/search/collection/doctors/' + search;
    return this._http.get(url)
      .map((res: any) => res.doctors);
  }

  getDoctors() {
    const url = BASE_URL + '/doctors';
    return this._http.get(url)
      .map((res: any) => {
        this.totalCount = res.totalCount;
        return res.doctors;
      });
  }

  getById(id: string) {
    const url = BASE_URL + '/doctors/' + id;
    return this._http.get(url)
      .map((res: any) => {
        return res.doctor;
      });
  }

  deleteDoctor(id: string) {
    const url = BASE_URL + '/doctors/' + id + '?token=' + this.userService.token;
    return this._http.delete(url)
      .map(res => {
        swal('Doctor deleted', 'Doctor deleted successfully', 'success')
      });
  }

  saveDoctor(doctor: Doctor) {
    if (doctor._id) {
      const url = BASE_URL + '/doctors/' + doctor._id + '?token=' + this.userService.token;
      return this._http.put(url, doctor)
        .map((res: any) => {
          swal('Doctor ' + res.doctor.name + ' updated', 'Doctor updated successfully', 'success')
          return res.doctor;
        });
    } else {
      const url = BASE_URL + '/doctors?token=' + this.userService.token;
      return this._http.post(url, doctor)
        .map((res: any) => {
          swal('Doctor ' + res.doctor.name + ' created', 'Doctor created successfully', 'success')
          return res.doctor;
        });
    }
  }

}
