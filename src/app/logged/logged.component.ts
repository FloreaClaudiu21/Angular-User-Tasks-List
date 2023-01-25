import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { settings, TasksService } from 'src/services/tasks.service';
import { IUser, UserService } from 'src/services/user-service.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
})
export class LoggedComponent {
  userData: IUser | null;
  taskTitle: string | undefined;
  taskDesc: string | undefined;
  errorMsg: string | undefined;
  constructor(
    public UserService: UserService,
    public TasksService: TasksService,
    private snackBar: MatSnackBar
  ) {
    this.userData = UserService.userData();
  }
  hasError = (): boolean => {
    if (this.errorMsg === undefined) return false;
    return this.errorMsg?.length > 0;
  };
  addTask = async () => {
    if (this.userData == null) return;
    if (this.taskTitle === undefined || this.taskTitle.length <= 0) {
      this.errorMsg = 'Please specify the task title..';
      return;
    }
    if (this.taskDesc === undefined || this.taskDesc.length <= 0) {
      this.errorMsg = 'Please specify the task description..';
      return;
    }
    const response = await this.TasksService.addTask(
      this.userData.id,
      this.taskTitle,
      this.taskDesc
    );
    if (response.error) {
      this.snackBar.open(
        `Task couldn't be added! Error: ` + response.err_msg,
        'Close',
        settings
      );
    } else {
      this.snackBar.open(
        `Task with ID ` + response.taskuuid + ` have been created!`,
        'Close',
        settings
      );
    }
    this.taskTitle = '';
    this.taskDesc = '';
    this.errorMsg = '';
  };
  hasTasks = (): boolean => {
    return this.TasksService.tasks.length > 0;
  };
}
