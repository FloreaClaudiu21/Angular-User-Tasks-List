import { Component } from '@angular/core';
import { UserService } from 'src/services/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  constructor(public UserService: UserService) {}
}
