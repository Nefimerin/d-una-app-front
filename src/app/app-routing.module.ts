import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

const routes: Routes = [
  { path: 'products/form', component: CreateProductComponent },
  { path: 'products/list', component: ListProductComponent },
  { path: 'role/form', component: CreateRoleComponent },
  { path: 'role/list', component: ListRoleComponent },
  { path: 'products/details', component: UpdateProductComponent},
  { path: 'users/form', component: CreateUserComponent},
  { path: 'users/list', component: ListUserComponent},
  { path: 'role/details', component: UpdateRoleComponent},
  { path: 'users/details', component: UpdateUserComponent},
  { path: 'order/list', component: ListOrderComponent},
  { path: 'order/form', component: CreateOrderComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
