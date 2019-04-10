import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {NopagefoundComponent} from './shared/nopagefound/nopagefound.component';
import {PagesComponent} from "./pages/pages.component";
import {AuthGuard} from "./services/services.index";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  {path: '**', component: NopagefoundComponent},
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
