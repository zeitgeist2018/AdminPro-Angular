import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../config/config";
import {UserService} from "../user/user.service";
import * as swal from 'sweetalert';

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

  deleteDoctor(id: string){
    const url = BASE_URL + '/doctors/' + id + '?token=' + this.userService.token;
    return this._http.delete(url)
      .map(res => {
        swal('Doctor deleted', 'Doctor deleted successfully', 'success')
      });
  }

}
