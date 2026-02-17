import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'card' | 'list' | 'detail' | 'text';

@Component({
    selector: 'app-skeleton-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
    @switch (variant) {
      @case ('card') {
        <div class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-card">
          <div class="skeleton h-48 w-full rounded-t-lg"></div>
          <div class="p-4 space-y-3">
            <div class="skeleton h-6 w-3/4"></div>
            <div class="skeleton h-4 w-1/2"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-5/6"></div>
            <div class="flex justify-between items-center mt-4">
              <div class="skeleton h-8 w-24"></div>
              <div class="skeleton h-10 w-32"></div>
            </div>
          </div>
        </div>
      }
      @case ('list') {
        <div class="space-y-4">
          @for (item of [1,2,3,4,5]; track item) {
            <div class="flex gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-card">
              <div class="skeleton h-24 w-32 flex-shrink-0"></div>
              <div class="flex-1 space-y-2">
                <div class="skeleton h-5 w-3/4"></div>
                <div class="skeleton h-4 w-1/2"></div>
                <div class="skeleton h-4 w-full"></div>
              </div>
            </div>
          }
        </div>
      }
      @case ('detail') {
        <div class="space-y-6">
          <div class="skeleton h-96 w-full rounded-lg"></div>
          <div class="space-y-3">
            <div class="skeleton h-8 w-1/2"></div>
            <div class="skeleton h-6 w-1/3"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-3/4"></div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            @for (item of [1,2,3,4]; track item) {
              <div class="skeleton h-16"></div>
            }
          </div>
        </div>
      }
      @case ('text') {
        <div class="space-y-2">
          @for (line of lines; track $index) {
            <div class="skeleton h-4" [style.width.%]="line"></div>
          }
        </div>
      }
    }
  `
})
export class SkeletonLoaderComponent {
    @Input() variant: SkeletonVariant = 'card';
    @Input() count: number = 1;

    get lines(): number[] {
        return [100, 95, 85, 90, 75];
    }
}
