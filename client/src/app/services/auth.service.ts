import { Injectable, afterNextRender } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';
import IUser from '../models/user.model';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:5000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private storage: StorageService) {

    this.isAuthenticated$
  }

  login(userData: IUser): Observable<any> {
    const res = this.http.post(
      AUTH_API + 'signin',
      {
        userData
      },
      httpOptions
    )
    res.subscribe(user => {
      setTimeout(() => {
        this.isAuthenticated$.next(true)
      }, 1000);
      this.storage.saveUser(user)
    })

    return res
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
    const res = this.http.post(AUTH_API + 'signout', {}, httpOptions);
    res.subscribe(user => {
      this.isAuthenticated$.next(false)
      this.storage.clean()
    })

    return res
  }
}
