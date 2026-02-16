import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, } from '@angular/router';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from './core/core.module';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

@NgModule({
  declarations: [
    // Layout components
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule,
    MainLayoutComponent
  ],
  providers: []
})
export class AppModule { }
