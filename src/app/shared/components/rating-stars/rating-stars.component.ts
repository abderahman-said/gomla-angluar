import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star, StarHalf } from 'lucide-angular';

@Component({
    selector: 'app-rating-stars',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="flex items-center gap-1">
      @for (star of stars; track $index) {
        <lucide-icon
          [img]="star.icon"
          [class]="star.filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
          [size]="size"
        />
      }
      @if (showNumeric) {
        <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 ms-2">
          {{ rating.toFixed(1) }}
        </span>
      }
    </div>
  `
})
export class RatingStarsComponent {
    @Input() rating: number = 0;
    @Input() size: number = 16;
    @Input() showNumeric: boolean = false;

    readonly Star = Star;
    readonly StarHalf = StarHalf;

    get stars() {
        const stars = [];
        const fullStars = Math.floor(this.rating);
        const hasHalfStar = this.rating % 1 >= 0.5;

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push({ icon: Star, filled: true });
        }

        // Half star
        if (hasHalfStar && fullStars < 5) {
            stars.push({ icon: StarHalf, filled: true });
        }

        // Empty stars
        const remaining = 5 - stars.length;
        for (let i = 0; i < remaining; i++) {
            stars.push({ icon: Star, filled: false });
        }

        return stars;
    }
}
