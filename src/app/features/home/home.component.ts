import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SAMPLE_PRODUCTS } from '../../core/data/products.data';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, ProductCardComponent, LucideAngularModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    loaded = signal(false);
    featuredProducts = signal(SAMPLE_PRODUCTS.slice(0, 4));

    categories = [
        {
            name: 'أدوات المطبخ',
            image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
            count: '1.2k منتج',
            importers: '45 مورد'
        },
        {
            name: 'ثلاجات',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            count: '850 منتج',
            importers: '32 مورد'
        },
        {
            name: 'شاشات ذكية',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
            count: '2.4k منتج',
            importers: '68 مورد'
        },
        {
            name: 'غسالات',
            image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
            count: '640 منتج',
            importers: '24 مورد'
        },
        {
            name: 'طاقة وكهرباء',
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
            count: '1.1k منتج',
            importers: '38 مورد'
        },
        {
            name: 'سلامة وأمان',
            image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
            count: '420 منتج',
            importers: '15 مورد'
        }
    ];

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

    ngOnInit(): void {
        setTimeout(() => this.loaded.set(true), 100);
    }
}
