import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { settings, TasksService } from 'src/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() TaskData:
    | {
        userid: any;
        username: any;
        photo: any;
        email: any;
        title: any;
        desc: any;
        taskuuid: any;
      }
    | undefined;
  constructor(
    private TasksService: TasksService,
    private snackBar: MatSnackBar
  ) {}
  isEditing = () => {
    if (this.TasksService.editingTask === undefined) return false;
    if (this.TasksService.editingTask === this.TaskData?.taskuuid) {
      return true;
    }
    return false;
  };
  edit_task = () => {
    this.TasksService.editingTask = this.TaskData?.taskuuid;
    console.log(this.TasksService.editingTask);
  };
  delete_task = async () => {
    const response = await this.TasksService.deleteTask(
      this.TaskData?.taskuuid
    );
    if (response.error) {
      this.snackBar.open(
        `Task with ID ` +
          this.TaskData?.taskuuid +
          ` couldn't be deleted! Error: ` +
          response.err_msg,
        'Close',
        settings
      );
    } else {
      this.snackBar.open(
        `Task with ID ` + this.TaskData?.taskuuid + ` have been deleted!`,
        'Close',
        settings
      );
    }
  };
}
