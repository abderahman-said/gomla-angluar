import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserRole } from '../../../../models';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    step = signal(2); // Starting at step 2 as per React reference
    error = signal<string | null>(null);
    isLoading = signal(false);

    registerForm = this.fb.group({
        companyName: ['', [Validators.required, Validators.minLength(3)]],
        contactEmail: ['', [Validators.required, Validators.email]],
        whatsapp: ['', [Validators.required, Validators.pattern('^[0-9+ ]{10,15}$')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        category: ['AC', [Validators.required]]
    });

    categories = [
        { id: 'AC', name: 'تكييفات' },
        { id: 'FR', name: 'ثلاجات' },
        { id: 'TV', name: 'شاشات سمارت' },
        { id: 'WA', name: 'غسالات' },
        { id: 'SA', name: 'أجهزة صغيرة' }
    ];

    handleSubmit() {
        if (this.registerForm.invalid) {
            this.error.set('يرجى التأكد من صحة جميع البيانات المدخلة');
            return;
        }

        this.isLoading.set(true);
        this.error.set(null);

        const formData = this.registerForm.getRawValue();

        // Mapping form to AuthService.RegisterData
        const registerData = {
            email: formData.contactEmail!,
            password: formData.password!,
            firstName: formData.companyName!.split(' ')[0] || '',
            lastName: formData.companyName!.split(' ').slice(1).join(' ') || 'Company',
            phone: formData.whatsapp!,
            role: UserRole.IMPORTER,
            businessName: formData.companyName!,
            address: { street: '', city: '', state: '', postalCode: '', country: 'Egypt' }
        };

        this.authService.register(registerData).subscribe({
            next: () => {
                this.step.set(3); // Show success step
                this.isLoading.set(false);
            },
            error: (err) => {
                this.error.set(err.message || 'فشل في إرسال طلب التسجيل');
                this.isLoading.set(false);
            }
        });
    }

    setStep(s: number) {
        this.step.set(s);
    }
}
