import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './models';

export const routes: Routes = [
  // Auth routes (public)
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'تسجيل الدخول - بالجملة'
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent),
    title: 'طلب انضمام - بالجملة'
  },

  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'بالجملة - منصة التجارة بالجملة المتكاملة'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'لوحة التحكم - بالجملة',
        data: {
          roles: [UserRole.ADMIN, UserRole.IMPORTER, UserRole.MANUFACTURER, UserRole.RETAILER, UserRole.WHOLESALER]
        }
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
        title: 'السوق - بالجملة'
      },
      {
        path: 'shop/product/:id',
        loadComponent: () => import('./features/shop/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        title: 'تفاصيل المنتج - بالجملة'
      },
      {
        path: 'pricing',
        loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent),
        title: 'الأسعار - بالجملة'
      },
      {
        path: 'importers',
        loadComponent: () => import('./features/importers/importers.component').then(m => m.ImportersComponent),
        title: 'المستوردون - بالجملة'
      },
      {
        path: 'importers/:id',
        loadComponent: () => import('./features/importers/importer-profile/importer-profile.component').then(m => m.ImporterProfileComponent),
        title: 'ملف المستورد - بالجملة'
      }
    ]
  },
  {
    path: 'importers/dashboard',
    loadComponent: () => import('./features/importers/dashboard/importer-dashboard.component').then(m => m.ImporterDashboardComponent),
    title: 'لوحة تحكم المستورد - بالجملة',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./features/importers/dashboard/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/importers/management/inventory/inventory.component').then(m => m.InventoryComponent),
            title: 'إدارة المنتجات - لوحة التحكم'
          },
          {
            path: 'add',
            loadComponent: () => import('./features/importers/management/manage-product.component').then(m => m.ManageProductComponent),
            title: 'إضافة منتج جديد - لوحة التحكم'
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./features/importers/management/manage-product.component').then(m => m.ManageProductComponent),
            title: 'تعديل المنتج - لوحة التحكم'
          }
        ]
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/importers/management/inventory/inventory.component').then(m => m.InventoryComponent) // Placeholder
      }
    ]
  },

  // Wildcard route (404)
  {
    path: '**',
    redirectTo: 'shop'
  }
];
