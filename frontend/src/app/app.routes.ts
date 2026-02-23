import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { HeaderComponent } from './header-component/header-component';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [

  // Login page (NO header)
  { path: 'login', component: LoginComponent },

  // Protected routes (WITH header layout)
  {
    path: '',
    loadComponent: () => import('./header-component/header-component').then(m => m.HeaderComponent),
    canActivate:[AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard-component/dashboard-component').then(m => m.DashboardComponent) },
    ]
  },
  {path:'registration', loadComponent: () => import('./user-registration/user-registration').then(m => m.UserRegistration)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Redirect everything else to login
  { path: '**', redirectTo: 'login' }
];