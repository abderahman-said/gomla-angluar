import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6 space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-black text-slate-900">نظرة عامة</h2>
            <p class="text-slate-500 font-bold">مرحباً بك في لوحة تحكم التوريد</p>
        </div>
        <button class="px-6 py-3 bg-brand text-white rounded-xl font-bold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all">
            إضافة منتج جديد
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div>
                <h3 class="text-slate-400 font-black text-xs uppercase tracking-wider mb-2">إجمالي المنتجات</h3>
                <p class="text-4xl font-black text-slate-900">124</p>
            </div>
            <div class="h-14 w-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                <!-- Icon Placeholder -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22v-10"/></svg>
            </div>
        </div>
        <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div>
                <h3 class="text-slate-400 font-black text-xs uppercase tracking-wider mb-2">إجمالي الطلبات</h3>
                <p class="text-4xl font-black text-slate-900">45</p>
            </div>
            <div class="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
        </div>
        <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div>
                <h3 class="text-slate-400 font-black text-xs uppercase tracking-wider mb-2">المشاهدات</h3>
                <p class="text-4xl font-black text-slate-900">1.2k</p>
            </div>
            <div class="h-14 w-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12s-4-6-10-6S2 12 2 12s4 6 10 6 10-6 10-6v0Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
        </div>
      </div>

      <!-- Recent Activity / Placeholder -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 class="text-xl font-black text-slate-900 mb-6">أحدث الطلبات</h3>
            <div class="space-y-4">
                <div class="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                    <div class="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">ORD</div>
                    <div>
                        <p class="font-bold text-slate-900">طلب جديد #1023</p>
                        <p class="text-xs text-slate-500 font-bold">منذ 2 ساعة</p>
                    </div>
                    <span class="mr-auto px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-black rounded-lg">قيد الانتظار</span>
                </div>
                <!-- More items -->
            </div>
        </div>

        <div class="bg-brand/5 p-8 rounded-[2.5rem] border border-brand/10 relative overflow-hidden">
             <div class="relative z-10">
                <h3 class="text-xl font-black text-brand mb-4">ترقية حسابك</h3>
                <p class="text-slate-600 font-bold mb-6">احصل على ميزات حصرية وعلامة التوثيق لزيادة مبيعاتك.</p>
                <button class="px-6 py-3 bg-brand text-white rounded-xl font-bold shadow-lg shadow-brand/20">ترقية الآن</button>
             </div>
             <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  `
})
export class OverviewComponent { }
