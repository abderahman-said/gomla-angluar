import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SAMPLE_PRODUCTS } from '../../../../core/data/products.data';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  products = signal(SAMPLE_PRODUCTS);

  deleteProduct(id: number | string) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      this.products.update(products => products.filter(p => p.id !== id));
    }
  }
}
