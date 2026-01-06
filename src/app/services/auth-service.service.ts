import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

interface JwtPayload{
  role?: string;
  exp?: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'token';
  private readonly BASE_URL = "http://localhost:5089/api";
  constructor(private http: HttpClient) { }
  handleSignIn(Email: string, Password: string): Observable<any>{
    const payload = {Email, Password};
    return this.http.post(`${this.BASE_URL + '/Auth/login'}`, payload);

  }
  handleSignUp(Username: string, Email: string, Password: string, Role: string): Observable<any>{
    const payload = {Username, Email, Password, Role};
    return this.http.post(`${this.BASE_URL + '/Auth/register'}`, payload);
  }
  sendResetCode(Email: string): Observable<any>{
    const payload = {Email};
    return this.http.post(`${this.BASE_URL + '/Auth/send-code'}`, payload);
  }
  resetPasswordWithCode(Email: string, NewPassword: string, Code: string): Observable<any>{
    const payload = {Email, NewPassword, Code};
    return this.http.post(`${this.BASE_URL + '/Auth/reset-password'}`, payload);
  }
  logout(){
    localStorage.removeItem(this.STORAGE_KEY);
  }
  isLoggedIn() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

getToken(): string | null{
  return localStorage.getItem('token');
}

getDecodedToken(): JwtPayload | null{
  const token = this.getToken();
  if(!token) return null;
  return jwtDecode<JwtPayload>(token);
}

getUserData(data: string): string | null{
  const decoded: any = this.getDecodedToken();
  if(data == "role"){
    return decoded?.[
      `http://schemas.microsoft.com/ws/2008/06/identity/claims/${data}`
    ] || null;
  }else{
    return decoded?.[
      `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/${data}`
    ] || null;
  }
}

}
