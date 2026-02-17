import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
    selector: 'app-empty-state',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
      @if (icon) {
        <div class="mb-6 p-6 bg-slate-100 dark:bg-slate-800 rounded-full">
          <lucide-icon [img]="icon" [size]="48" class="text-slate-400 dark:text-slate-500" />
        </div>
      }
      
      <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {{ title }}
      </h3>
      
      @if (description) {
        <p class="text-slate-600 dark:text-slate-400 max-w-md mb-6">
          {{ description }}
        </p>
      }
      
      @if (ctaText) {
        <button
          (click)="onCtaClick()"
          class="btn-primary"
        >
          {{ ctaText }}
        </button>
      }
      
      <ng-content />
    </div>
  `
})
export class EmptyStateComponent {
    @Input() icon?: LucideIconData;
    @Input() title: string = 'لا توجد نتائج';
    @Input() description?: string;
    @Input() ctaText?: string;
    @Input() ctaAction?: () => void;

    onCtaClick(): void {
        if (this.ctaAction) {
            this.ctaAction();
        }
    }
}
