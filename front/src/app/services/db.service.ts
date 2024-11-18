import { Injectable } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';

import { v4 as uuidv4 } from 'uuid';
import { IREALSTATE } from '../interfaces/property.interface';
import { dbKeys } from '../interfaces/database.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db!: {
    users: IUSER[];
    RealState: IREALSTATE[];
  };

  private url = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {
    this.getRealState();
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

  getRealState() {
    return this.http.get<IREALSTATE[]>(this.url + '/real-states').pipe(
      tap((response) => {
        this.db.RealState = response as IREALSTATE[];
        return response;
      }),
      catchError((e) => e.message)
    );
  }

  getRealStateByOwner(ownerId: string) {
    return this.http
      .get<IREALSTATE[]>(this.url + '/real-states/owner/' + ownerId)
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((e) => e.message)
      );
  }

  updateRealState(realState: IREALSTATE) {
    return this.http
      .put<IREALSTATE>(`${this.url}/real-states/${realState.id}`, realState)
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

  insertProperty() {}

  createRealState(property: IREALSTATE, userId: string) {
    return this.http.post(`${this.url}/real-states`, { ...property, userId }).pipe(
      tap((response) => {
        return response;
      }),
      catchError((e) => e.message)
    );
  }

  deleteProperty(id: string) {
    const index = this.db.RealState.findIndex((property) => property.id == id);

    if (index == -1) return false;

    this.db.RealState.splice(index, 1);

    this.updateDatabase();

    return true;
  }

  repeatedEmailOrusername(userUpdate: IUSER) {
    return this.db.users.find(
      (user) => user.id != userUpdate.id && user.username == userUpdate.username
    );
  }

  updateUser(user: IUSER) {
    const findUser = this.repeatedEmailOrusername(user);
    if (findUser) return false;

    const userUpdate = this.db.users.find(({ id }) => id === user.id);

    userUpdate!.bio = user.bio;
    userUpdate!.idPhoto = user.idPhoto;
    userUpdate!.photo = user.photo;
    userUpdate!.username = user.username.toLowerCase().trim();

    this.updateDatabase();

    return true;
  }

  updateDatabase() {
    localStorage.setItem('DB', JSON.stringify(this.db));
  }
}
