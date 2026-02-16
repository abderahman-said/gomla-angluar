import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES } from '../../core/data/products.data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  products = signal(SAMPLE_PRODUCTS);
  categories = signal(SAMPLE_CATEGORIES);

  partners = [
    {
      name: 'النور العالمية',
      cat: 'الأجهزة الثقيلة',
      stock: '1.2k عنصر',
      active: '24 سنة',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=75'
    },
    {
      name: 'تكنولوجيا السويس للخدمات',
      cat: 'الإلكترونيات الذكية',
      stock: '850 عنصر',
      active: '12 سنة',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=75'
    },
    {
      name: 'شركة دلتا للتبريد',
      cat: 'متخصصو التكييف',
      stock: '2.1k عنصر',
      active: '15 سنة',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=75'
    }
  ];

  isLoaded = signal(false);

  ngOnInit(): void {
    // Trigger animations
    setTimeout(() => {
      this.isLoaded.set(true);
    }, 100);
  }
}
