import { Component, signal, WritableSignal } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { IUSER } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { PropertyService } from '../../../services/property.service';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { FilterEnum } from '../../../enum/filter.enum';
import { IPROPERTY } from '../../../interfaces/property.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public user: IUSER | null | undefined;

  filter: WritableSignal<FilterEnum> = signal(FilterEnum.ALL);
  FilterEnum = FilterEnum;

  filterProperties: WritableSignal<IPROPERTY[]> = signal([]);
  filterPropertiesT5: WritableSignal<IPROPERTY[]> = signal([]);

  constructor(
    public userService: UserService,
    public propertyService: PropertyService,
    public supabase: SupabaseService
  ) {
    this.user = this.userService.user();
  }

  ngOnInit() {
    this.updateProperties()
  }

  updateProperties() {
    this.filterProperties.set([...this.propertyService.properties()!]);
    this.filterPropertiesT5.set([...this.propertyService.propertiesT5()!]);
  }

  setFilter(filter: FilterEnum) {
    if (filter == this.filter()) {
      this.filter.set(FilterEnum.ALL);
      this.updateProperties()
      return;
    }

    this.filter.set(filter);
    const filterT5 = [...this.propertyService.propertiesT5()!].filter(
      (property) => property.categories?.includes(filter)
    );
    const filterAll = [...this.propertyService.properties()!].filter(
      (property) => property.categories?.includes(filter)
    );

    this.filterProperties.set(filterAll);
    this.filterPropertiesT5.set(filterT5);
  }
}
