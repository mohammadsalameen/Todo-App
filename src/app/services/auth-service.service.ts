import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'loggedUser';
  private readonly BASE_URL = "http://localhost:5089/api";
  constructor(private http: HttpClient) { }
  handleSignIn(Email: string, Password: string): Observable<any>{
    // if(Email === "admin@gmail.com" && Password === "123456"){
    //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify({Email}));
    //   return true;
    // } else return false;
    const payload = {Email, Password};
    return this.http.post(`${this.BASE_URL + '/Auth/login'}`, payload);

  }
  handleSignUp(Username: string, Email: string, Password: string, Role: string): Observable<any>{
    const payload = {Username, Email, Password, Role};
    return this.http.post(`${this.BASE_URL + '/Auth/register'}`, payload);
  }
  logout(){
    localStorage.removeItem(this.STORAGE_KEY);
  }
  isLoggedIn() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }


}
