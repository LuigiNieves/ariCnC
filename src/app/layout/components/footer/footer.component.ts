import { Component } from '@angular/core';
import { IUSER } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public user: IUSER | null | undefined;

  constructor(public userService: UserService) {
    this.user = this.userService.user();

    setTimeout(()=>{
      console.log(this.user)
    },2000)
  }
}
