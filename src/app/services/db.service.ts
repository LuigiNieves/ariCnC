import { Injectable } from '@angular/core';
import { IUSER } from '../interfaces/user.interface';

import { v4 as uuidv4 } from 'uuid';
import { IPROPERTY } from '../interfaces/property.interface';
import { dbKeys } from '../interfaces/database.interface';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db!: {
    users: IUSER[];
    properties: IPROPERTY[];
  };

  constructor() {
    const db = localStorage.getItem('DB');

    if (db) {
      this.db = JSON.parse(db);
    } else {
      this.db = { users: [], properties: [] };
      localStorage.setItem('DB', '{"users": [],"properties":[]}');
    }
  }

  findById(key: dbKeys, id: string) {
    return this.db[key].find((user) => user.id === id);
  }

  findOne(userName: string) {
    userName = userName.trim().toLowerCase();
    return this.db.users.find((user) => user.userName === userName);
  }

  insertUser(user: IUSER) {
    const userExists = this.findOne(user.userName);
    if (userExists) return false;
    user.email = user.email?.trim().toLowerCase();
    user.userName = user.userName.trim().toLowerCase();
    const id = uuidv4();
    this.db.users.push({ id, ...user });
    this.updateDatabase();
    return { id, ...user };
  }

  insertProperty() {}

  createProperty(property: IPROPERTY) {
    const id = uuidv4();
    this.db.properties.push({ id, ...property });
    this.updateDatabase();
    return { id, ...property };
  }

  deleteProperty(id: string) {
    const index = this.db.properties.findIndex((property) => property.id == id);

    if (index == -1) return false;

    this.db.properties.splice(index, 1);

    this.updateDatabase();

    return true
  }

  getProperties() {
    return this.db.properties;
  }

  repeatedEmailOrUserName(userUpdate: IUSER) {
    return this.db.users.find(
      (user) => user.id != userUpdate.id && user.userName == userUpdate.userName
    );
  }

  updateUser(user: IUSER) {
    const findUser = this.repeatedEmailOrUserName(user);
    if (findUser) return false;

    const userUpdate = this.db.users.find(({ id }) => id === user.id);

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
