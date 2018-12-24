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
    return this.http.get('http://localhost:3000/users');
  }
  addUser(user){
    return this.http.post('http://localhost:3000/user', user, httpOptions);
  }
  editUser(user,uid){
    return this.http.put('http://localhost:3000/user/'+uid,user,httpOptions);
  }
  deleteUser(uid){
    return this.http.delete('http://localhost:3000/user/'+uid);
  }
}
