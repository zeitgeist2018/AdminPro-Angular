import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../config/config";
import {User} from "../../models/User.model";
import {Doctor} from "../../models/doctor.model";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private _http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      const search = params['search'];
      this.search(search);
    });
  }

  ngOnInit() {
  }

  search(search: string) {
    const url = BASE_URL + '/search/all/' + search;
    this._http.get(url).subscribe((res: any) => {
      this.users = res.users;
      this.doctors = res.doctors;
      this.hospitals = res.hospitals;
    });
  }

}
