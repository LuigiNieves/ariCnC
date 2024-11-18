import { Component, signal, WritableSignal } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { IUSER } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { PropertyService } from '../../../services/property.service';
import { SupabaseService } from '../../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { FilterEnum } from '../../../enum/filter.enum';
import { IREALSTATE } from '../../../interfaces/property.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FooterComponent, HeaderComponent, RouterLink],
})
export class HomeComponent {
  public user: IUSER | null | undefined;

  filter: WritableSignal<FilterEnum> = signal(FilterEnum.ALL);
  FilterEnum = FilterEnum;

  constructor(
    public userService: UserService,
    public supabase: SupabaseService,
    public propertyService: PropertyService
  ) {
    this.user = this.userService.user();
  }

  setFilter(filter: FilterEnum) {
    // if (filter == this.filter()) {
    //   this.filter.set(FilterEnum.ALL);
    //   this.updateProperties()
    //   return;
    // }
    // this.filter.set(filter);
    // this.filterProperties.set(filterAll);
    // this.filterPropertiesT5.set(filterT5);
  }
}
