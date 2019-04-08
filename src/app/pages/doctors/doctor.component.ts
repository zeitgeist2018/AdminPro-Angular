import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HospitalService} from "../../services/hospital/hospital.service";
import {Hospital} from "../../models/hospital.model";
import {Doctor} from "../../models/doctor.model";
import {DoctorService} from "../../services/doctor/doctor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalUploadService, Type} from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private modalUploadService: ModalUploadService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadHospitals();
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadDoctor(id);
      }
    });

    this.modalUploadService.eventEmitter.subscribe((res: any) => {
      this.doctor.image = res.doctor.image;
    });
  }

  loadDoctor(id: string) {
    this.doctorService.getById(id).subscribe((doctor: Doctor) => {
      this.doctor = doctor;
      const hospital: any = doctor.hospital;
      this.doctor.hospital = hospital._id;
      this.hospital = hospital;
    });
  }

  changeHospital(event) {
    const hospitalId = event.target.value;
    if (hospitalId) {
      this.hospitalService.getById(hospitalId).subscribe(hospital => {
        this.hospital = hospital;
      });
    }
  }

  loadHospitals() {
    this.hospitalService.getAll().subscribe(hospitals => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor(form: NgForm) {
    if (!form.invalid) {
      this.doctorService.saveDoctor(this.doctor).subscribe((doctor: Doctor) => {
        this.router.navigate(['/doctors', doctor._id])
      });
    }
  }

  updateImage(){
    this.modalUploadService.showModal(Type.DOCTORS, this.doctor._id);
  }

}
