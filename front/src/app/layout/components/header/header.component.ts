import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUSER } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public user: IUSER | null | undefined;

  constructor(public userService: UserService, private router: Router, public supabase : SupabaseService) {
    this.user = this.userService.user();
  }

  logOut() {
    this.userService.logOut();
  }
}
