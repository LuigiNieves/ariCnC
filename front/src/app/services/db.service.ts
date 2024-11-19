import { Injectable } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';

import { v4 as uuidv4 } from 'uuid';
import { IREALSTATE } from '../interfaces/property.interface';
import { dbKeys } from '../interfaces/database.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { IBOOKING } from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db!: {
    users: IUSER[];
    RealState: IREALSTATE[];
  };

  public url = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {
    this.getRealState();
  }

  changeStars(rating: number, bookingId: string) {
    return this.http
      .patch(this.url + '/bookings/rating/' + bookingId, { rating })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.url}/users/login`, { username, password })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  getReservations(userId: string) {
    return this.http
      .get<IBOOKING[]>(this.url + '/bookings/user/' + userId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        tap((response) => {
          console.log(response);
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  getRealState() {
    return this.http
      .get<IREALSTATE[]>(this.url + '/real-states', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        tap((response) => {
          console.log(response);
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  getRealStateByOwner(ownerId: string) {
    return this.http
      .get<IREALSTATE[]>(this.url + '/real-states/owner/' + ownerId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  updateRealState(realState: IREALSTATE) {
    return this.http
      .put<IREALSTATE>(
        `${this.url}/real-states/${realState.realStateId}`,
        realState,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  findById(key: dbKeys, id: string) {
    return this.http.get(`${this.url}/${key}/${id}`).pipe(
      tap((response) => {
        return response;
      }),
      catchError((e) => e.message)
    );
  }

  findOne(username: string) {
    username = username.trim().toLowerCase();
    return this.http.get(`${this.url}/users/username/${username}`).pipe(
      tap((response) => {
        return response;
      }),
      catchError((e) => e.message)
    );
  }

  insertUser(user: IUSER) {
    const userExists = this.findOne(user.username);
    if (userExists) return false;
    user.email = user.email?.trim().toLowerCase();
    user.username = user.username.trim().toLowerCase();
    return this.http.post(`${this.url}/users`, user).pipe(
      tap((response) => {
        return response;
      }),
      catchError((e) => e.message)
    );
  }

  createRealState(property: IREALSTATE, userId: string) {
    return this.http
      .post(`${this.url}/real-states`, { ...property, userId })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  deleteProperty(id: string) {
    return this.http.delete(`${this.url}/real-states/${id}`);
  }

  updateUser(user: IUSER) {
    return this.http.put(`${this.url}/users/${user.userId}`, user);
  }

  updateDatabase() {
    localStorage.setItem('DB', JSON.stringify(this.db));
  }

  createBooking(booking: IBOOKING) {
    return this.http.post(`${this.url}/bookings`, booking).pipe(
      tap((response) => {
        return response;
      }),
      catchError((e) => e.message)
    );
  }
}
