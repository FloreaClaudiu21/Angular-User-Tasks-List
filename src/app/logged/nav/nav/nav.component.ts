import { Component, Input } from '@angular/core';
import { IUser, UserService } from 'src/services/user-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @Input() userData: IUser | null = null;
  constructor(public UserService: UserService) {}
}
