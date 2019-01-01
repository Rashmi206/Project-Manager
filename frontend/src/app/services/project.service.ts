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
    return this.http.get('http://localhost:3000/project-tasks');
  }
  addProject(project) {
    return this.http.post('http://localhost:3000/project', project, httpOptions);
  }
  editProject(data, pid) {
    return this.http.put('http://localhost:3000/project/' + pid, data, httpOptions);
  }
  deleteProject(pid) {
    return this.http.delete('http://localhost:3000/project/' + pid);
  }
  getProjectById(pid) {
    return this.http.get('http://localhost:3000/project/' + pid);
  }
}
