import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { PostsComponent } from './main/posts/posts.component';
import { PostComponent } from './main/posts/post/post.component';

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
        path: 'posts/:category', component: PostsComponent,
        children: [
          { path: ':id', component: PostComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
