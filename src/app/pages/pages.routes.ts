import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphs1Component} from './graphs1/graphs1.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {HospitalsComponent} from "./hospitals/hospitals.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {DoctorComponent} from "./doctors/doctor.component";
import {SearchComponent} from "./search/search.component";
import {AdminGuard, AuthGuard, VerifyTokenGuard} from '../services/services.index';

const pagesRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}, canActivate: [VerifyTokenGuard]},
  {path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
  {path: 'graphs1', component: Graphs1Component, data: {title: 'Charts'}},
  {path: 'promises', component: PromisesComponent, data: {title: 'Promises'}},
  {path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Account settings'}},
  {path: 'profile', component: ProfileComponent, data: {title: 'User Profile'}},
  {path: 'search/:search', component: SearchComponent, data: {title: 'Search'}},
  // Management
  {path: 'users', component: UsersComponent, data: {title: 'User management'}, canActivate: [AdminGuard]},
  {path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospital management'}},
  {path: 'doctors', component: DoctorsComponent, data: {title: 'Doctor management'}},
  {path: 'doctors/:id', component: DoctorComponent, data: {title: 'Doctor management'}},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
