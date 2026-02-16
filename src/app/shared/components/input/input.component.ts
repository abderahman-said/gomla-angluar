import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() error = '';
  @Input() helperText = '';
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() pattern?: string;
  @Input() autocomplete?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() input = new EventEmitter<Event>();

  value: string | number = '';
  isFocused = false;

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  get inputClasses(): string {
    const classes = [
      'input-field',
      `input-${this.size}`
    ];

    if (this.disabled) {
      classes.push('input-disabled');
    }

    if (this.error) {
      classes.push('input-error');
    }

    if (this.isFocused) {
      classes.push('input-focused');
    }

    if (this.icon) {
      classes.push('input-has-icon');
      classes.push(`input-icon-${this.iconPosition}`);
    }

    return classes.join(' ');
  }

  get inputId(): string {
    return `input-${Math.random().toString(36).substr(2, 9)}`;
  }

  get helperId(): string {
    return `${this.inputId}-helper`;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }

  get describedBy(): string {
    const ids = [];
    if (this.helperText) ids.push(this.helperId);
    if (this.error) ids.push(this.errorId);
    if (this.ariaDescribedBy) ids.push(this.ariaDescribedBy);
    return ids.join(' ');
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = this.type === 'number' ? Number(target.value) : target.value;
    this.onChange(this.value);
    this.input.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused = true;
    this.onTouched();
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused = false;
    this.blur.emit(event);
  }

  @HostListener('keydown.enter')
  onEnter(): void {
    this.onTouched();
  }
}
