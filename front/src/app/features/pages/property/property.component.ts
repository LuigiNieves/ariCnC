import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { PropertyService } from '../../../services/property.service';
import { IREALSTATE } from '../../../interfaces/property.interface';
import { IBOOKING } from '../../../interfaces/booking.interface';

@Component({
  selector: 'app-realState',
  standalone: true,
  imports: [],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  realState: IREALSTATE | null = null;

  constructor(
    private router: ActivatedRoute,
    public supabase: SupabaseService,
    public routerNav: Router,
    public userService: UserService,
    public propertyService: PropertyService
  ) {
    this.router.paramMap.subscribe((param) => {
      propertyService
        .getPropertyById(param.get('id')!)
        .subscribe((realState) => {
          if (typeof realState == 'string') {
            this.routerNav.navigate(['/home']);
            return;
          }
          this.realState = realState as IREALSTATE;
          console.log(realState);
        });
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form || !(form instanceof HTMLFormElement)) {
      console.error('El evento no proviene de un formulario válido.');
      return;
    }

    const formData = new FormData(form);
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);

    // Validación de fechas
    if (startDate > endDate) {
      Swal.fire({
        icon: 'error',
        text: 'La fecha de inicio no puede ser posterior a la fecha de finalización.',
        title: 'Upss!!',
      });
      return;
    }

    // Cálculo de la diferencia de días
    const msInDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const differenceInMs = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(differenceInMs / msInDay); // Aseguramos redondeo hacia arriba

    const pricePerDay = +this.realState?.price!;
    const totalPrice = numberOfDays * pricePerDay;

    if (totalPrice <= 0) {
      Swal.fire({
        icon: 'error',
        text: 'El precio calculado no es válido. Verifica las fechas seleccionadas.',
        title: 'Error en el precio',
      });
      return;
    }

    const booking: IBOOKING = {
      realStateId: this.realState?.realStateId!,
      userId: this.userService.user()?.userId!,
      startDate,
      endDate,
      totalPrice,
    };

    // Enviar la reserva al backend
    this.propertyService.createBooking(booking).subscribe(() => {
      Swal.fire({
        icon: 'success',
        text: `El alquiler ha sido registrado exitosamente por un total de ${totalPrice}€.`,
        title: 'Alquiler registrado',
      });
    });
    form.reset();
  }
}
