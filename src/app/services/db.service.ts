import { Injectable } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db!: IUSER[];

  constructor() {
    const db = localStorage.getItem('DB');

    if (db) {
      this.db = JSON.parse(db);
    } else {
      this.db = [];
      localStorage.setItem('DB', '[]');
    }
  }

  findById(id: string) {
    return this.db.find((user) => user.id === id);
  }

  findOne(userName: string) {
    userName = userName.trim().toLowerCase();
    console.log(userName, this.db);
    return this.db.find((user) => user.userName === userName);
  }

  insert(user: IUSER) {
    const userExists = this.findOne(user.userName);
    if (userExists) return false;
    user.email = user.email?.trim().toLowerCase();
    user.userName = user.userName.trim().toLowerCase();
    const id = uuidv4();
    this.db.push({ id, ...user });
    this.updateDatabase();
    return { id, ...user };
  }

  repeatedEmailOrUserName(userUpdate: IUSER) {
    return this.db.find(
      (user) => user.id != userUpdate.id && user.userName == userUpdate.userName
    );
  }

  update(user: IUSER) {
    const findUser = this.repeatedEmailOrUserName(user);
    if (findUser) return false;

    const userUpdate = this.db.find(({ id }) => id === user.id);

    userUpdate!.bio = user.bio;
    userUpdate!.photo = user.photo;
    userUpdate!.userName = user.userName.toLowerCase().trim();

    this.updateDatabase();

    return true;
  }

  updateDatabase() {
    localStorage.setItem('DB', JSON.stringify(this.db));
  }
}
