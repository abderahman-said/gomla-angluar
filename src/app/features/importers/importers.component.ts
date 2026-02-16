import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Importer {
    id: string;
    name: string;
    cat: string;
    desc: string;
    rating: number;
    stock: string;
    active: string;
    img: string;
}

@Component({
    selector: 'app-importers',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './importers.component.html',
    styleUrl: './importers.component.scss'
})
export class ImportersComponent {
    searchTerm = signal('');

    importers: Importer[] = [
        {
            id: '1',
            name: 'النور العالمية',
            cat: 'الأجهزة الثقيلة',
            desc: 'نحن شركة رائدة في استيراد وتوزيع المعدات الكهربائية والأجهزة المنزلية الثقيلة. نلتزم بأعلى معايير الجودة العالمية.',
            rating: 4.9,
            stock: '1.2k عنصر',
            active: '24 سنة',
            img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: '2',
            name: 'تكنولوجيا السويس للخدمات',
            cat: 'الإلكترونيات الذكية',
            desc: 'متخصصون في حلول المنازل الذكية وتوريد أحدث الأجهزة الإلكترونية. نسعى دائماً لجلب أحدث التكنولوجيا.',
            rating: 4.7,
            stock: '850 عنصر',
            active: '12 سنة',
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: '3',
            name: 'شركة دلتا للتبريد',
            cat: 'متخصصو التكييف',
            desc: 'الاسم الأول في عالم التبريد والتكييف. نقوم باستيراد أفضل الماركات العالمية وتوفير أنظمة تكييف متكاملة.',
            rating: 4.8,
            stock: '2.1k عنصر',
            active: '15 سنة',
            img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
        }
    ];

    filteredImporters = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) return this.importers;
        return this.importers.filter(imp =>
            imp.name.toLowerCase().includes(term) ||
            imp.cat.toLowerCase().includes(term)
        );
    });
}
