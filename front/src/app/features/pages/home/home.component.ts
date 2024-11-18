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

  filter: WritableSignal<string> = signal('');

  constructor(
    public userService: UserService,
    public supabase: SupabaseService,
    public propertyService: PropertyService
  ) {
    this.user = this.userService.user();
  }

  inFilter(realState: IREALSTATE) {
    if (this.filter().trim() === '') return true;

    const filter = this.filter().toLowerCase().trim();
    const title = realState.title.toLowerCase().trim();
    const description = realState.description.toLowerCase().trim();
    const location = realState.location.toLowerCase().trim();
    return (
      title.includes(filter) ||
      description.includes(filter) ||
      location.includes(filter)
    );
  }

  setFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filter.set(value);
  }
}
