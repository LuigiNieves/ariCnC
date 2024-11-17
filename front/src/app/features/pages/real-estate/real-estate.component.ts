import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FilterEnum } from '../../../enum/filter.enum';
import { IREALSTATE } from '../../../interfaces/property.interface';
import { UserService } from '../../../services/user.service';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-real-estate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css'],
})
export class RealEstateComponent {
  private fb = inject(FormBuilder);

  addSelect = signal(false);
  editSelect = signal(false);
  propertiesSignal = signal<IREALSTATE[]>([]);

  editingProperty: IREALSTATE | null = null;
  addPropertyForm: FormGroup;
  selectedImage: File | null = null;

  CATEGORIES = Object.values(FilterEnum).filter(Boolean);

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) {
    this.addPropertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      location: ['', Validators.required],
    });

    this.loadProperties();
  }

  toggleAddFormSignal() {
    this.addSelect.set(!this.addSelect());
  }

  toggleEditFormSignal() {
    this.editSelect.set(!this.editSelect());
  }

  loadProperties() {
    setTimeout(() => {
      const ownerId = this.userService.user()?.userId;
      console.log(ownerId)
      this.propertyService
        .getRealStateByOwner(ownerId!)
        .subscribe((properties) => {
          return this.propertiesSignal.set(properties as IREALSTATE[]);
        });
    }, 400);
  }

  onEditProperty(property: IREALSTATE) {
    this.editingProperty = property;
    this.toggleEditFormSignal();
    this.addPropertyForm.patchValue(property);
  }

  onSubmitEdit() {
    if (this.addPropertyForm.valid && this.editingProperty) {
      const updatedProperty = {
        ...this.editingProperty,
        ...this.addPropertyForm.value,
      };
      // this.propertyService.updateProperty(updatedProperty);
      this.loadProperties();
      this.editingProperty = null;
      this.toggleEditFormSignal();
    }
  }

  onDeleteProperty(propertyId: string) {
    if (confirm('¿Estás seguro de eliminar esta propiedad?')) {
      this.propertyService.deleteProperty(propertyId);
      this.loadProperties();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  async onAddProperty() {
    if (this.addPropertyForm.valid && this.selectedImage) {
      const ownerId = this.userService.user()?.id;
      const newProperty: IREALSTATE = {
        ...this.addPropertyForm.value,
        ownerId,
      };
      const result = await this.propertyService.createProperty(
        newProperty,
        this.selectedImage
      );

      // if (result.error) {
      //   Swal.fire('Error al agregar propiedad', result.error.message, 'error');
      //   return;
      // }

      // this.propertiesSignal.update((properties) => [...properties, result]);
      // this.toggleAddFormSignal();
      // this.selectedImage = null;
    }
  }
}
