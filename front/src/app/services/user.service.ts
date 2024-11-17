import { Injectable, signal, WritableSignal } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';
import { DbService } from './db.service';
import { SupabaseService } from './supabase.service';
import { UserClaims } from '../interfaces/user-claims.interface';
import { v4 as uuid4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: WritableSignal<IUSER | null> = signal(null);

  #isLogged = signal(!!localStorage.getItem('loggedUser'));
  #urlBase = 'http://localhost:3000/api';

  constructor(
    private db: DbService,
    private supabase: SupabaseService,
    private http: HttpClient,
    private router: Router
  ) {}

  get loginStatus() {
    return this.#isLogged;
  }

  get username() {
    return localStorage.getItem('loggedUser');
  }

  get token() {
    return localStorage.getItem('token');
  }

  get userr() {
    try {
      return jwtDecode<UserClaims>(localStorage.getItem('token') || '');
    } catch {
      throw Error('Error authenticating user');
    }
  }

  getToken() {
    const token = this.token;
    if (!token) return;
    return this.http.post(`${this.#urlBase}/users/token`, { token }).pipe(
      tap((user) => {
        this.user.set(user as IUSER);
        this.#isLogged.update(() => true);
      }),
      catchError(async (error) => localStorage.removeItem('token'))
    );
  }

  logIn(username: string, password: string) {
    return this.db.login(username, password).pipe(
      tap((res) => {
        this.#isLogged.update(() => true);
        localStorage.setItem('token', res.token as any);
        this.user.update(() => res as IUSER);
        this.router.navigateByUrl('/home');
      }),
      catchError(async (error) => {
        Swal.fire({
          title: 'ups',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      })
    );
  }

  logOut() {
    this.#isLogged.update(() => false);
    localStorage.clear();
  }

  register(user: IUSER) {
    console.log(user);
    return this.http.post<LoginResponse>(`${this.#urlBase}/users`, user).pipe(
      tap((response) => {
        this.#isLogged.update(() => true);
        this.setToken(response.token);
        console.log(user, this.#urlBase, response);
      }),
      map(() => {
        return;
      })
    );
  }

  async update(user: IUSER) {
    if (user.photo instanceof File) {
      user.idPhoto = uuid4();

      const folderName = `/users/${user.idPhoto}`;
      const { data } = await this.supabase.uploadFile(folderName, user.photo);
      user.photo = data.fullPath;
    }

    return this.db.updateUser(user);
  }

  private getHeaders() {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
