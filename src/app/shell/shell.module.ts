import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './main/posts/posts.component';
import { PostComponent } from './main/posts/post/post.component';
import { CategoriesComponent } from './main/posts/categories/categories.component';
import { ModalModule } from './modal/modal.module';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    MainComponent,
    PostsComponent,
    PostComponent,
    CategoriesComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    ModalModule
  ],
})
export class ShellModule { }
