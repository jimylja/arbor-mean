import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { PostsComponent } from './main/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'admin-panel',
      },
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'posts/:category', component: PostsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
