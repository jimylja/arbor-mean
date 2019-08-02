import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'admin-panel',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule'
  },
  {
    path: '',
    loadChildren: './shell/shell.module#ShellModule'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
