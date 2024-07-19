import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';

const routes: Routes = [
  { path: 'products/form', component: CreateProductComponent },
  { path: 'products/list', component: ListProductComponent },
  { path: 'role/form', component: CreateRoleComponent },
  { path: 'role/list', component: ListRoleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
