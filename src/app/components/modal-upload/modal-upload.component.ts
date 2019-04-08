import { Component, OnInit } from '@angular/core';
import * as swal from "sweetalert";
import {UploadFileService} from "../../services/uploadFile/upload-file.service";
import {ModalUploadService} from "./modal-upload.service";

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  image: File;
  tempImage: string;

  constructor(private uploadFileService: UploadFileService,
              public modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }

  closeModal(){
    this.tempImage = null;
    this.image = null;
    this.modalUploadService.hideModal();
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

  private uploadImage(){
    this.uploadFileService.uploadFile(this.image, this.modalUploadService.type, this.modalUploadService.id)
      .then(response => {
        console.log('Image uploaded', response);
        this.modalUploadService.eventEmitter.emit(response);
        this.closeModal();
      })
      .catch(error => console.error('Error uploading file'));
  }

}
