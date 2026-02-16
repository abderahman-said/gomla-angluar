import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../../core/config/lucide-icons.config';
import { SAMPLE_PRODUCTS } from '../../../core/data/products.data';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterModule],
  providers: [{ provide: LUCIDE_ICONS, useValue: LUCIDE_ICONS }],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements OnInit {
  productForm: FormGroup;
  imagePreview = signal<string | null>(null);
  isEditMode = signal(false);
  productId: string | null = null;

  categories = ['أجهزة مطبخ', 'ثلاجات', 'غسالات', 'شاشات', 'تكييفات'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      specs: this.fb.array([])
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode.set(true);
      this.loadProduct(this.productId);
    }
  }

  get specs() {
    return this.productForm.get('specs') as FormArray;
  }

  addSpec(key: string = '', value: string = '') {
    this.specs.push(this.fb.group({
      key: [key, Validators.required],
      value: [value, Validators.required]
    }));
  }

  removeSpec(index: number) {
    this.specs.removeAt(index);
  }

  loadProduct(id: string) {
    const product = SAMPLE_PRODUCTS.find(p => p.id == +id);
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: `وصف تجريبي للمنتج ${product.name}...` // Mock description
      });
      this.imagePreview.set(product.image);

      // Mock specs
      this.addSpec('اللون', 'فضي');
      this.addSpec('الضمان', '5 سنوات');
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      // Handle submission
      this.router.navigate(['/importers/dashboard/products']);
    }
  }
}
