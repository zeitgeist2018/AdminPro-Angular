import {EventEmitter, Injectable} from '@angular/core';

export enum Type{
  DOCTORS = 'doctors',
  HOSPITALS = 'hospitals',
  USERS = 'users'
}

@Injectable()
export class ModalUploadService {

  type: Type;
  id: string;
  public hidden: string = 'hidden';

  eventEmitter = new EventEmitter<any>();

  hideModal(){
    this.hidden = 'hidden';
    this.type = null;
    this.id = null;
  }

  showModal(type: Type, id: string) {
    this.hidden = '';
    this.type = type;
    this.id = id;
  }

}
