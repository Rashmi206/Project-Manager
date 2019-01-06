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
    return this.http.get<any>('/api/parents');
  }
  addParentTask(parent) {
    return this.http.post<any>('/api/parent', parent, httpOptions);
  }
  addTask(task) {
    return this.http.post<any>('/api/task', task, httpOptions);
  }
  viewTaskByProject(pid) {
    return this.http.get<any>('/api/task-by-project/' + pid);
  }
  endTask(tid, data) {
    return this.http.put<any>('/api/task/' + tid, data, httpOptions);
  }
  getTask(tid) {
    return this.http.get<any>('/api/task/' + tid);
  }
  getParentById(pid) {
    return this.http.get<any>('/api/parent/' + pid);
  }
  getParentsByProject(pid) {
    return this.http.get<any>('/api/parent-of-project/' + pid);
  }
}
