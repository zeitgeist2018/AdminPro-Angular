import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../../services/doctor/doctor.service";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];

  constructor(public doctorService: DoctorService) { }

  ngOnInit() {
    this.loadDoctors();
  }

  search(search: string) {
    if (search.length <= 0) {
      this.loadDoctors();
    } else if (search.length > 2) {
      this.doctorService.search(search).subscribe(doctors => {
        this.doctors = doctors;
      });
    }
  }

  loadDoctors(){
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  deleteDoctor(doctor: Doctor){
    this.doctorService.deleteDoctor(doctor._id).subscribe(doctor => {
      this.loadDoctors();
    });
  }

}
