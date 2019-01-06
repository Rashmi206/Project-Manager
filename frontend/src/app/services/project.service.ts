import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  getAllProjects() {
    return this.http.get<any>('/api/project-tasks');
  }
  addProject(project) {
    return this.http.post<any>('/api/project', project, httpOptions);
  }
  editProject(data, pid) {
    return this.http.put<any>('/api/project/' + pid, data, httpOptions);
  }
  deleteProject(pid) {
    return this.http.delete<any>('/api/project/' + pid);
  }
  getProjectById(pid) {
    return this.http.get<any>('/api/project/' + pid);
  }
}
