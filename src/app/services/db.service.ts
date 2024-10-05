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

  seedProperties(properties: IPROPERTY[]) {
    this.db.properties = properties;
    this.updateDatabase();
  }

  // TODO: HACER SEED PARA USUARIOS

  seedUsers(users: IUSER[]) {
    this.db.users = users;
    this.updateDatabase();
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
    this.db.users.push({...user});
    this.updateDatabase();
    return {...user };
  }

  insertProperty() {}

  createProperty(property: IPROPERTY) {
    this.db.properties.push({...property });
    this.updateDatabase();
    return {...property };
  }

  deleteProperty(id: string) {
    const index = this.db.properties.findIndex((property) => property.id == id);

    if (index == -1) return false;

    this.db.properties.splice(index, 1);

    this.updateDatabase();

    return true;
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
    userUpdate!.idPhoto = user.idPhoto;
    userUpdate!.photo = user.photo;
    userUpdate!.userName = user.userName.toLowerCase().trim();

    this.updateDatabase();

    return true;
  }

  // updateProperty(property: IPROPERTY){
  //    const userUpdate = this.db.users.find(({ id }) => id === user.id);

  // }

  updateDatabase() {
    localStorage.setItem('DB', JSON.stringify(this.db));
  }
}
