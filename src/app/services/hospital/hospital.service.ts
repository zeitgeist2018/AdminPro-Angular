import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../config/config";
import {UserService} from "../user/user.service";
import {Hospital} from "../../models/hospital.model";
import * as swal from 'sweetalert';

@Injectable()
export class HospitalService {

  public totalCount: number = 0;

  constructor(private _http: HttpClient,
              private userService: UserService) {

  }

  getAll() {
    const url = BASE_URL + '/hospitals';
    return this._http.get(url)
      .map((res: any) => {
        this.totalCount = res.totalCount;
        return res.hospitals;
      })
  }

  getById(id: string) {
    const url = BASE_URL + '/hospitals/' + id;
    return this._http.get(url)
      .map((res: any) => res.hospital);
  }

  deleteById(id: string) {
    const url = BASE_URL + '/hospitals/' + id + '?token=' + this.userService.token;
    return this._http.delete(url)
      .map(res => swal('Hospital deleted', 'Hospital deleted successfully', 'success'));
  }

  create(name: string) {
    const url = BASE_URL + '/hospitals?token=' + this.userService.token;
    return this._http.post(url, {name})
      .map((res: any) => res.hospital);
  }

  search(search: string) {
    const url = BASE_URL + '/search/collection/hospitals/' + search;
    return this._http.get(url)
      .map((res: any) => res.hospitals);
  }

  update(hospital: Hospital) {
    const url = BASE_URL + '/hospitals/' + hospital._id + '?token=' + this.userService.token;
    return this._http.put(url, hospital)
      .map((res: any) => {
        swal('Hospital updated', 'Hospital ' + hospital.name + ' updated', 'success');
        return res.hospital;
      });
  }

}
