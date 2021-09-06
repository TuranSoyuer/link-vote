import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkListComponent } from './link-list/link-list.component';
import { LinkAddComponent } from './link-add/link-add.component';

const routes: Routes = [
  {
    path: 'list',
    component: LinkListComponent
  },
  {
    path: 'add',
    component: LinkAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
