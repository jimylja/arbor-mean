import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    // children: [
    //   {
    //     path: 'admin-panel',
    //   },
    //   {
    //     path: '',
    //     component: PostsComponent
    //   },
    //   {
    //     path: 'posts',
    //     component: PostsComponent,
    //   },
    //   {
    //     path: 'posts/:category', component: PostsComponent,
    //     children: [
    //       { path: ':id', component: PostComponent }
    //     ]
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
