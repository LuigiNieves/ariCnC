import { Injectable } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';

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

  findOne(userName: string) {
    userName = userName.trim().toLowerCase();
    return this.db.find((user) => user.userName === userName);
  }

  insert(user: IUSER) {
    const userExists = this.findOne(user.userName)
    if (userExists) return false
    this.db.push(user);
    localStorage.setItem('DB', JSON.stringify(this.db));
    return true
  }
}
