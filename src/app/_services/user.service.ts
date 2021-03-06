﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserList } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }
    
    auditList(id) {
        return this.http.get<UserList[]>(`${config.apiUrl}/users/audit/${id}`);
    }
 
    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}