import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'dashboard', component: DashboardComponent}
];
