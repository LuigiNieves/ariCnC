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
    public supabase: SupabaseService,
    public routerNav: Router
  ) {
    this.router.paramMap.subscribe((param) => {
      propertyService
        .getPropertyById(param.get('id')!)
        .subscribe((property) => {
          if (typeof property == 'string') {
            this.routerNav.navigate(['/home']);
            return;
          }
          this.property = property as IREALSTATE;
          console.log(property);
        });
    });
  }
}
