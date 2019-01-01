import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { User } from 'src/app/schemas/user.schema';
import { ParentTask } from 'src/app/schemas/parentTask.schema';
import { Task } from 'src/app/schemas/task.schema';
import { DatePipe } from '@angular/common';
import { ProjectService } from 'src/app/services/project.service';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm = this.fb.group(
    {
      project: ['', Validators.required],
      task: ['', Validators.required],
      priority: [0],
      parentTask: [''],
      startDate: [''],
      endDate: [''],
      user: ['']
    }
  );
  error: any = { isError: false, errorMessage: '' };
  users: User[];
  selectedUser: any;
  parentTasks: ParentTask[];
  selectedTask: any;
  task: Task[];
  constructor(private route: ActivatedRoute, private fb: FormBuilder, public dialog: MatDialog, private userService: UserService, private projectService: ProjectService, private taskService: TaskServiceService, public datepipe: DatePipe, public router: Router) { }

  ngOnInit() {
    this.taskService.getTask(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.task = Object.assign([], data);
      this.projectService.getProjectById(this.task['projectId']).subscribe(projectData => {
        this.userService.getUserById(this.task['userId']).subscribe(userData => {
          if (this.task['parentId'] != null) {
            this.taskService.getParentById(this.task['parentId']).subscribe(parentData => {
              this.taskForm.setValue({
                project: projectData['project'],
                task: this.task['task'],
                priority: this.task['priority'],
                parentTask: parentData['parent'],
                startDate: this.datepipe.transform(this.task['startDate'], 'yyyy-MM-dd'),
                endDate: this.datepipe.transform(this.task['endDate'], 'yyyy-MM-dd'),
                user: userData['firstName']
              });
            });
            this.selectedUser = this.task['userId'];
            this.selectedTask = this.task['parentId'];
          }
          else {
            this.taskForm.setValue({
              project: projectData['project'],
              task: this.task['task'],
              priority: this.task['priority'],
              parentTask: this.task['parentId'],
              startDate: this.datepipe.transform(this.task['startDate'], 'yyyy-MM-dd'),
              endDate: this.datepipe.transform(this.task['endDate'], 'yyyy-MM-dd'),
              user: userData['firstName']
            });
            this.selectedUser = this.task['userId'];
          }
        })
      });
      this.taskService.getParentsByProject(this.task['projectId']).subscribe(tasks => this.parentTasks = Object.assign([], tasks));
    })
    this.userService.getAllUsers().subscribe(users => this.users = Object.assign([], users));
  }
  get taskform() { return this.taskForm.controls; }
  compareTwoDates() {
    if (new Date(this.taskForm.controls['endDate'].value) < new Date(this.taskForm.controls['startDate'].value)) {
      this.error = { isError: true, errorMessage: "End Date can't before start date" };
      this.taskForm.setErrors({ 'invalid': true });
      return false;
    }
    else {
      this.error = { isError: false };
      this.taskForm.setErrors(null);
      return true;
    }
  }
  openUser() {
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select User', genericList: this.users, prop: ['firstName', 'lastName', 'employeeId'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedUser = result;
        this.taskForm.patchValue({
          user: result.firstName,
        });
      }
    });
  }
  openTask() {
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select Parent Task', genericList: this.parentTasks, prop: ['parent'] }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedTask = result;
        this.taskForm.patchValue({
          parentTask: result.parent,
        });
      }
    });
  }
  clearParent() {
    this.taskForm.controls["parentTask"].setValue("");
    this.selectedTask = undefined;
  }
  navigateToViewTask() {
    this.taskForm.reset();
    this.router.navigate(['/view-task']);
  }
  updateTask() {
    if (this.compareTwoDates()) {
      const task = {
        task: this.taskform.task.value,
        startDate: this.taskform.startDate.value,
        endDate: this.taskform.endDate.value,
        priority: this.taskform.priority.value,
        parentId: this.selectedTask != null ? this.selectedTask._id : null,
        userId: this.selectedUser._id
      }
      this.taskService.endTask(this.route.snapshot.paramMap.get('id'), task).subscribe(data => {
        alert("Task updated successfully");
        this.navigateToViewTask();
      })
    }
  }
}
