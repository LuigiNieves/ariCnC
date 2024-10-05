import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { singUpValidators } from '../../const/validators';
import { UserService } from '../../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    userName: ['', singUpValidators],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    retypePassword: ['', [Validators.required]],
    owner: [''],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService
  ) {}

  onRegister() {
    if (!this.signUpForm.valid) {
      Swal.fire({
        icon: 'error',
        text: 'Diligenciar el formulario',
        title: 'Upss!!',
      });
      return;
    }
    const userName = this.signUpForm.value.userName || '';
    const password = this.signUpForm.value.password || '';
    const rePassword = this.signUpForm.value.retypePassword || '';
    const email = this.signUpForm.value.email || '';
    const id = uuidv4();
    const idPhoto = 'default.jfif';
    const bio = 'vacia';

    let strOwner = this.signUpForm.value.owner || '';
    const owner = strOwner === '' ? false : true;

    if (rePassword !== password) {
      Swal.fire({
        icon: 'error',
        text: 'Contrasñas no coinciden',
        title: 'Upss!!',
      });
      return;
    }
    const response = this.user.register({
      id,
      userName,
      password,
      idPhoto,
      bio,
      email,
      owner,
    });

    if (response) {
      this.router.navigateByUrl('/home');
    } else {
      alert(response);
    }
  }
}
