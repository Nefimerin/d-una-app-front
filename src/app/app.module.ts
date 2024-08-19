import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ListProductComponent,
    CreateRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
    ListUserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ListOrderComponent,
    CreateOrderComponent,
    UpdateOrderComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
