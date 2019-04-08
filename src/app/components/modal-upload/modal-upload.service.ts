import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ModalUploadService {

  type: string;
  id: string;
  public hidden: string = 'hidden';

  eventEmitter = new EventEmitter<any>();

  hideModal(){
    this.hidden = 'hidden';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.hidden = '';
    this.type = type;
    this.id = id;
  }

}
