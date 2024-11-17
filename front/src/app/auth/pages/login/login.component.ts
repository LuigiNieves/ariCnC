import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    owner: [''],
  });

  constructor(private fb: FormBuilder, private user: UserService) {}

  onLogin() {
    if (!this.loginForm.valid) {
      Swal.fire({
        icon: 'error',
        text: 'Diligenciar el formulario',
        title: 'Upss!!',
      });
      return;
    }
    let userName = this.loginForm.value.userName || '';
    let password = this.loginForm.value.password || '';

    this.user.logIn(userName, password).subscribe();
  }
}
