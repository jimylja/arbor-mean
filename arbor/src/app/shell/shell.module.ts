import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    MainComponent],
  imports: [
    CommonModule,
    ShellRoutingModule
  ]
})
export class ShellModule { }
