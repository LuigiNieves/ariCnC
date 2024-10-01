import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { loginValidators } from '../../const/validators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    userName: ['', loginValidators],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/'),
      ],
    ],
    password: ['', [Validators.required]],
    retypePassword: [''],
    owner: [''],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService
  ) {}

  onRegister() {
    const userName = this.signUpForm.value.userName || '';
    const password = this.signUpForm.value.password || '';
    const rePassword = this.signUpForm.value.retypePassword || '';

    const photo = '/assets/luigi.png';
    const bio = 'vacia';

    let strOwner = this.signUpForm.value.owner || '';
    const owner = strOwner === '' ? false : true;

    if (rePassword !== password) {
      alert('Contraseña no coincide');
      return;
    }
    const response = this.user.register({
      userName,
      password,
      photo,
      bio,
      owner,
    });

    if (response) {
      this.router.navigateByUrl('/home');
    } else {
      alert(response);
    }
  }
}
