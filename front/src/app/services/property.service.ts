import { Injectable, signal, WritableSignal } from '@angular/core';
import { IREALSTATE } from '../interfaces/property.interface';
import { DbService } from './db.service';
import { v4 as uuid4 } from 'uuid';
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';
import { of, tap } from 'rxjs';
import { IBOOKING } from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  realState: WritableSignal<IREALSTATE[]> = signal([]);
  realStateT5: WritableSignal<IREALSTATE[]> = signal([]);

  constructor(
    private db: DbService,
    private supabase: SupabaseService,
    private userService: UserService
  ) {
    this.getAllRealState().subscribe((realState) => {
      console.log({ realState });
      this.realState.set(realState as IREALSTATE[]);
      this.realStateT5.set(
        [...(realState as IREALSTATE[])]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
      );
    });
  }

  changeStars(rating: number, reviewId: string) {
    return this.db.changeStars(rating, reviewId);
  }

  getReservations() {
    const userId = this.userService.user()?.userId;
    return this.db.getReservations(userId!);
  }

  updateRealState(realState: IREALSTATE) {
    return this.db.updateRealState(realState);
  }

  getAllRealState() {
    return this.db.getRealState();
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }

  // Crear propiedad
  async createProperty(property: IREALSTATE, file: File) {
    if (file instanceof File) {
      const id: string = uuid4();
      console.log(id);
      const path = `realState/${id}`;

      const { data, error } = await this.supabase.uploadFile(path, file);

      if (error) return of(error);

      property.imageUrl = data.fullPath;
      property.realStateId = id;
    }

    return this.db
      .createRealState(property, this.userService.user()?.userId!)
      .pipe(
        tap((result) => {
          this.realState.update((last) => [...last!, result as IREALSTATE]);
        })
      );
  }

  getPropertyById(id: string) {
    return this.db.findById('real-states', id);
  }

  // Actualizar propiedad
  updateProperty(updateRealState: IREALSTATE, file: File | null) {
    if (file) {
      this.supabase.updateFile(
        `realState/${updateRealState.realStateId}`,
        file
      );
    }
    return this.db.updateRealState(updateRealState);
  }

  getUrl(propertyId: string) {
    const url = this.realState()!.find(
      (property) => propertyId === property.realStateId
    );
    return url?.imageUrl;
  }

  // Eliminar propiedad
  deleteProperty(propertyId: string) {
    this.supabase.deleteFile(`realState/${propertyId}`);
    this.realState.update((last) =>
      [...last].filter((r) => r.realStateId !== propertyId)
    );
    this.realStateT5.update((last) =>
      [...last].filter((r) => r.realStateId !== propertyId)
    );
    return this.db.deleteProperty(propertyId).subscribe();
  }

  // Obtener propiedades por el propietario
  getRealStateByOwner(ownerId: string) {
    return this.db.getRealStateByOwner(ownerId);
  }

  createBooking(booking: IBOOKING) {
    return this.db.createBooking(booking);
  }
}
