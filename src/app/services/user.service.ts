import { Injectable, signal, WritableSignal } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';
import { DbService } from './db.service';
import { SupabaseService } from './supabase.service';

import { v4 as uuid4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: WritableSignal<IUSER | null> = signal(null);

  constructor(private db: DbService, private supabase: SupabaseService) {}

  findById(id: string) {
    const user = this.db.findById(id);

    if (!user) return;

    this.user.set(user);
  }

  logIn(userName: string, password: string) {
    const user = this.db.findOne(userName);

    console.log(user);

    if (!user || user.password !== password) {
      return null;
    }

    localStorage.setItem('session', JSON.stringify(user));

    this.user.set(user);

    return user;
  }

  register(user: IUSER) {
    const userCreated = this.db.insert(user);
    if (!userCreated) return false;
    this.findById(userCreated.id);
    localStorage.setItem('session', JSON.stringify(userCreated));
    return true;
  }

  logOut() {
    localStorage.removeItem('session');
    this.user.set(null);
  }

  async update(user: IUSER) {
    if (user.photo instanceof File) {
      const path = uuid4();

      const folerName = `/${user.id}/${path}`;
      const { data } = await this.supabase.uploadFile(folerName, user.photo);
      user.photo = data.fullPath;
    }

    return this.db.update(user);
  }
}
