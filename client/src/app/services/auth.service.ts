import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import IUser from '../models/user.model';

const AUTH_API = 'http://localhost:5000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = true;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    )
  }

  register(userData: IUser): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        userData
      },
      httpOptions
    );
  }

  logout($event?: Event): any {
    if ($event) {
      $event.preventDefault
    }

    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
