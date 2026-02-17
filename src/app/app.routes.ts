import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './models';

export const routes: Routes = [
  // Auth routes (public)
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login - Hotel Booking'
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Register - Hotel Booking'
  },

  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Hotel Booking - Find Your Perfect Stay'
      },
      {
        path: 'hotels',
        loadComponent: () => import('./features/hotels/hotels.component').then(m => m.HotelsComponent),
        title: 'Hotels - Hotel Booking'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard - Hotel Booking',
        data: {
          roles: [UserRole.ADMIN, UserRole.IMPORTER, UserRole.MANUFACTURER, UserRole.RETAILER, UserRole.WHOLESALER]
        }
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
        title: 'Shop - Hotel Booking'
      },
      {
        path: 'shop/product/:id',
        loadComponent: () => import('./features/shop/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        title: 'Product Details - Hotel Booking'
      },
      {
        path: 'pricing',
        loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent),
        title: 'Pricing - Hotel Booking'
      },
      {
        path: 'importers',
        loadComponent: () => import('./features/importers/importers.component').then(m => m.ImportersComponent),
        title: 'Importers - Hotel Booking'
      },
      {
        path: 'importers/:id',
        loadComponent: () => import('./features/importers/importer-profile/importer-profile.component').then(m => m.ImporterProfileComponent),
        title: 'Importer Profile - Hotel Booking'
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
