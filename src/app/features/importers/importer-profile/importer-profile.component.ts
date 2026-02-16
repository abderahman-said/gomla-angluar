import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SAMPLE_PRODUCTS } from '../../../core/data/products.data';

interface ImporterDetail {
    id: string;
    name: string;
    cat: string;
    stock: string;
    active: string;
    img: string;
    description: string;
    location: string;
    rating: number;
    reviews: number;
    website: string;
    whatsapp: string;
    members: string;
}

import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../../core/config/lucide-icons.config';

@Component({
    selector: 'app-importer-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, ProductCardComponent, LucideAngularModule],
    providers: [
        { provide: LUCIDE_ICONS, useValue: LUCIDE_ICONS }
    ],
    templateUrl: './importer-profile.component.html',
    styleUrl: './importer-profile.component.scss'
})
export class ImporterProfileComponent implements OnInit {
    importer = signal<ImporterDetail | null>(null);
    importerProducts = signal(SAMPLE_PRODUCTS.slice(0, 4));

    private importers: ImporterDetail[] = [
        {
            id: '1',
            name: 'النور العالمية',
            cat: 'الأجهزة الثقيلة',
            stock: '1.2k عنصر',
            active: '24 سنة',
            img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            description: 'نحن شركة رائدة في استيراد وتوزيع المعدات الكهربائية والأجهزة المنزلية الثقيلة. نلتزم بأعلى معايير الجودة العالمية وتقديم أفضل خدمة ما بعد البيع لعملائنا في جميع أنحاء الجمهورية.',
            location: 'القاهرة، المنطقة الصناعية',
            rating: 4.9,
            reviews: 128,
            website: 'www.alnoor-global.com',
            whatsapp: '+201012345678',
            members: '500+ موظف'
        },
        {
            id: '2',
            name: 'تكنولوجيا السويس للخدمات',
            cat: 'الإلكترونيات الذكية',
            stock: '850 عنصر',
            active: '12 سنة',
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            description: 'متخصصون في حلول المنازل الذكية وتوريد أحدث الأجهزة الإلكترونية. نسعى دائماً لجلب أحدث التكنولوجيا العالمية للسوق المصري وتقديم حلول متكاملة للمشاريع السكنية والتجارية.',
            location: 'السويس، بورتوفيق',
            rating: 4.7,
            reviews: 86,
            website: 'www.suez-tech.com',
            whatsapp: '+201055667788',
            members: '150+ موظف'
        },
        {
            id: '3',
            name: 'شركة دلتا للتبريد',
            cat: 'متخصصو التكييف',
            stock: '2.1k عنصر',
            active: '15 سنة',
            img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
            description: 'الاسم الأول في عالم التبريد والتكييف. نقوم باستيراد أفضل الماركات العالمية وتوفير أنظمة تكييف متكاملة للمشاريع الضخمة والمنشآت الصناعية مع ضمان صيانة دورية متميزة.',
            location: 'الإسكندرية، المنطقة الحرة',
            rating: 4.8,
            reviews: 215,
            website: 'www.delta-cooling.com',
            whatsapp: '+201099887766',
            members: '300+ موظف'
        }
    ];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        const imp = this.importers.find(i => i.id === id) || this.importers[0];
        this.importer.set(imp);
    }
}
