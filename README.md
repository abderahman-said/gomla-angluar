 src/
 ├─ app/
 │   ├─ models/               # Interfaces & Types (User, Product, Order)
 │   │   ├─ user.model.ts
 │   │   ├─ product.model.ts
 │   │   └─ index.ts
 │   │
 │   ├─ constants/            # ثوابت عامة (API URLs, Regex, App Config)
 │   │   ├─ api-endpoints.ts
 │   │   ├─ regex.ts
 │   │   ├─ app.config.ts
 │   │   └─ index.ts
 │   │
 │   ├─ enums/                # Enums (Roles, Status, Permissions)
 │   │   ├─ user-roles.enum.ts
 │   │   ├─ order-status.enum.ts
 │   │   └─ index.ts
 │   │
 │   ├─ core/                 # حاجات أساسية بتستخدم في كل المشروع
 │   │   ├─ services/         # AuthService, ApiService, StorageService
 │   │   ├─ guards/           # AuthGuard, RoleGuard
 │   │   ├─ interceptors/     # Http Interceptors
 │   │   └─ core.module.ts
 │   │
 │   ├─ shared/               # Components & Utils مشتركة
 │   │   ├─ components/       # Button, Modal, Input, Loader
 │   │   ├─ directives/       # LazyLoad, ClickOutside
 │   │   ├─ pipes/            # Date, Truncate
 │   │   └─ shared.module.ts
 │   │
 │   ├─ features/             # كل Feature لوحده
 │   │   ├─ auth/
 │   │   │   ├─ pages/
 │   │   │   ├─ components/
 │   │   │   ├─ services/
 │   │   │   └─ auth.routes.ts
 │   │   │
 │   │   ├─ dashboard/
 │   │   │   ├─ pages/
 │   │   │   ├─ components/
 │   │   │   ├─ services/
 │   │   │   └─ dashboard.routes.ts
 │   │   │
 │   │   ├─ products/
 │   │   │   ├─ pages/
 │   │   │   ├─ components/
 │   │   │   ├─ services/
 │   │   │   └─ products.routes.ts
 │   │
 │   ├─ layouts/
 │   │   ├─ main-layout/
 │   │   ├─ auth-layout/
 │   │   └─ layout.component.ts
 │   │
 │   ├─ app.routes.ts
 │   └─ app.component.ts
 │
 ├─ assets/
 │   ├─ images/
 │   ├─ icons/
 │   └─ fonts/
 │
 ├─ environments/
 │   ├─ environment.ts
 │   └─ environment.prod.ts
 │
 └─ styles.scss
