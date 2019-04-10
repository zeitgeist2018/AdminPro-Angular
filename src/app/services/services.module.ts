import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  UploadFileService,
  ModalUploadService,
  HospitalService,
  DoctorService,
  AuthGuard,
  AdminGuard,
  VerifyTokenGuard
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
    ModalUploadService,
    HospitalService,
    DoctorService,
    AuthGuard,
    AdminGuard,
    VerifyTokenGuard
  ],
  declarations: []
})
export class ServicesModule { }
