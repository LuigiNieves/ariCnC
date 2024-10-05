import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { RealEstateComponent } from './features/pages/real-estate/real-estate.component';
import { PropertyComponent } from './features/pages/property/property.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'real-state', component: RealEstateComponent },
      { path: 'real-state/:id', component: PropertyComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
