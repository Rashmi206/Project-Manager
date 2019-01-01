import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }
  getAllParentTasks() {
    return this.http.get('http://localhost:3000/parents');
  }
  addParentTask(parent) {
    return this.http.post('http://localhost:3000/parent', parent, httpOptions);
  }
  addTask(task) {
    return this.http.post('http://localhost:3000/task', task, httpOptions);
  }
  viewTaskByProject(pid) {
    return this.http.get('http://localhost:3000/task-by-project/' + pid);
  }
  endTask(tid, data) {
    return this.http.put('http://localhost:3000/task/' + tid, data, httpOptions);
  }
  getTask(tid) {
    return this.http.get('http://localhost:3000/task/' + tid);
  }
  getParentById(pid) {
    return this.http.get('http://localhost:3000/parent/' + pid);
  }
  getParentsByProject(pid) {
    return this.http.get('http://localhost:3000/parent-of-project/' + pid);
  }
}
