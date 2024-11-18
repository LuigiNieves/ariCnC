import { Injectable, signal, WritableSignal } from '@angular/core';
import { IREALSTATE } from '../interfaces/property.interface';
import { DbService } from './db.service';
import { v4 as uuid4 } from 'uuid';
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  realState: WritableSignal<IREALSTATE[] | null> = signal(null);
  realStateT5: WritableSignal<IREALSTATE[] | null> = signal(null);

  constructor(
    private db: DbService,
    private supabase: SupabaseService,
    private userService: UserService
  ) {
    this.getAllRealState().subscribe((realState) => {
      this.realState.update(() => realState as IREALSTATE[]);
      this.realStateT5.update(() =>
        [...(realState as IREALSTATE[])]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
      );
    });
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
    if (property.imageUrl instanceof File) {
      const id: string = uuid4();
      console.log(id);
      const path = `realState/${id}`;

      const { data, error } = await this.supabase.uploadFile(path, file);

      console.log(path)

      if (error) return { error: 'Error subiendo' };

      property.imageUrl = data.fullPath;
      property.id = id;
    }

    const result = this.db
      .createRealState(property, this.userService.user()?.userId!)
      .subscribe((result) => {
        console.log('property created', result);
        this.realState.update((last) => [...last!, result as IREALSTATE]);
      });

    return result;
  }

  getPropertyById(id: string) {
    return this.db.findById('real-states', id);
  }

  // Actualizar propiedad
  updateProperty(updateRealState: IREALSTATE, file: File | null): void {
    if (!file) return;
    this.supabase.updateFile(`realState/${updateRealState.id}`, file);
    this.db.updateRealState(updateRealState);
  }

  getUrl(propertyId: string) {
    const url = this.realState()!.find(
      (property) => propertyId === property.id
    );
    return url?.imageUrl;
  }

  // Eliminar propiedad
  deleteProperty(propertyId: string) {
    console.log(`realState/${propertyId}`);
    this.supabase.deleteFile(`realState/${propertyId}`);
    return this.db.deleteProperty(propertyId);
  }

  // Obtener propiedades por el propietario
  getRealStateByOwner(ownerId: string) {
    return this.db.getRealStateByOwner(ownerId);
  }
}
