import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { PagesComponent } from './pages.component';

import { PAGES_ROUTES } from './pages.routes';
import { IncrementComponent } from '../components/increment/increment.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorComponent } from './doctors/doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { SearchComponent } from './search/search.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        IncrementComponent,  // Temporal,
        DoughnutChartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DoctorComponent,
        DoctorsComponent,
        SearchComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ChartsModule,
        PAGES_ROUTES,
        PipesModule
    ]
})

export class PagesModule { }
