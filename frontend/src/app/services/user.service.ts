import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any>('/api/users');
  }
  addUser(user) {
    return this.http.post<any>('/api/user', user, httpOptions);
  }
  editUser(user, uid) {
    return this.http.put<any>('/api/user/' + uid, user, httpOptions);
  }
  deleteUser(uid) {
    return this.http.delete<any>('/api/user/' + uid);
  }
  getUserById(uid) {
    return this.http.get<any>('/api/user/' + uid);
  }
}
