import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../../core/config/lucide-icons.config';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    providers: [
        { provide: LUCIDE_ICONS, useValue: LUCIDE_ICONS }
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent { }
