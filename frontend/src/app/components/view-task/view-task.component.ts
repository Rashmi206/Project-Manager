import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { Project } from 'src/app/schemas/project.schema';
import { ProjectService } from 'src/app/services/project.service';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskForm = this.fb.group(
    {
      project: ['', Validators.required]
    }
  );
  projects: Project[];
  selectedProject: any;
  tasks: any;
  sortBy = "";
  constructor(private fb: FormBuilder, public dialog: MatDialog, private projectService: ProjectService, private taskService: TaskServiceService, public router: Router) { }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projects => this.projects = Object.assign([], projects));
  }

  get taskform() { return this.taskForm.controls; }

  openProject() {
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select Project', genericList: this.projects, prop: ['project', 'startDate', 'endDate', 'priority'] }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedProject = result;
        this.taskForm.patchValue({
          project: result.project,
        });
        if (this.selectedProject != null) {
          this.getTasks();
        }
      }
    });
  }

  sortFunction(key) {
    if (key == this.sortBy)
      this.sortBy = undefined;
    else
      this.sortBy = key;
  }
  endTask(tid) {
    const data = {
      "finished": true
    }
    this.taskService.endTask(tid, data).subscribe(tasks => this.getTasks());
  }
  getTasks() {
    this.taskService.viewTaskByProject(this.selectedProject._id).subscribe(tasks => this.tasks = Object.assign([], tasks));
  }
  editTask(tid) {
    this.router.navigate(['/edit-task', tid]);
  }
}
