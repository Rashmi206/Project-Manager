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
  editMode=false;
  objId:any;
  searchText="";
  sortBy="";
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
    this.editMode=false;
    this.objId=undefined;
  }

  enableEditUser(user){
    this.userForm.setValue({
      firstName:user.firstName,
      lastName:user.lastName,
      employeeId:user.employeeId
    });
    this.editMode=true;
    this.objId=user._id;
  }

  editUser(){
    this.userService.editUser(this.userForm.value,this.objId).subscribe(data=>{
      alert("User updated successfully");
      this.getUserList();
      this.resetFields();
    })
  }

  deleteUser(uid){
    this.userService.deleteUser(uid).subscribe(data=>{
      alert("User Deleted successfully");
      this.getUserList();
    })
  }

  sortFunction(key){
    if(key==this.sortBy)
      this.sortBy=undefined;
    else
      this.sortBy=key;
  }
}
