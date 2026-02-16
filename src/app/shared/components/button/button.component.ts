import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() ariaLabel?: string;

  @Output() click = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`
    ];

    if (this.disabled || this.loading) {
      classes.push('btn-disabled');
    }

    if (this.fullWidth) {
      classes.push('btn-full-width');
    }

    if (this.icon) {
      classes.push('btn-has-icon');
      classes.push(`btn-icon-${this.iconPosition}`);
    }

    return classes.join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.click.emit(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
