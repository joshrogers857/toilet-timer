import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { AppRoutingModule } from "../app-routing-module";
import { BaseModalComponent } from './components/interface/base-modal.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    MenuBarComponent,
    BaseModalComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
]
})
export class CoreModule { }
