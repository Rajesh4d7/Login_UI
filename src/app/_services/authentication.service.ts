import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        let ipAddress= localStorage.getItem('ipAddress');
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password, ipAddress})
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    logout() {
        // remove user from local storage and set current user to null
        let username= JSON.parse(localStorage.getItem('currentUser')).username;
        return this.http.post<any>(`${config.apiUrl}/users/logout`, { username })
        .pipe(map(user => {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
        }));
    }

    getIp(){
        this.http.get("https://api.ipify.org?format=json").subscribe(resp=>{
            localStorage.setItem( 'ipAddress' , resp['ip']);
        });
    }
}