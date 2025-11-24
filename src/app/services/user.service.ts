import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(){
    const users = [
      { id: 1, name: 'Mohammad' },
      { id: 2, name: 'Ahmad' },
      { id: 3, name: 'Omar' }
    ];

    return users;
  }
}
