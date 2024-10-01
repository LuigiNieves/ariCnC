import { Injectable } from '@angular/core';
import { IPROPERTY } from '../interfaces/property.interface';
import { DbService } from './db.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { v4 as uuid4 } from 'uuid';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private db: DbService, private supabase: SupabaseService) {}

  // Obtener todas las propiedades
  getAllProperties(): IPROPERTY[] {
    return this.db.getProperties();
  }

  // Crear propiedad
  async createProperty(property: IPROPERTY) {
    if (property.imageUrl instanceof File) {
      const id = uuid4();
      const path = `/properties/${id}`;
      const { data } = await this.supabase.uploadFile(path, property.imageUrl);
      property.imageUrl = data.fullPath;
    }

    return this.db.createProperty(property);
  }

  // Actualizar propiedad
  updateProperty(updatedProperty: IPROPERTY): void {
    const properties = this.getAllProperties();
    const index = properties.findIndex((p) => p.id === updatedProperty.id);
  }

  // Eliminar propiedad
  deleteProperty(propertyId: string) {
    return this.db.deleteProperty(propertyId);
  }

  // Obtener propiedades por el propietario
  getPropertiesByOwner(ownerId: string): IPROPERTY[] {
    const properties = this.getAllProperties();
    return properties.filter((property) => property.ownerId === ownerId);
  }

}
