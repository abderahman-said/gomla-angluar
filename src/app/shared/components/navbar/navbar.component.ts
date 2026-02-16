import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    @Input() cartCount = 0;

    isMobileMenuOpen = signal(false);
    isSearchOpen = signal(false);

    // Convert authState observable to a signal
    isLoggedIn = toSignal(
        this.authService.authState$.pipe(map(state => state.isAuthenticated)),
        { initialValue: false }
    );

    navLinks = [
        { name: 'السوق', href: '/shop' },
        { name: 'الشركاء', href: '/importers' },
        { name: 'الأسعار', href: '/pricing' }
    ];

    toggleMobileMenu() {
        this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    }

    toggleSearch() {
        this.isSearchOpen.set(!this.isSearchOpen());
    }

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/auth/login']);
            },
            error: (err) => {
                console.error('Logout failed:', err);
                // Still navigate even if server call fails
                this.router.navigate(['/auth/login']);
            }
        });
    }
}
