import { Injectable, signal, WritableSignal } from '@angular/core';
import { IPROPERTY } from '../interfaces/property.interface';
import { DbService } from './db.service';
import { v4 as uuid4 } from 'uuid';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  properties: WritableSignal<IPROPERTY[] | null> = signal(null);
  propertiesT5: WritableSignal<IPROPERTY[] | null> = signal(null);

  constructor(private db: DbService, private supabase: SupabaseService) {
    let properties = this.getAllProperties();

    if (properties.length < 1) {
      this.db.seedProperties([]);
      return
    }
    this.properties.set(properties);

    const random = [...properties].sort(() => 0.5 - Math.random()).slice(0, 5);

    this.propertiesT5.set(random)


  }

  // Obtener todas las propiedades
  getAllProperties(): IPROPERTY[] {
    return this.db.getProperties();
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }

  // Crear propiedad
  async createProperty(property: IPROPERTY, file: File) {
    if (property.imageUrl instanceof File) {
      const id: string = uuid4();
      console.log(id);
      const path = `properties/${id}`;

      const { data, error } = await this.supabase.uploadFile(path, file);

      if (error) return { error: 'Error subiendo' };

      property.imageUrl = data.fullPath;
      property.id = id;
    }

    const result = this.db.createProperty(property);
    this.properties.update((last) => [...last!, result]);

    return result;
  }

  getPropertyById(id: string) {
    return this.db.findById('properties', id);
  }

  // Actualizar propiedad
  updateProperty(updatedProperty: IPROPERTY, file: File | null): void {
    const properties = this.getAllProperties();

    const index = properties.findIndex((p) => p.id === updatedProperty.id);

    properties[index] = updatedProperty; // Actualizar la propiedad en el array
    if (!file) return
    this.supabase.updateFile(`properties/${updatedProperty.id}`, file);
    // this.db.
    // this.saveProperties(properties); // Método que guardarías para persistir los cambios
  }

  getUrl(propertyId: string) {
    const url = this.properties()!.find(
      (property) => propertyId === property.id
    );
    return url?.imageUrl;
  }

  // Eliminar propiedad
  deleteProperty(propertyId: string) {
    console.log(`properties/${propertyId}`);
    this.supabase.deleteFile(`properties/${propertyId}`);
    return this.db.deleteProperty(propertyId);
  }

  // Obtener propiedades por el propietario
  getPropertiesByOwner(ownerId: string): IPROPERTY[] {
    const properties = this.getAllProperties();
    return properties.filter((property) => property.ownerId === ownerId);
  }
}
