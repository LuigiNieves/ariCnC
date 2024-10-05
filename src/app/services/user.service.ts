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
    const user = this.db.findById('users',id);

    if (!user) return;

    this.user.set(user as IUSER);
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
    const userCreated = this.db.insertUser(user);
    if (!userCreated) return false;
    this.findById(userCreated.id!);
    localStorage.setItem('session', JSON.stringify(userCreated));
    return true;
  }

  logOut() {
    localStorage.removeItem('session');
    this.user.set(null);
  }

  async update(user: IUSER) {
    if (user.photo instanceof File) {
      user.idPhoto = uuid4();

      const folderName = `/user/${user.idPhoto}`;
      const { data } = await this.supabase.uploadFile(folderName, user.photo);
      user.photo = data.fullPath;
    }

    return this.db.updateUser(user);
  }
}
