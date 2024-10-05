import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-real-estate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.css',
})
export class RealEstateComponent {
  private fb = inject(FormBuilder);

  // Signal para las propiedades
  addSelect = signal<boolean>(false);
  editSelect = signal<boolean>(false);
  propertiesSignal = signal<IPROPERTY[]>([]);

  editingProperty: IPROPERTY | null = null;
  editPropertyForm: FormGroup;
  addPropertyForm: FormGroup;
  selectedImage: File | null = null;

  CATEGORIES = Object.values(FilterEnum).filter((v) => v);

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    public supabase: SupabaseService
  ) {
    this.editPropertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      location: ['', Validators.required],
    });

    this.addPropertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      location: ['', Validators.required],
    });

    this.loadProperties(); // Cargar las propiedades al inicializar el componente
  }

  toggleAddFormSignal() {
    this.addSelect.set(!this.addSelect());
  }
  toggleEditFormSignal() {
    this.editSelect.set(!this.editSelect());
  }

  // Cargar propiedades del propietario
  loadProperties(): void {
    const ownerId = this.userService.user()?.id; // Cambia esto por la lógica de obtención del propietario
    const properties = this.propertyService.getPropertiesByOwner(ownerId!);
    this.propertiesSignal.set(properties); // Establecer las propiedades en el Signal
  }

  // Manejar la edición de la propiedad
  onEditProperty(property: IPROPERTY): void {
    this.editingProperty = property;
    this.toggleEditFormSignal();
    this.addPropertyForm.patchValue(property);
  }

  // Guardar los cambios de la edición
  onSubmitEdit(): void {
    if (this.addPropertyForm.valid && this.editingProperty) {
      const categories = this.getSelectedCategories()
      const updatedProperty = {
        ...this.editingProperty,
        categories,
        ...this.addPropertyForm.value,
      };
      this.propertyService.updateProperty(updatedProperty, this.selectedImage);
      this.loadProperties(); // Recargar las propiedades para reflejar los cambios
      this.editingProperty = null;
      this.toggleEditFormSignal();
    }
  }

  // Eliminar una propiedad
  onDeleteProperty(propertyId: string): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(propertyId);
      this.loadProperties(); // Recargar propiedades después de la eliminación
    }
  }

  // Seleccionar archivo de imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  getSelectedCategories() {
    const categoryItems = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;

    const categories: FilterEnum[] = [];

    categoryItems.forEach((category) => {
      if (category.checked) {
        categories.push(category.value as FilterEnum);
      }
    });

    return categories;
  }

  // Agregar una nueva propiedad
  async onAddProperty() {
    if (this.addPropertyForm.valid && this.selectedImage) {
      const categories = this.getSelectedCategories()

      const newProperty: IPROPERTY = {
        ...this.addPropertyForm.value,
        categories,
        imageUrl: this.selectedImage,
        ownerId: this.userService.user()?.id, // Cambia esto por la lógica de obtención del propietario
      };

      const property: any = await this.propertyService.createProperty(
        newProperty,
        this.selectedImage
      );

      if (property?.error) {
        console.log('Error subiendo');
        return;
      }

      this.propertiesSignal.update((last) => [...last, property]);

      this.selectedImage = null;
      this.toggleAddFormSignal();
    }
  }
}
import { IPROPERTY } from '../../../interfaces/property.interface';
import { UserService } from '../../../services/user.service';
import { SupabaseService } from '../../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../../enum/filter.enum';
