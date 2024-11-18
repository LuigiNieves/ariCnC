import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loggedOutGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  try {
    if (userService.user() != null) {
      throw new Error('User logged In');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }

    const value = await userService.getToken();

    if (!value) return true;

    throw new Error('Error in login');
  } catch (error) {
    router.navigate(['/home']);

    return false;
  }
};
