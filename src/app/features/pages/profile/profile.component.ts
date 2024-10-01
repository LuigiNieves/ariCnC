import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  // // Propiedades para almacenar los datos actuales
  // usuario: string | null = '';
  // imagen: string | null = '';
  // biografia: string | null = '';


  // constructor(private fb:FormBuilder) {
  //   // Inicializa el formulario con campos vacíos
  //   // this.perfilForm = ({
  //   //   usuario: new FormControl(''),
  //   //   imagen: new FormControl(''),
  //   //   biografia: new FormControl('')
  //   // });
  // }

  // ngOnInit(): void {
  //   // Obtén los datos del usuario desde el localStorage
  //   const currentUser = JSON.parse(localStorage.getItem('database') || 'null');

  //   if (currentUser) {
  //     this.usuario = currentUser.username;
  //     this.imagen = currentUser.image;
  //     this.biografia = currentUser.biografia;

  //     // Inicializa el formulario con los datos actuales
  //     this.perfilForm.setValue({
  //       usuario: this.usuario,
  //       imagen: this.imagen,
  //       biografia: this.biografia
  //     });
  //   } else {
  //     console.error('No se encontró un usuario en sesión');
  //   }
  // }

  // // Método para guardar los cambios en el perfil
  // guardarCambios() {
  //   // Obtén los valores del formulario
  //   // const updatedUser = {
  //   //   username: this.perfilForm.value.usuario,
  //   //   image: this.perfilForm.value.imagen,
  //   //   biografia: this.perfilForm.value.biografia
  //   // };

  //   // Guarda el usuario actualizado en localStorage
  //   localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  //   // Muestra un mensaje o redirige al usuario, según el flujo de la app
  //   console.log('Perfil actualizado:', updatedUser);
  //   alert('Perfil actualizado con éxito');
  // }

}
