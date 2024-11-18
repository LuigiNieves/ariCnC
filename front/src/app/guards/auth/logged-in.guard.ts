import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  try {
    if (userService.user() != null) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Invalid token');
    }

    const value = await userService.getToken();

    if (!value) throw new Error('Not logged in');

    return true;
  } catch (error) {
    router.navigate(['/login']);

    return false;
  }
};
