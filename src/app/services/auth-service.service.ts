import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'loggedUser';
  constructor() { }
  login(email: string, password: string){
    if(email === "admin@gmail.com" && password === "123456"){
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({email}));
      return true;
    } else return false;
  }
  register(username: string, email: string, password: string){

  }
  logout(){
    localStorage.removeItem(this.STORAGE_KEY);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
