import { Injectable, signal, WritableSignal } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public user: WritableSignal<IUSER | null> = signal(null);

  constructor(private db: DbService) {}

  logIn(userName: string, password: string) {
    const user = this.db.findOne(userName);

    if (!user || user.password !== password) {
      return null;
    }

    localStorage.setItem('session', JSON.stringify(user));

    this.user.set(user);

    console.log(user)

    return user;
  }

  register(user: IUSER) {
    return this.db.insert(user);
  }

  logOut() {
    localStorage.removeItem('session');
    this.user.set(null); 
  }
}
