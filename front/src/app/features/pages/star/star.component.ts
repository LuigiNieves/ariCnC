import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css',
})
export class StarComponent {
  @Input() active!: boolean;
  @Input() id!: number;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  setValue() {
    this.onClick.emit(this.id);
  }
}
