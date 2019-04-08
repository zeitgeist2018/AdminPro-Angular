import {Component, OnInit} from '@angular/core';
import {Hospital} from "../../models/hospital.model";
import {HospitalService} from "../../services/hospital/hospital.service";
import {ModalUploadService, Type} from "../../components/modal-upload/modal-upload.service";

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html'

})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[];

  constructor(public hospitalService: HospitalService,
              public modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
    this.loadHospitals();

    this.modalUploadService.eventEmitter.subscribe(() => {
      this.loadHospitals();
    });
  }

  loadHospitals() {
    this.hospitalService.getAll().subscribe(hospitals => {
      this.hospitals = hospitals;
    });
  }

  createHospitalModal() {
    swal({
      title: 'Create Hospital',
      text: 'Enter the hospital name',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((value: string) => {
      if (!value || value.length === 0) {
        return;
      }
      this.hospitalService.create(value).subscribe(() => {
        this.loadHospitals();
      });
    });
  }

  updateImage(hospital: Hospital) {
    this.modalUploadService.showModal(Type.HOSPITALS, hospital._id);
  }

  search(search: string) {
    if (search.length <= 0) {
      this.loadHospitals();
    } else if (search.length > 2) {
      this.hospitalService.search(search).subscribe(hospitals => {
        this.hospitals = hospitals;
      });
    }
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService.update(hospital).subscribe(() => {

    });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteById(hospital._id).subscribe(() => {
      this.loadHospitals();
    });
  }

}
