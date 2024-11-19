import { Component } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { IBOOKING } from '../../../interfaces/booking.interface';
import { StarComponent } from '../star/star.component';

@Component({
  selector: 'app-reserves',
  standalone: true,
  imports: [StarComponent],
  templateUrl: './reserves.component.html',
  styleUrl: './reserves.component.css',
})
export class ReservesComponent {
  reservations: any[] = [];

  stars = [0, 0, 0, 0, 0];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.propertyService.getReservations().subscribe((data) => {
      this.reservations = (data as IBOOKING[]).map((res: any) => ({
        ...res,
        startDate: new Date(res.startDate),
        endDate: new Date(res.endDate),
      }));
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }

  changeStars(newStars: number, bookingId: string) {
    this.reservations = this.reservations.map((reserve) => {
      if (reserve.bookingId === bookingId) {
        reserve.rating = newStars;
      }
      return reserve;
    });
    this.propertyService.changeStars(newStars, bookingId).subscribe();
  }
}
