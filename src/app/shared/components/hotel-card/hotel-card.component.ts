import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MapPin, Star, Search, Heart } from 'lucide-angular';
import { Hotel } from '../../../models';

@Component({
    selector: 'app-hotel-card',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './hotel-card.component.html',
    styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent {
    @Input({ required: true }) hotel!: Hotel;
    @Output() cardClick = new EventEmitter<Hotel>();

    readonly MapPin = MapPin;
    readonly Star = Star;
    readonly Search = Search;
    readonly Heart = Heart;

    onCardClick(): void {
        this.cardClick.emit(this.hotel);
    }

    getStarArray(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }
}
