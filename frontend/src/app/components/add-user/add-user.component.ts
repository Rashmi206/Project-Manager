import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/schemas/user.schema';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
    }
  );
  users: User[];
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
   this.getUserList();
  }

  get userform() { return this.userForm.controls; }

  addUser(){
    this.userService.addUser(this.userForm.value).subscribe(data=>{
      alert("User added successfully");
      this.getUserList();
      this.resetFields();
    })
  }

  getUserList(){
    this.userService.getAllUsers().subscribe(data => {
      this.users = Object.assign([], data);
    })
  }

  resetFields(){
    this.userForm.reset();
  }
}
