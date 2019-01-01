import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/schemas/user.schema';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { Project } from 'src/app/schemas/project.schema';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/schemas/task.schema';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { ParentTask } from 'src/app/schemas/parentTask.schema';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm = this.fb.group(
    {
      project: ['', Validators.required],
      task: ['', Validators.required],
      priority: [0],
      parentCheck: [false],
      parentTask: [''],
      startDate: [''],
      endDate: [''],
      user: ['']
    }
  );
  error: any = { isError: false, errorMessage: '' };
  users: User[];
  selectedUser: any;
  projects: Project[];
  selectedProject: any;
  parentTasks: ParentTask[];
  selectedTask: any;
  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private userService: UserService, private projectService: ProjectService, private taskService: TaskServiceService) { }

  ngOnInit() {
    this.enableFields();
    this.userService.getAllUsers().subscribe(users => this.users = Object.assign([], users));
    this.projectService.getAllProjects().subscribe(projects => this.projects = Object.assign([], projects));
    this.taskService.getAllParentTasks().subscribe(tasks => this.parentTasks = Object.assign([], tasks));
  }

  get taskform() { return this.taskForm.controls; }

  checkParent() {
    if (this.taskform.parentCheck.value)
      this.disableFields();
    else
      this.enableFields();
  }

  enableFields() {
    this.taskForm.controls["priority"].enable();
    this.taskForm.controls["parentTask"].enable();
    this.taskForm.controls["startDate"].enable();
    this.taskForm.controls["endDate"].enable();
    this.taskForm.controls["user"].enable();
    this.taskForm.controls["priority"].setValidators([Validators.required]);
    this.taskForm.controls["startDate"].setValidators([Validators.required]);
    this.taskForm.controls["endDate"].setValidators([Validators.required]);
    this.taskForm.controls["user"].setValidators([Validators.required]);
    var m = new Date();
    var dateString =
      m.getUTCFullYear() + "-" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
      ("0" + m.getUTCDate()).slice(-2);
    this.taskForm.controls["startDate"].setValue(dateString);
    m = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000);
    var dateString =
      m.getUTCFullYear() + "-" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
      ("0" + m.getUTCDate()).slice(-2);
    this.taskForm.controls["endDate"].setValue(dateString);
  }

  disableFields() {
    this.taskForm.controls["priority"].disable();
    this.taskForm.controls["parentTask"].disable();
    this.taskForm.controls["startDate"].disable();
    this.taskForm.controls["endDate"].disable();
    this.taskForm.controls["user"].disable();
    this.taskForm.controls["priority"].setValue(0);
    this.taskForm.controls["parentTask"].setValue('');
    this.taskForm.controls["startDate"].setValue('');
    this.taskForm.controls["endDate"].setValue('');
    this.taskForm.controls["user"].setValue('');
    this.compareTwoDates();
  }
  compareTwoDates() {
    if (!this.taskForm.controls['parentCheck'].value) {
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
  resetFields() {
    this.taskForm.reset();
    this.taskForm.controls["priority"].setValue(0);
    this.selectedUser = undefined;
    this.selectedProject = undefined;
    this.selectedTask = undefined;
    this.enableFields();
  }
  addTask() {
    if (this.compareTwoDates()) {
      if (this.taskForm.controls['parentCheck'].value) {
        const parentTask = {
          parent: this.taskform.task.value,
          projectId: this.selectedProject._id
        }
        this.taskService.addParentTask(parentTask).subscribe(data => {
          alert("Parent Task added successfully");
          this.resetFields();
        })
      }
      else {
        const task = {
          task: this.taskform.task.value,
          startDate: this.taskform.startDate.value,
          endDate: this.taskform.endDate.value,
          priority: this.taskform.priority.value,
          projectId: this.selectedProject._id,
          parentId: this.selectedTask != null ? this.selectedTask._id : null,
          userId: this.selectedUser._id
        }
        this.taskService.addTask(task).subscribe(data => {
          alert("Task added successfully");
          this.resetFields();
        })
      }
    }
  }
}
