import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Supplier {
    name: string;
    image: string;
}

export interface Product {
    id: string | number;
    name: string;
    averagePrice?: number;
    price?: number;
    category: string;
    image: string;
    suppliers: Supplier[];
    rating: number;
    stock?: number;
}

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
    @Input() product!: Product;

    isHovered = false;

    get displayPrice(): number {
        return this.product.averagePrice || this.product.price || 0;
    }

    onMouseEnter(): void {
        this.isHovered = true;
    }

    onMouseLeave(): void {
        this.isHovered = false;
    }
}
