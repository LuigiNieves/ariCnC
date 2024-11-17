import { Component } from '@angular/core';
import { IREALSTATE } from '../../../interfaces/property.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  property: IREALSTATE | null = null;

  constructor(
    private router: ActivatedRoute,
    public propertyService: PropertyService,
    public supabase: SupabaseService
  ) {
    this.router.paramMap.subscribe((param) => {
      this.property = propertyService.getPropertyById(
        param.get('id')!
      ) as unknown as IREALSTATE;

      console.log(this.property)
    });
  }




  
}
