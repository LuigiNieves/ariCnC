import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUSER } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public user: IUSER | null | undefined;

  constructor(public userService: UserService) {
    this.user = this.userService.user();

    setTimeout(()=>{
      console.log(this.user)
    },2000)
  }
}
