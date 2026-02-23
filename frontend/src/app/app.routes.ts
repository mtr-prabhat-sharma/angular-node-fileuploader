import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { HeaderComponent } from './header-component/header-component';

export const routes: Routes = [

  // Login page (NO header)
  { path: 'login', component: LoginComponent },

  // Protected routes (WITH header layout)
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Redirect everything else to login
  { path: '**', redirectTo: 'login' }
];