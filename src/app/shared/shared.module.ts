import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';

// Pipes
import { DatePipe } from './pipes/date.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    DatePipe,
    CurrencyPipe
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    DatePipe,
    CurrencyPipe
  ]
})
export class SharedModule { }
