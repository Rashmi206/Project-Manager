import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/schemas/user.schema';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectForm = this.fb.group(
    {
      projectName: ['', Validators.required],
      priority: [0, Validators.required],
      dateCheck: [false],
      startDate: [''],
      endDate: [''],
      manager: ['', Validators.required]
    }
  );
  searchText = "";
  sortBy = "";
  projects: any;
  users: User[];
  selectedManager: any;
  editMode = false;
  objId: any;
  error: any = { isError: false, errorMessage: '' };
  user: User[];
  constructor(private fb: FormBuilder, private projectService: ProjectService, public dialog: MatDialog,
    private userService: UserService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.getProjectList();
    this.disableDate();
    this.userService.getAllUsers().subscribe(users => this.users = Object.assign([], users));
  }

  get projectform() { return this.projectForm.controls; }

  getProjectList() {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = Object.assign([], data);
      for (const project of this.projects)
        project['completed'] = this.getCompletedTasks(project);
    })
  }

  getCompletedTasks(project) {
    let finished = 0;
    for (const task of project.tasks)
      if (task.finished == true)
        finished++;
    return (finished);
  }

  checkDate() {
    if (this.projectform.dateCheck.value)
      this.enableDate();
    else
      this.disableDate();
    this.compareTwoDates();
  }

  disableDate() {
    this.projectForm.controls["startDate"].disable();
    this.projectForm.controls["endDate"].disable();
    this.projectForm.controls["startDate"].setValue('');
    this.projectForm.controls["endDate"].setValue('');
  }

  enableDate() {
    this.projectForm.controls["startDate"].enable();
    this.projectForm.controls["endDate"].enable();
    this.projectForm.controls["startDate"].setValidators([Validators.required]);
    this.projectForm.controls["endDate"].setValidators([Validators.required]);
    if (this.projectform.startDate.value == '') {
      var m = new Date();
      var dateString =
        m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2);
      this.projectForm.controls["startDate"].setValue(dateString);
    }
    if (this.projectform.endDate.value == '') {
      var m = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000);
      var dateString =
        m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2);
      this.projectForm.controls["endDate"].setValue(dateString);
    }
  }

  openManager() {
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select Manager', genericList: this.users, prop: ['firstName', 'lastName', 'employeeId'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedManager = result;
        this.projectForm.patchValue({
          manager: result.firstName,
        });
      }
    });
  }

  compareTwoDates() {
    if (this.projectForm.controls['dateCheck'].value) {
      if (new Date(this.projectForm.controls['endDate'].value) < new Date(this.projectForm.controls['startDate'].value)) {
        this.error = { isError: true, errorMessage: "End Date can't before start date" };
        this.projectForm.setErrors({ 'invalid': true });
        return false;
      }
      else {
        this.error = { isError: false };
        this.projectForm.setErrors(null);
        return true;
      }
    }
    else {
      this.error = { isError: false };
      this.projectForm.setErrors(null);
      return true;
    }
  }
  sortFunction(key) {
    if (key == this.sortBy)
      this.sortBy = undefined;
    else
      this.sortBy = key;
  }
  addProject() {
    if (this.compareTwoDates()) {
      const projectData = {
        project: this.projectform.projectName.value,
        startDate: (this.projectform.startDate.value == '' || this.projectform.startDate.value == null) ? undefined : this.projectform.startDate.value,
        endDate: (this.projectform.endDate.value == '' || this.projectform.endDate.value == null) ? undefined : this.projectform.endDate.value,
        priority: this.projectform.priority.value,
        manager: this.selectedManager._id
      }
      this.projectService.addProject(projectData).subscribe(data => {
        alert("Project added successfully");
        this.getProjectList();
        this.resetFields();
      })
    }
  }
  resetFields() {
    this.projectForm.reset();
    this.projectForm.controls["priority"].setValue(0);
    this.editMode = false;
    this.selectedManager = undefined;
    this.objId = undefined;
    this.projectForm.controls["startDate"].setValue('');
    this.projectForm.controls["endDate"].setValue('');
  }
  enableEditProject(project) {
    this.userService.getUserById(project.manager).subscribe(data => {
      this.user = Object.assign([], data);
      this.projectForm.setValue({
        projectName: project.project,
        priority: project.priority,
        manager: this.user['firstName'],
        startDate: this.datepipe.transform(project.startDate, 'yyyy-MM-dd'),
        endDate: this.datepipe.transform(project.endDate, 'yyyy-MM-dd'),
        dateCheck: true
      });
      this.editMode = true;
      this.selectedManager = project.manager;
      this.objId = project._id;
    })
  }

  editProject() {
    if (this.compareTwoDates()) {
      const projectData = {
        project: this.projectform.projectName.value,
        startDate: (this.projectform.startDate.value == '' || this.projectform.startDate.value == null) ? undefined : this.projectform.startDate.value,
        endDate: (this.projectform.endDate.value == '' || this.projectform.endDate.value == null) ? undefined : this.projectform.endDate.value,
        priority: this.projectform.priority.value,
        manager: this.selectedManager._id
      }
      this.projectService.editProject(projectData, this.objId).subscribe(data => {
        alert("Project updated successfully");
        this.getProjectList();
        this.resetFields();
      })
    }
  }

  suspendProject(pid) {
    this.projectService.deleteProject(pid).subscribe(data => {
      alert("Project deleted successfully");
      this.getProjectList();
    })
  }

} 
