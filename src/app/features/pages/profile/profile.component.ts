import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class ProfileComponent {
  userForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    bio: [''],
    owner: [false, Validators.requiredTrue],
  });

  photo: File | null = null;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    public supabase: SupabaseService
  ) {
    // Inicializa el formulario con los valores actuales del signal sin modificarlo
    const userData = this.userService.user()!; // Obtiene el valor actual del signal

    this.userForm.setValue({
      userName: userData.userName || '',
      bio: userData.bio || '',
      owner: userData.owner || false,
    });
  }

  onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photo = input.files[0];
    }
  }

  async onSubmit() {
    // if (!this.userForm.valid) {
    //   Swal.fire({
    //     title: 'error',
    //     text: 'Los cambios no son validos',
    //     icon: 'error',
    //   });
    //   return this.resetForm();
    // }

    const { userName, bio } = this.userForm.value;
    const idPhoto = uuidv4();
    const result = await this.userService.update({
      id: this.userService.user()?.id,
      userName,
      bio,
      photo: this.photo || this.userService.user()?.photo,
    });

    if (result) {
      return Swal.fire({
        icon: 'success',
        text: 'Usuario actualizado con exito',
        title: '¡Exitoso!',
      });
    }

    return Swal.fire({
      icon: 'error',
      text: 'Nombre de usuario ya existe',
      title: 'Upss!!',
    });
  }

  // Método para resetear el formulario con los valores actuales del signal
  resetForm() {
    const userData = this.userService.user()!;
    this.userForm.reset({
      userName: userData.userName || '',
      photo: userData.photo || '',
      bio: userData.bio || '',
      owner: userData.owner || false,
    });
  }
}
