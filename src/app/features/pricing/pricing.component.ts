import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PricingPlan {
    id: string;
    name: string;
    nameAr: string;
    tagline: string;
    monthlyPrice: number;
    yearlyPrice: number;
    icon: string;
    accent: string;
    accentBg: string;
    features: string[];
    cta: string;
    ctaStyle: 'outline' | 'solid' | 'gold';
    popular: boolean;
}

interface Faq {
    q: string;
    a: string;
    open?: boolean;
}

import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../core/config/lucide-icons.config';

@Component({
    selector: 'app-pricing',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    providers: [
        { provide: LUCIDE_ICONS, useValue: LUCIDE_ICONS }
    ],
    templateUrl: './pricing.component.html',
    styleUrl: './pricing.component.scss'
})
export class PricingComponent {
    isYearly = signal(true);
    openFaqIndex = signal<number | null>(null);

    plans: PricingPlan[] = [
        {
            id: 'starter',
            name: 'Starter',
            nameAr: 'البداية',
            tagline: 'للمستوردين الجدد',
            monthlyPrice: 0,
            yearlyPrice: 0,
            icon: 'shield',
            accent: '#64748b',
            accentBg: 'rgba(100,116,139,0.08)',
            features: [
                'إضافة حتى 5 منتجات',
                'لوحة تحكم أساسية',
                'دعم عبر البريد الإلكتروني',
                'ظهور عادي في نتائج البحث',
            ],
            cta: 'ابدأ مجاناً',
            ctaStyle: 'outline',
            popular: false,
        },
        {
            id: 'pro',
            name: 'Pro',
            nameAr: 'المحترف',
            tagline: 'للشركات النشطة الساعية للنمو',
            monthlyPrice: 59,
            yearlyPrice: 49,
            icon: 'zap',
            accent: '#2650fc',
            accentBg: 'rgba(38,80,252,0.1)',
            features: [
                'إضافة منتجات غير محدودة',
                'شارة "مستورد معتمد"',
                'ظهور ذو أولوية في البحث',
                'إحصائيات متقدمة للزيارات',
                'دعم فني سريع (واتساب)',
            ],
            cta: 'اشترك الآن',
            ctaStyle: 'solid',
            popular: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            nameAr: 'المؤسسات',
            tagline: 'للمؤسسات الكبرى والمجموعات',
            monthlyPrice: 179,
            yearlyPrice: 149,
            icon: 'crown',
            accent: '#f59e0b',
            accentBg: 'rgba(245,158,11,0.08)',
            features: [
                'كل مميزات باقة المحترف',
                'مدير حساب مخصص',
                'ربط API للمخزون',
                'تقارير تحليلية شهرية',
                'إعلانات ممولة شهرية',
            ],
            cta: 'تواصل معنا',
            ctaStyle: 'gold',
            popular: false,
        },
    ];

    faqs: Faq[] = [
        {
            q: 'ما هو الفرق بين الاشتراك الشهري والسنوي؟',
            a: 'الاشتراك السنوي يوفر لك خصماً يصل إلى 20% مقارنة بالدفع الشهري، كما يضمن لك ثبات السعر طوال العام.',
        },
        {
            q: 'هل يمكنني تغيير باقتي في أي وقت؟',
            a: 'نعم، يمكنك الترقية من باقة إلى أخرى في أي وقت من خلال لوحة التحكم الخاصة بك.',
        },
        {
            q: 'كيف تضمنون جودة المستوردين بشارة "معتمد"؟',
            a: 'نقوم بمراجعة السجلات التجارية والشهادات الجمركية يدوياً لكل مستورد يطلب الشارة لضمان الموثوقية.',
        },
        {
            q: 'هل هناك دعم فني متخصص للأجهزة الكهربائية؟',
            a: 'نعم، فريق دعمنا يضم مهندسين متخصصين في قطاع الأجهزة الكهربائية والإلكترونيات الصناعية.',
        },
    ];

    toggleBilling() {
        this.isYearly.update(v => !v);
    }

    toggleFaq(index: number) {
        this.openFaqIndex.update(current => current === index ? null : index);
    }

    getSavings(plan: PricingPlan): number {
        if (plan.monthlyPrice === 0) return 0;
        return Math.round((1 - plan.yearlyPrice / plan.monthlyPrice) * 100);
    }
}
