import { Product } from '../../shared/components/product-card/product-card.component';

export const SAMPLE_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'غسالة أوتوماتيك 9 كيلو',
        category: 'غسالات',
        averagePrice: 850,
        price: 850,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1545173168-9f1967e4952e?auto=format&fit=crop&w=800&q=80',
        suppliers: [
            { name: 'النور العالمية', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=75' },
            { name: 'تكنولوجيا السويس', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=75' },
            { name: 'دلتا للتبريد', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=75' },
            { name: 'المتحدة للتجارة', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'المصري جروب', image: 'https://randomuser.me/api/portraits/men/44.jpg' }
        ]
    },
    {
        id: 2,
        name: 'طقم ركنة مودرن 5 مقاعد',
        category: 'أثاث منزلي',
        averagePrice: 1500,
        price: 1500,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        suppliers: [
            { name: 'مودرن هوم', image: 'https://randomuser.me/api/portraits/men/33.jpg' },
            { name: 'الفا للأثاث', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
            { name: 'فينيسيا للأجهزة', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
            { name: 'رويال للأثاث', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
            { name: 'إليت جروب', image: 'https://randomuser.me/api/portraits/men/37.jpg' }
        ]
    },
    {
        id: 3,
        name: 'ثلاجة بابين سعة 500 لتر',
        category: 'ثلاجات',
        averagePrice: 2100,
        price: 2100,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        suppliers: [
            { name: 'البارون تكنولوجي', image: 'https://randomuser.me/api/portraits/men/38.jpg' },
            { name: 'سمارت سيرفس', image: 'https://randomuser.me/api/portraits/men/39.jpg' },
            { name: 'كولد اير', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
            { name: 'إيجيبت كول', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
            { name: 'فريش جروب', image: 'https://randomuser.me/api/portraits/men/42.jpg' }
        ]
    },
    {
        id: 4,
        name: 'طقم أواني طهي جرانيت 10 قطع',
        category: 'أدوات المطبخ',
        averagePrice: 450,
        price: 450,
        rating: 4.8,
        stock: 35,
        image: 'https://images.unsplash.com/photo-1584990344319-7411bc2ad6a?auto=format&fit=crop&w=800&q=80',
        suppliers: [
            { name: 'كوين كيتشن', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
            { name: 'شيف ستار', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
            { name: 'جروب كيتشن', image: 'https://randomuser.me/api/portraits/men/47.jpg' },
            { name: 'المصري للأواني', image: 'https://randomuser.me/api/portraits/men/48.jpg' },
            { name: 'نيو فلام', image: 'https://randomuser.me/api/portraits/men/49.jpg' }
        ]
    }
];

export const SAMPLE_CATEGORIES = [
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
