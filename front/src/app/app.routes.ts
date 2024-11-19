import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { RealEstateComponent } from './features/pages/real-estate/real-estate.component';
import { PropertyComponent } from './features/pages/property/property.component';
import { loggedInGuard } from './guards/auth/logged-in.guard';
import { loggedOutGuard } from './guards/auth/logged-out.guard';
import { ReservesComponent } from './features/pages/reserves/reserves.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [loggedOutGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [loggedOutGuard],
      },
      { path: 'home', component: HomeComponent, canActivate: [loggedInGuard] },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [loggedInGuard],
      },
      {
        path: 'real-state',
        component: RealEstateComponent,
        canActivate: [loggedInGuard],
      },
      {
        path: 'real-state/:id',
        component: PropertyComponent,
        canActivate: [loggedInGuard],
      },
      {
        path: 'bookings',
        canActivate: [loggedInGuard],
        component: ReservesComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
