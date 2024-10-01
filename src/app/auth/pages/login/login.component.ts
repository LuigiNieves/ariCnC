import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginValidators } from '../../const/validators';
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
    userName: ['', loginValidators],
    password: ['', [Validators.required]],
    owner: [''],

    // Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!/%*?&])[A-Za-z\d@$!%/*?&]{12,20}$/')
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService
  ) {}

  onLogin() {
    if (!this.loginForm.valid) {
      alert('Diligencie el formulario');
      return;
    }
    let userName = this.loginForm.value.userName || '';
    let password = this.loginForm.value.password || '';

    const response = this.user.logIn(userName, password);

    if (response) {
      this.router.navigateByUrl('/home');
    } else {
      Swal.fire({
        title: 'ups',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
      });
    }
  }
}
