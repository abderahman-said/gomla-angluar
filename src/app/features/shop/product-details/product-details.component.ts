import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SAMPLE_PRODUCTS } from '../../../core/data/products.data';
import { Product } from '../../../shared/components/product-card/product-card.component';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);

    product = signal<Product | null>(null);
    quantity = signal(1);
    activeTab = signal('description');
    selectedImageIndex = signal(0);

    productImages = computed(() => {
        const p = this.product();
        if (!p) return [];
        return [
            p.image,
            `${p.image}&sat=2`,
            `${p.image}&bright=1.1`,
            `${p.image}&contrast=1.2`
        ];
    });

    certifications = [
        { label: 'CE Certified', color: 'bg-blue-600' },
        { label: 'ISO 9001', color: 'bg-green-600' },
        { label: 'IEC 60364', color: 'bg-purple-600' },
    ];

    tabs = [
        { id: 'description', label: 'الوصف' },
        { id: 'specs', label: 'المواصفات' },
        { id: 'shipping', label: 'الشحن' },
        { id: 'reviews', label: 'التقييمات' },
    ];

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = parseInt(params['id']);
            const foundProduct = SAMPLE_PRODUCTS.find(p => p.id === id);
            if (foundProduct) {
                this.product.set(foundProduct);
            }
        });
    }

    handleQuantityChange(newQuantity: number) {
        this.quantity.set(Math.max(1, Math.min(999, newQuantity)));
    }

    addToCart() {
        console.log('Adding to cart:', this.product()?.name, 'Quantity:', this.quantity());
        // Implementation for cart service will go here
    }
}
