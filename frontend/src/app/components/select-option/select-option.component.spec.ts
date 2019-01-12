import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AppComponent } from 'src/app/app.component';
import { By } from '@angular/platform-browser';

describe('SelectOptionComponent', () => {
  let component: SelectOptionComponent;
  let fixture: ComponentFixture<SelectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        AddProjectComponent,
        AddTaskComponent,
        AddUserComponent,
        ViewTaskComponent,
        SelectOptionComponent, SearchPipe,EditTaskComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
