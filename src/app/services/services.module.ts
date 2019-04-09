import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  AuthGuard,
  AdminGuard,
  UploadFileService,
  ModalUploadService,
  HospitalService,
  DoctorService
} from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    UploadFileService,
    AuthGuard,
    AdminGuard,
    ModalUploadService,
    HospitalService,
    DoctorService
  ],
  declarations: []
})
export class ServicesModule { }
