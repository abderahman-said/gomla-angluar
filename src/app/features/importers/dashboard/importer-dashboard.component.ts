import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../../core/config/lucide-icons.config';

@Component({
    selector: 'app-importer-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    providers: [{ provide: LUCIDE_ICONS, useValue: LUCIDE_ICONS }],
    templateUrl: './importer-dashboard.component.html',
    styleUrl: './importer-dashboard.component.scss'
})
export class ImporterDashboardComponent {
    menuItems = [
        { label: 'نظرة عامة', icon: 'layout-dashboard', route: '/importers/dashboard' },
        { label: 'إدارة المنتجات', icon: 'package', route: '/importers/dashboard/products' },
        { label: 'الطلبات', icon: 'shopping-cart', route: '/importers/dashboard/orders' }, // Placeholder route
        { label: 'الإعدادات', icon: 'settings', route: '/importers/dashboard/settings' } // Placeholder route
    ];
}
